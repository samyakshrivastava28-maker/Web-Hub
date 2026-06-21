import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, userProfile } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    console.log("[AUTH] ProtectedRoute: No currentUser, redirecting to /login");
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // If user is logged in but has no phone, and they are not already on the onboarding page, redirect them.
  if (userProfile && !userProfile.phoneNumber && location.pathname !== '/phone-number') {
    console.log("[AUTH] ProtectedRoute: Missing phone, redirecting to /phone-number");
    return <Navigate to="/phone-number" replace />;
  }

  console.log("[AUTH] ProtectedRoute: Allowed access to", location.pathname);
  return <>{children}</>;
}
