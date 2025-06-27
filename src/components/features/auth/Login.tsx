import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import useAuthStore from '../../../store/useAuthStore';

const Login = () => {
  const navigate = useNavigate();
  const {setToken} = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch(`http://localhost:8000/auth/login`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
      });
      if(!res.ok){
        throw new Error('Echec connexion')
      }
      const data = await res.json();
      const token = data.access_token;
      setToken(token);
      navigate('/dashboard')
    } catch (error) {
      console.error(`Erreur: ${error}`);
      alert("Bad credentials")
    }finally{
      setIsLoading(false);
      console.log('Connexion avec:', { email, password });
    } 
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Effets de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-amber-500/10 to-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-4 shadow-2xl">
            <img 
              src="logo.png" 
              alt="Smart Invoice Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Connexion</h1>
          <p className="text-slate-400">Accédez à votre espace Smart Invoice</p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-amber-500 bg-white/10 border-white/20 rounded focus:ring-amber-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-slate-300">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Séparateur */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-sm text-slate-400">ou</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Lien d'inscription */}
          <div className="text-center">
            <p className="text-slate-400">
              Pas encore de compte ?{' '}
              <Link
                to="/register"
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>

        {/* Lien retour */}
        <div className="text-center mt-6">
          <a 
            href="#" 
            className="text-slate-400 hover:text-white transition-colors text-sm flex items-center justify-center space-x-2"
          >
            <span>← Retour à l'accueil</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;