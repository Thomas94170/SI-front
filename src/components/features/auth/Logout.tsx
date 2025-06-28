import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/useAuthStore';

const Logout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const disconnect = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${useAuthStore.getState().token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(`Logout côté serveur déclenché, ${useAuthStore.getState().token}`);
      } catch (err) {
        console.error('Erreur logout côté serveur :', err);
      } finally {
        logout(); 
        navigate('/'); 
      }
    };

    disconnect();
  }, [logout, navigate]);

  return null;
};

export default Logout;
