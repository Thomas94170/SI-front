import { BadgeCheck, Clock } from "lucide-react";

export default function PricePage() {
  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-amber-50 py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
          <Clock className="w-4 h-4 mr-2" />
          Version bêta en cours
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Tarifs de <span className="text-amber-500">Smart Invoice</span>
        </h1>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          L’application est actuellement en version bêta. Profitez d’un accès gratuit pendant cette phase de lancement.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Offre de lancement
        </h2>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start space-x-3">
            <BadgeCheck className="w-5 h-5 text-green-500 mt-1" />
            <span className="text-gray-700">Accès complet aux fonctionnalités</span>
          </li>
          <li className="flex items-start space-x-3">
            <BadgeCheck className="w-5 h-5 text-green-500 mt-1" />
            <span className="text-gray-700">Mises à jour régulières durant la bêta</span>
          </li>
          <li className="flex items-start space-x-3">
            <BadgeCheck className="w-5 h-5 text-green-500 mt-1" />
            <span className="text-gray-700">Support prioritaire par email</span>
          </li>
        </ul>
        <div className="text-center">
          <span className="text-4xl font-bold text-amber-500">Gratuit</span>
          <p className="text-sm text-gray-500 mt-2">pendant toute la durée de la bêta</p>
        </div>
      </div>
    </main>
  );
}
