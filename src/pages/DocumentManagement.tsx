import { useEffect, useState } from "react";
import { DocPaid } from "../components/features/table/DocPaid";
import { DocToBeConfirmed } from "../components/features/table/DocToBeConfirmed";
import DropZone from "../components/features/table/DropZone";
import useAuthStore from "../store/useAuthStore";

export default function DocumentManagementPage() {
  const userId = useAuthStore((state) => state.userId);
  const [documentsToConfirm, setDocumentsToConfirm] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;
    const fetchDocuments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/documents/${userId}`);
        const data = await res.json();
        const inProgress = data.filter(
          (doc: any) => doc.status === "IN_PROGRESS"
        );
        setDocumentsToConfirm(inProgress);
      } catch (err) {
        console.error("Erreur chargement documents :", err);
      }
    };

    fetchDocuments();
  }, [userId]);

  return (
    <div className="p-4 space-y-8">
      <DropZone
        onUploadSuccess={(newDoc) =>
          setDocumentsToConfirm((prev) => [newDoc, ...prev])
        }
      />
      <DocToBeConfirmed
        documents={documentsToConfirm}
        setDocuments={setDocumentsToConfirm}
      />
      <DocPaid />
    </div>
  );
}
