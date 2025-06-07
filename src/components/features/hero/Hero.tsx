import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-amber-50 pt-16 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
              Nouveau : Suivi automatique des taxes
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Simplifiez votre 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500"> facturation</span>
              <br />
              en quelques clics
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Créez des devis et factures professionnels, gérez vos documents et suivez votre chiffre d'affaires en temps réel. 
              La solution tout-en-un pour les auto-entrepreneurs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center">
                Commencer l'essai gratuit
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              
              <button className="group flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                Voir la démo
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Essai gratuit 14 jours
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Sans engagement
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Support inclus
              </div>
            </div>
          </div>
          
          {/* Product Preview */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">Smart Invoice</div>
                </div>
                
                <div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-amber-200 to-orange-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  
                  <div className="bg-white rounded-lg p-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-3 bg-green-400 rounded w-1/4"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-xl shadow-lg animate-bounce">
              <span className="text-sm font-semibold">+€2,450</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-xl shadow-lg animate-pulse">
              <span className="text-sm font-semibold">Facture #001</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;