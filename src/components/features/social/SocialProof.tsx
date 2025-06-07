import React from 'react';
import { Star, Users, TrendingUp, Shield } from 'lucide-react';

const SocialProof = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Utilisateurs satisfaits" },
    { icon: TrendingUp, value: "€2M+", label: "CA géré sur la plateforme" },
   // { icon: FileText, value: "10k+", label: "Factures créées" },
    { icon: Shield, value: "99.9%", label: "Disponibilité garantie" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex p-3 bg-white rounded-2xl shadow-lg mb-4">
                <stat.icon className="w-6 h-6 text-amber-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          
          <blockquote className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed">
            "Smart Invoice a révolutionné ma gestion administrative. Je gagne 5 heures par semaine et mes clients apprécient la qualité de mes factures."
          </blockquote>
          
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
              MC
            </div>
            <div>
              <div className="font-semibold text-gray-900">Marie Dubois</div>
              <div className="text-gray-600">Consultante Marketing, Lyon</div>
            </div>
          </div>
        </div>

        {/* Company logos */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-8">Ils nous font confiance</p>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <div className="bg-gray-200 h-12 w-24 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-sm">SARL Martin</span>
            </div>
            <div className="bg-gray-200 h-12 w-24 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-sm">Conseil+</span>
            </div>
            <div className="bg-gray-200 h-12 w-24 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-sm">TechCorp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;