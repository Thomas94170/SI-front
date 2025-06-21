import { create } from 'zustand';

function decodeToken(token: string): { exp?: number } {
  try {
    console.log(token)
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return {};
  }
}

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token: string) => {
    console.log('Nouveau token défini :', token);
    const { exp } = decodeToken(token);
    if (exp) {
      const now = Date.now() / 1000;
      const delay = (exp - now) * 1000;

      
      setTimeout(() => {
        set({ token: null });
        console.log('Token expiré, déconnexion automatique');
        
      }, delay);
    }

    set({ token });
  },
  logout: () => {
    console.log('Déconnexion manuelle : token supprimé');
    set({ token: null });
  },
}));

export default useAuthStore;
