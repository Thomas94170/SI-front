import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const USER_ID = '140d8575-8552-42b8-a878-b6ad31f7e4e2';
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

 useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const results = await Promise.all(
          months.map(async (month) => {
            const incomeRes = await fetch(`http://localhost:8000/income/monthly-income?year=${YEAR}&month=${month.number}&userId=${USER_ID}`)
            const taxRes = await fetch(`http://localhost:8000/income/monthly-taxation?year=${YEAR}&month=${month.number}&userId=${USER_ID}`)

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
  }, [])

    return (
        <div className='w-full h-[400px]'>
         {errorMessage && (
        <p className="text-red-600 font-medium">{errorMessage}</p>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(val: number) => `${val.toLocaleString('fr-FR')} €`} />
          <Legend />
          <Bar dataKey="income" name="CA mensuel" fill="#3BB273" minPointSize={1} />
          <Bar dataKey="taxes" name="Taxes mensuelles" fill="#F40000" minPointSize={1} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    );
  }

