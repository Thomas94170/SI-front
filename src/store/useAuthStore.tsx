import { create } from 'zustand';

function decodeToken(token: string): { exp?: number; userId?: string } {
  try {
    console.log(token)
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return {};
  }
}

interface AuthState {
  token: string | null;
  userId: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userId: null,
  setToken: (token: string) => {
    console.log('Nouveau token défini :', token);
    const { exp, userId } = decodeToken(token);
    if (exp) {
      const now = Date.now() / 1000;
      const delay = (exp - now) * 1000;

      
      setTimeout(() => {
        set({ token: null, userId: null });
        console.log('Token expiré, déconnexion automatique');
        
      }, delay);
    }

    set({token, userId: userId ?? null });
  },
  logout: () => {
    console.log('Déconnexion manuelle : token supprimé');
    set({ token: null, userId: null });
  },
}));

export default useAuthStore;
