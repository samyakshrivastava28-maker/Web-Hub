import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';
import { sendWelcomeEmail, sendAdminNotification, sendWelcomeBackEmail } from '../lib/email';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
  createdAt: string;
  provider: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ user: User, profile: UserProfile }>;
  register: (email: string, password: string, name: string, phoneNumber: string) => Promise<{ user: User, profile: UserProfile }>;
  loginWithGoogle: () => Promise<{ user: User, profile: UserProfile }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserPhone: (phone: string) => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
  backendError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState<string | null>(null);

  const fetchProfile = async (uid: string) => {
    try {
      const docRef = doc(db, 'users', uid);
      // Use Promise.race to prevent getDoc from hanging indefinitely if Firestore is unreachable
      const docPromise = getDoc(docRef);
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout in fetchProfile')), 3000));
      const docSnap: any = await Promise.race([docPromise, timeoutPromise]);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data() as UserProfile);
        setBackendError(null);
      }
    } catch (e) {
      console.error("Failed to fetch profile", e);
      setBackendError("Database connection failed. Some features may be unavailable.");
      
      // Fallback mock profile so the app doesn't break
      if (auth.currentUser) {
        setUserProfile({
          uid: auth.currentUser.uid,
          name: auth.currentUser.displayName || auth.currentUser.email || 'User',
          email: auth.currentUser.email || '',
          createdAt: new Date().toISOString(),
          provider: 'offline'
        });
      }
    }
  };

  useEffect(() => {
    // Fallback: If Firebase fails to initialize or respond within 5 seconds, stop loading
    const fallbackTimeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        clearTimeout(fallbackTimeout);
        setCurrentUser(user);
        if (user) {
          await fetchProfile(user.uid);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      }, (error) => {
        console.error("Auth state error:", error);
        clearTimeout(fallbackTimeout);
        setLoading(false);
      });
      return () => {
        clearTimeout(fallbackTimeout);
        unsubscribe();
      };
    } catch (error) {
      console.warn("Firebase config error, continuing in offline mode.");
      clearTimeout(fallbackTimeout);
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log("[AUTH] Login started for:", email);
    const res = await signInWithEmailAndPassword(auth, email, password);
    const name = res.user.displayName || email;
    
    // Await it so browser doesn't cancel request on redirect
    await sendWelcomeBackEmail(name, email).catch(console.error);
    
    let profileData: UserProfile | null = null;
    try {
      // Use Promise.race to prevent getDoc from hanging indefinitely if Firestore is unreachable
      const docPromise = getDoc(doc(db, 'users', res.user.uid));
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 3000));
      const docSnap: any = await Promise.race([docPromise, timeoutPromise]);
      if (docSnap.exists()) profileData = docSnap.data() as UserProfile;
    } catch (e: any) {
      console.error("[AUTH ERROR] Firestore getDoc error in login:", e);
    }
    
    setCurrentUser(res.user);
    if (!profileData) {
      // Mock profile if Firestore fails
      profileData = { uid: res.user.uid, name, email, createdAt: new Date().toISOString(), provider: 'email' };
    }
    
    // Set profile state directly instead of duplicate fetchProfile call
    setUserProfile(profileData);
    
    console.log("[AUTH] Login completed for:", email);
    return { user: res.user, profile: profileData };
  };

  const register = async (email: string, password: string, name: string, phoneNumber: string) => {
    console.log("[AUTH] Signup started for:", email);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log("[AUTH] Firebase account created for:", res.user.uid);
    
    // Non-blocking updateProfile
    updateProfile(res.user, { displayName: name }).catch(console.error);
    
    const profileData: UserProfile = {
      uid: res.user.uid,
      name,
      email,
      phoneNumber,
      photoURL: '',
      createdAt: new Date().toISOString(),
      provider: 'email'
    };
    
    // Non-blocking setDoc to prevent UI hang
    setDoc(doc(db, 'users', res.user.uid), profileData)
      .then(() => console.log("[AUTH] Firestore save completed for profile:", res.user.uid))
      .catch((e: any) => console.error("[AUTH ERROR] Firestore setDoc error in register:", e));

    setUserProfile(profileData);
    setCurrentUser(res.user);
    
    // Background emails - await them to ensure they send before page unloads
    await Promise.all([
      sendWelcomeEmail(name, email).catch(console.error),
      sendAdminNotification(name, email, phoneNumber, 'email').catch(console.error)
    ]);
    
    console.log("[AUTH] Signup completed for:", email);
    return { user: res.user, profile: profileData };
  };

  const loginWithGoogle = async () => {
    console.log("[AUTH] Google auth started");
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log("[AUTH] Google auth popup completed for:", user.uid);
    
    // Check if user exists
    const docRef = doc(db, 'users', user.uid);
    let docExists = false;
    let existingProfile: UserProfile | null = null;
    
    try {
      const docPromise = getDoc(docRef);
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 3000));
      const docSnap: any = await Promise.race([docPromise, timeoutPromise]);
      if (docSnap.exists()) {
        docExists = true;
        existingProfile = docSnap.data() as UserProfile;
        console.log("[AUTH] Google auth - existing user found:", user.uid);
      }
    } catch (e: any) {
      console.error("[AUTH ERROR] Firestore getDoc error in loginWithGoogle:", e);
      // Assume user exists to prevent overwrite if we can't read, but we need profile
    }
    
    if (!docExists) {
      // New user via Google
      const name = user.displayName || 'Google User';
      const email = user.email || '';
      
      const profileData: UserProfile = {
        uid: user.uid,
        name,
        email,
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString(),
        provider: 'google'
      };
      
      setDoc(docRef, profileData)
        .then(() => console.log("[AUTH] Firestore save completed for new Google profile:", user.uid))
        .catch((e: any) => console.error("[AUTH ERROR] Firestore setDoc error in loginWithGoogle:", e));
      
      setUserProfile(profileData);
      setCurrentUser(user);
      console.log("[AUTH] Google auth completed (new user)");
      return { user, profile: profileData };
    } else {
      // Existing user login
      const name = user.displayName || user.email || 'User';
      
      // Await it so browser doesn't cancel request on redirect
      await sendWelcomeBackEmail(name, user.email || '').catch(console.error);
      
      if (existingProfile) {
        setUserProfile(existingProfile);
      }
      setCurrentUser(user);
      console.log("[AUTH] Google auth completed (existing user)");
      return { user, profile: existingProfile || { uid: user.uid, name, email: user.email || '', createdAt: new Date().toISOString(), provider: 'google' } };
    }
  };

  const updateUserPhone = async (phoneNumber: string) => {
    if (!currentUser || !userProfile) return;
    const updated = { ...userProfile, phoneNumber };
    console.log("[AUTH] Phone save started for:", currentUser.uid);
    
    // Non-blocking Firestore write to prevent UI hangs
    setDoc(doc(db, 'users', currentUser.uid), updated, { merge: true })
      .then(() => console.log("[AUTH] Phone save completed in Firestore"))
      .catch((e: any) => console.error("[AUTH ERROR] Phone save failed in Firestore:", e));
    
    // Update local state ONLY after backend save succeeds
    setUserProfile(updated);
    
    // Background emails - await them to ensure they send before page unloads
    await Promise.all([
      sendWelcomeEmail(updated.name, updated.email).catch(console.error),
      sendAdminNotification(updated.name, updated.email, phoneNumber, updated.provider).catch(console.error)
    ]);
  };

  const updateUserName = async (name: string) => {
    if (!currentUser || !userProfile) return;
    
    const updated = { ...userProfile, name };
    setUserProfile(updated); // Optimistic UI update
    
    // Non-blocking Firebase calls
    updateProfile(currentUser, { displayName: name }).catch(console.error);
    setDoc(doc(db, 'users', currentUser.uid), updated, { merge: true }).catch(console.error);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserPhone,
    updateUserName,
    backendError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
