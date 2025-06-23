import { InvoicePaid } from "../components/features/table/InvoicePaid";
import { InvToBeConfirmed } from "../components/features/table/InvToBeConfirmed";
import useAuthStore from "../store/useAuthStore";




export default function InvoiceManagementPage() {
    const userId = useAuthStore((state) => state.userId);
    console.log("👤 Utilisateur connecté :", userId);
    return (
        <div className="p-4 space-y-8">
       <InvToBeConfirmed/>
       <InvoicePaid/>
        </div>
    )
  }