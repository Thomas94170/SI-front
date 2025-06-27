import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import useAuthStore from '../../../../store/useAuthStore';

//const USER_ID = '140d8575-8552-42b8-a878-b6ad31f7e4e2';
const YEAR = new Date().getFullYear();

const COLORS = ['#496DDB', '#EE8434']; 
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, value,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central" fontSize={14}
    fontWeight="bold">
      {`${value.toLocaleString('fr-FR')} €`}
    </text>
  );
};

interface IncomePieChartProps {
  onTotalIncomeCalculated: (total: number) => void;
}

export default function IncomePieChart({ onTotalIncomeCalculated }: IncomePieChartProps) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const incomeRes = await fetch(`http://localhost:8000/income/annual-income?year=${YEAR}&userId=${userId}`);
        const taxRes = await fetch(`http://localhost:8000/income/annual-taxation?year=${YEAR}&userId=${userId}`);

        const totalIncome = await incomeRes.json();
        const totalTaxes = await taxRes.json();

        const netIncome = totalIncome - totalTaxes;

        setData([
          { name: 'Revenu Net', value: netIncome },
          { name: 'Taxes', value: totalTaxes },
        ]);
        onTotalIncomeCalculated(totalIncome);
        setErrorMessage(null); // reset l'erreur si success
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
          console.error('Erreur fetch :', error.message);
        } else {
          setErrorMessage('Une erreur inattendue est survenue.');
          console.error('Erreur inconnue', error);
        }
      }
    };

    fetchData();
  }, [userId, onTotalIncomeCalculated]);

  return (
    <div className="bg-gradient-to-br from-white via-orange-50 to-blue-50 rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        💰 Répartition Revenu / Taxes – {YEAR}
      </h2>

      {errorMessage && (
        <p className="text-red-600 font-medium text-center mb-2">{errorMessage}</p>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-[#496DDB]" />
          Revenu Net
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-[#EE8434]" />
          Taxes
        </div>
      </div>
    </div>
  );
}
