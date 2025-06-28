import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuthStore from '../../../../store/useAuthStore';

//const USER_ID = '140d8575-8552-42b8-a878-b6ad31f7e4e2';
const YEAR = new Date().getFullYear();
const months = [
    { name: 'Janvier', number: 1, year: YEAR },
    { name: 'Février', number: 2, year: YEAR },
    { name: 'Mars', number: 3, year: YEAR },
    { name: 'Avril', number: 4, year: YEAR },
    { name: 'Mai', number: 5, year: YEAR },
    { name: 'Juin', number: 6, year: YEAR },
    { name: 'Juillet', number: 7, year: YEAR },
    { name: 'Août', number: 8, year: YEAR },
    { name: 'Septembre', number: 9, year: YEAR },
    { name: 'Octobre', number: 10, year: YEAR },
    { name: 'Novembre', number: 11, year: YEAR },
    { name: 'Décembre', number: 12, year: YEAR },
  ];

export default function MonthlyBarChart() {
 const [data, setData] = useState<unknown[]>([])
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
 const userId = useAuthStore((state) => state.userId);



 useEffect(() => {
  if (!userId) return;
    const fetchMonthlyData = async () => {
      try {
        const results = await Promise.all(
          months.map(async (month) => {
            const incomeRes = await fetch(`${import.meta.env.VITE_API_URL}/income/monthly-income/${YEAR}/${month.number}/${userId}`)
            const taxRes = await fetch(`${import.meta.env.VITE_API_URL}/income/monthly-taxation/${YEAR}/${month.number}/${userId}`)

            const incomeJson = incomeRes.ok ? await incomeRes.json() : { value: 0 };
            const taxJson = taxRes.ok ? await taxRes.json() : { value: 0 };

            const income = typeof incomeJson.value === 'number' ? incomeJson.value : 0;
            const taxes = typeof taxJson.value === 'number' ? taxJson.value : 0;

            console.log(income, `for ${month.name}`)
            console.log(taxes, `for ${month.name}`)

            return {
              name: month.name,
              income,
              taxes,
            }
          })
        )

        setData(results)
      } catch (error) {
        if (error instanceof Error) {
            setErrorMessage(error.message);
            console.error('Erreur fetch :', error.message);
          } else {
            setErrorMessage('Une erreur inattendue est survenue.');
            console.error('Erreur inconnue', error);
          }
      }
    }

    fetchMonthlyData()
  }, [userId])

  return (
    <div className="bg-gradient-to-br from-white via-orange-50 to-blue-50 p-6 rounded-2xl shadow-lg w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        📊 Revenu et taxes mensuels – {YEAR}
      </h2>

      {errorMessage && (
        <p className="text-red-600 font-medium text-center mb-4">{errorMessage}</p>
      )}

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(val) => `${val / 1000}k €`} />
            <Tooltip formatter={(val: number) => `${val.toLocaleString('fr-FR')} €`} />
            <Legend
              wrapperStyle={{ fontSize: 14 }}
              iconType="circle"
            />
            <Bar dataKey="income" name="CA mensuel" fill="#228CDB" radius={[6, 6, 0, 0]} />
            <Bar dataKey="taxes" name="Taxes mensuelles" fill="#F18F01" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  }

