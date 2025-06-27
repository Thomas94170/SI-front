import { useState, useRef } from "react";
import { Card, Typography} from "@material-tailwind/react";
import { Trash2, UploadCloud } from "lucide-react";
import useAuthStore from "../../../store/useAuthStore";
import { Button } from "@material-tailwind/react";


const columnLabels: Record<string, string> = {
  name: "Nom du fichier",
  size: "Taille",
  type: "Type",
};

export default function DropZone({ onUploadSuccess }: { onUploadSuccess?: (doc: any) => void }) {
  const userId = useAuthStore((state)=> state.userId)
  const [files, setFiles] = useState<File[]>([]);
  const dropRef = useRef<HTMLTableRowElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const accepted = droppedFiles.filter((file) => file.type !== "");
    setFiles((prev) => [...prev, ...accepted]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDelete = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleValidate = async () => {
    if (files.length === 0 || !userId) {
      console.warn("Aucun fichier ou userId non défini");
      return;
    }
  
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);
  
      try {
        const res = await fetch('http://localhost:8000/documents', {
          method: 'POST',
          body: formData,
        });
  
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Erreur upload : ${res.status} ${errorText}`);
        }
  
        const result = await res.json();
        console.log('✅ Métadonnées extraites :', result.metadata);
        console.log('📄 Document enregistré :', result.originalName);
        if (onUploadSuccess) onUploadSuccess(result);

      } catch (error) {
        console.error('❌ Échec de l’envoi du fichier :', error);
      }
    }
  
    alert(`${files.length} fichier(s) envoyé(s) avec succès.`);
    setFiles([]); // Nettoyage si tout va bien
  };
  
  

  const formatSize = (bytes: number) =>
    bytes < 1024
      ? `${bytes} o`
      : bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} Ko`
      : `${(bytes / 1024 / 1024).toFixed(1)} Mo`;

  return (
    <Card className="overflow-hidden shadow-lg rounded-2xl border border-gray-100">
      <table className="w-full table-auto text-left">
        <thead className="bg-gradient-to-r from-orange-400 to-yellow-300 text-white">
          <tr>
            {Object.entries(columnLabels).map(([key, label]) => (
              <th key={key} className="p-4 text-sm font-semibold tracking-wide uppercase">
                {label}
              </th>
            ))}
            <th className="p-4 text-sm font-semibold tracking-wide uppercase text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          <tr
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="transition duration-200 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
          >
            <td colSpan={4} className="p-4 text-center text-blue-gray-600 font-medium italic">
              Glissez vos fichiers ici ou cliquez pour sélectionner
            </td>
          </tr>

          {files.map((file, index) => {
            const isLast = index === files.length - 1;
            const rowClass = isLast ? "p-4" : "p-4 border-b border-gray-100";

            return (
              <tr key={index} className="hover:bg-blue-50 transition duration-200">
                <td className={rowClass}>
                  <Typography variant="small" className="text-sm font-medium">{file.name}</Typography>
                </td>
                <td className={rowClass}>
                  <Typography variant="small">{formatSize(file.size)}</Typography>
                </td>
                <td className={rowClass}>
                  <Typography variant="small">{file.type || "?"}</Typography>
                </td>
                <td className={rowClass + " text-right"}>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {files.length > 0 && (
        <div className="flex justify-end gap-4 p-4 bg-gray-50 border-t border-gray-200">
          <Button
            color="blue"
            className="flex items-center gap-2"
            onClick={handleValidate}
          >
            <UploadCloud size={16} />
            Valider l’envoi
          </Button>
        </div>
      )}
    </Card>
  );
}
// rendre le chargement de fichier immediat, fichier analyser, directement visible dans en attente -> en attente validé immadiatement visible dans payé
// pour l'instant seulement en attente -> payé il disparait mais n'apparait pas dans payé