import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HostProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.email !== 'webhub2811@gmail.com') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
