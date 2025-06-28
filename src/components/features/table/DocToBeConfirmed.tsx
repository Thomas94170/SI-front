import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import useAuthStore from "../../../store/useAuthStore";

const columnLabels: Record<string, string> = {
  originalName: "Facture",
  metadata: "Informations",
};

const hiddenColumns = ["id", "userId", "user", "status", "filename", "url", "textExtracted", "createdAt"];

export function DocToBeConfirmed({
  documents,
  setDocuments,
}: {
  documents: any[];
  setDocuments: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const userId = useAuthStore((state) => state.userId);
  const [columns, setColumns] = useState<string[]>([]);

  const handleMarkAsPaid = async (doc: any) => {
    try {
      let paymentDate = doc.metadata?.paymentDate;

      if(!userId){
        return
      }

      if (!paymentDate) {
        paymentDate = prompt(
          "Aucune date détectée pour cette facture. Veuillez saisir une date de paiement (ex : 30/06/2025)"
        );
        if (!paymentDate || paymentDate.trim() === "") {
          alert("Action annulée : aucune date fournie.");
          return;
        }
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/documents/update/${doc.originalName}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentDate }),
        }
      );

      if (!res.ok) throw new Error("Échec de la mise à jour");

      const updated = await res.json();
      console.log("✅ Document mis à jour avec succès :", updated);

      setDocuments((prev) =>
        prev.filter((d: any) => d.originalName !== doc.originalName)
      );
    } catch (err) {
      console.error("Erreur lors du changement de statut :", err);
    }
  };

  // recalcul des colonnes quand les documents changent
  useEffect(() => {
    if (documents.length > 0) {
      const keys = Object.keys(documents[0]).filter(
        (key) => !hiddenColumns.includes(key)
      );
      setColumns(keys);
    }
  }, [documents]);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-xl shadow-md">
      <Typography variant="h4" className="font-bold text-gray-800">
        📌 Factures externes en attente – à valider ou rejeter
      </Typography>

      <Card className="overflow-hidden shadow-lg rounded-2xl border border-gray-100">
        <table className="w-full table-auto text-left">
          <thead className="bg-gradient-to-r from-orange-400 to-yellow-300 text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="p-4 text-sm font-semibold tracking-wide uppercase"
                >
                  {columnLabels[col] || col}
                </th>
              ))}
              <th className="p-4 text-sm font-semibold tracking-wide uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {documents.map((doc: any, index: number) => {
              const isLast = index === documents.length - 1;
              const rowClass = isLast ? "p-4" : "p-4 border-b border-gray-100";

              return (
                <tr
                  key={doc.id}
                  className="hover:bg-blue-50 transition duration-200"
                >
                  {columns.map((col) => (
                    <td key={col} className={rowClass}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-sm font-medium"
                      >
                        {col === "metadata" ? (
                          <div className="space-y-1">
                            <p>
                              <span className="font-semibold">Total TTC :</span>{" "}
                              {doc.metadata?.totalTTC || "—"}
                            </p>
                            <p>
                              <span className="font-semibold">
                                Paiement prévu :
                              </span>{" "}
                              {doc.metadata?.paymentDate || "—"}
                            </p>
                          </div>
                        ) : (
                          doc[col]
                        )}
                      </Typography>
                    </td>
                  ))}
                  <td className={rowClass}>
                    <button
                      onClick={() => handleMarkAsPaid(doc)}
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
