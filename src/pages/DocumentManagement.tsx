import { DocPaid } from "../components/features/table/DocPaid";
import { DocToBeConfirmed } from "../components/features/table/DocToBeConfirmed";
import DropZone from "../components/features/table/DropZone";
import useAuthStore from "../store/useAuthStore";

export default function DocumentManagementPage() {
    const userId = useAuthStore((state) => state.userId);
    console.log("👤 Utilisateur connecté :", userId);
    return (
        <div className="p-4 space-y-8">
        <DropZone/>
        <DocToBeConfirmed/>
        <DocPaid/>
        </div>
    )
  }

  // faire le drag and drop pour les factures externes