import { useEffect, useState } from "react";
import IncomePieChart from "../components/features/dashboard/charts/IncomePieChart";
import MonthlyBarChart from "../components/features/dashboard/charts/MonthlyBarChart";
import Navbar from "../components/features/navbar/Navbar";
import useAuthStore from "../store/useAuthStore";




export default function DashboardPage() {
    const [totalIncome, setTotalIncome] = useState< number | null>(null)
    const userId = useAuthStore((state) => state.userId);

    useEffect(() => {
      if (userId) {
        console.log(`👤 Connecté avec userId : ${userId}`);
      }
    }, [userId]);
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-8 space-y-8">
        
        <div className="flex flex-col items-center w-full max-w-3xl space-y-4">
          <IncomePieChart onTotalIncomeCalculated={setTotalIncome} />
          <p className="text-sm text-gray-700 text-center">
            En bleu : chiffre d'affaires (CA) — En orange : cotisations Urssaf
          </p>
          {totalIncome !== null && (
            <p className="text-center text-gray-800 font-medium">
              Total CA calculé : {totalIncome.toLocaleString("fr-FR")} €
            </p>
          )}
        </div>

        <div className="flex flex-col items-center w-full max-w-4xl space-y-4">
          <MonthlyBarChart />
          <p className="text-sm text-gray-700 text-center">
            Représentation mois par mois du CA et des cotisations Urssaf
          </p>
        </div>

      </div>
    </>
  );
}
