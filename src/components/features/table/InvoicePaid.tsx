import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import useAuthStore from "../../../store/useAuthStore";

//const USER_ID = '140d8575-8552-42b8-a878-b6ad31f7e4e2';
// prochaine étape : enlever l id en dur et le faire passer par le token 
const columnLabels: Record<string, string> = {
  invoiceName: "Facture",
  client: "Client",
  totalBT: "Montant HT",
  totalInclTax: "Montant TTC",
  dueDate: "Date d’échéance",
  phoneNumber: "Téléphone",
  email: "Email",
  status: "Statut",
};

const hiddenColumns = ["id", "userId", "user", "status"];

export function InvoicePaid() {
  const userId = useAuthStore((state)=> state.userId)
  const [invoices, setInvoices] = useState([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) return;
    const fetchInvoices = async () => {
      try {
        const res = await fetch(`http://localhost:8000/invoice/${userId}`);
        const data = await res.json();
        // regarder pour faire un fetch sur documents aussi afin que la facture venant d'un document apparaisse? ou sinon faire un autre component appelant les documents 
        const onHoldInvoices = data.filter((invoice: any) => invoice.status === "PAID");
        setInvoices(onHoldInvoices);

        if (onHoldInvoices.length > 0) {
          const keys = Object.keys(onHoldInvoices[0]).filter(
            (key) => !hiddenColumns.includes(key)
          );
          setColumns(keys);
        }
      } catch (err) {
        console.error("Erreur lors du fetch des factures :", err);
      }
    };

    fetchInvoices();
  }, [userId]);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-xl shadow-md">
      <Typography variant="h4" className="font-bold text-gray-800">
        ✅ Vos factures payées
      </Typography>

      <Card className="overflow-hidden shadow-lg rounded-2xl border border-gray-100">
        <table className="w-full table-auto text-left">
          <thead className="bg-gradient-to-r from-orange-400 to-yellow-300 text-white">
            <tr>
              {columns.map((col) => (
                <th key={col} className="p-4 text-sm font-semibold tracking-wide uppercase">
                  {columnLabels[col] || col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {invoices.map((inv: any, index: number) => {
              const isLast = index === invoices.length - 1;
              const rowClass = isLast ? "p-4" : "p-4 border-b border-gray-100";

              return (
                <tr key={inv.id} className="hover:bg-blue-50 transition duration-200">
                  {columns.map((col) => (
                    <td key={col} className={rowClass}>
                      <Typography variant="small" color="blue-gray" className="text-sm font-medium">
                        {typeof inv[col] === "object" ? JSON.stringify(inv[col]) : inv[col]}
                      </Typography>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
