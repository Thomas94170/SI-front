import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

const USER_ID = '140d8575-8552-42b8-a878-b6ad31f7e4e2';

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
  const [invoices, setInvoices] = useState([]);
  const [columns, setColumns] = useState<string[]>([]);

  const handleMarkAsPaid = async (invoiceName: string) => {
    try {
        console.log(`🔄 Tentative de mise à jour de la facture : ${invoiceName} pour ${USER_ID}`);
      const res = await fetch(`http://localhost:8000/invoice/update/${invoiceName}`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Échec de la mise à jour");
      const updated = await res.json();
      console.log(`✅ Facture mise à jour avec succès :`, updated);
      // Supprimer la facture du tableau
      setInvoices((prev) => prev.filter((inv: any) => inv.invoiceName !== invoiceName));
      console.log(`🧹 Facture retirée de l'affichage : ${invoiceName}`);
    } catch (err) {
      console.error("Erreur lors du changement de statut :", err);
    }
  };
  

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        console.log(`invoice pour ${USER_ID}`)
        const res = await fetch("http://localhost:8000/invoice");
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
  }, []);

  return (
    <div className="space-y-4">
    <Typography variant="h5" className="text-blue-gray-700">
      Factures en attente de paiement – à valider ou rejeter
    </Typography>

    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 capitalize"
              >
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {columnLabels[col] || col}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv: any, index: number) => {
            const isLast = index === invoices.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={inv.id}>
                {columns.map((col) => (
                  <td key={col} className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {typeof inv[col] === "object"
                        ? JSON.stringify(inv[col])
                        : inv[col]}
                    </Typography>
                  </td>
                ))}
                <td className={classes}>
          <button
            onClick={() => handleMarkAsPaid(inv.invoiceName)}
            className="text-green-600 font-medium hover:underline"
          >
            Payé
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
