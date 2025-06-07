import React from 'react';
import { UserPlus, FileText, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Créez votre compte",
      description: "Inscription gratuite en 2 minutes. Configurez votre profil et vos informations d'entreprise.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FileText,
      title: "2. Générez vos documents",
      description: "Créez devis et factures avec nos modèles. Uploadez vos documents externes en un clic.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: BarChart3,
      title: "3. Suivez vos performances",
      description: "Analysez votre CA, gérez vos taxes et pilotez votre activité avec nos tableaux de bord.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trois étapes simples pour transformer votre gestion administrative
          </p>
        </div>
        
        <div className="relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 to-amber-200 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative z-10">
                  <div className={`inline-flex p-6 rounded-full bg-gradient-to-r ${step.color} mb-6 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Step connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6 mb-6">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-200"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            Commencer maintenant
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;