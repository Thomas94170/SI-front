import { CheckCircle } from "lucide-react";
import { features } from "../data/features";


export default function FeaturesPage() {
  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-amber-50 py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Fonctionnalités de <span className="text-amber-500">Smart Invoice</span>
        </h1>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Découvrez tout ce que Smart Invoice peut faire pour vous faire gagner du temps et gérer votre activité efficacement.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {features.map((feat, index) => (
          <div key={index} className="flex items-start space-x-4">
            <CheckCircle className="text-green-500 w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{feat.title}</h3>
              <p className="text-gray-600">{feat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
