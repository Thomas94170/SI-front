import React from 'react';
import { FileText, Upload, TrendingUp } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: FileText,
      title: "Création simplifiée",
      description: "Générez des devis et factures professionnels en quelques clics avec nos modèles personnalisables.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Upload,
      title: "Gestion documentaire",
      description: "Centralisez tous vos documents externes et gardez une trace complète de vos échanges clients.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: TrendingUp,
      title: "Suivi intelligent",
      description: "Analysez votre chiffre d'affaires et vos taxes en temps réel avec des tableaux de bord intuitifs.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Smart Invoice ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une solution complète qui s'adapte à votre activité et vous fait gagner un temps précieux
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${benefit.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
              
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-bl-2xl opacity-50"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;