import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { useEffect } from 'react';
import type { ReactElement } from 'react';

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    console.log("🔐 Token actif dans ProtectedRoute:", token);
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
