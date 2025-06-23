import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import useAuthStore from "../../../store/useAuthStore";
//const USER_ID = '140d8575-8552-42b8-a878-b6ad31f7e4e2';

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

export function InvToBeConfirmed() {
  const userId = useAuthStore((state)=> state.userId)
  const [invoices, setInvoices] = useState([]);
  const [columns, setColumns] = useState<string[]>([]);

  const handleMarkAsPaid = async (invoiceName: string) => {
    try {
      console.log(`🔄 Tentative de mise à jour de la facture : ${invoiceName} pour ${userId}`);
      const res = await fetch(`http://localhost:8000/invoice/update/${invoiceName}`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Échec de la mise à jour");
      const updated = await res.json();
      console.log(`✅ Facture mise à jour avec succès :`, updated);
      setInvoices((prev) => prev.filter((inv: any) => inv.invoiceName !== invoiceName));
    } catch (err) {
      console.error("Erreur lors du changement de statut :", err);
    }
  };

  useEffect(() => {
    if (!userId) return;
    const fetchInvoices = async () => {
      try {
        const res = await fetch(`http://localhost:8000/invoice/${userId}`);
        const data = await res.json();
        const onHoldInvoices = data.filter((invoice: any) => invoice.status === "ON_HOLD");
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
        📌 Factures en attente – à valider ou rejeter
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
              <th className="p-4 text-sm font-semibold tracking-wide uppercase">Action</th>
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
                  <td className={rowClass}>
                    <button
                      onClick={() => handleMarkAsPaid(inv.invoiceName)}
                      className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold hover:bg-green-200 transition"
                    >
                      Marquer comme payée
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
