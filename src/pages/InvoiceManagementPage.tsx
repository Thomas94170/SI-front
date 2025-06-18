import { InvoicePaid } from "../components/features/table/InvoicePaid";
import { InvToBeConfirmed } from "../components/features/table/InvToBeConfirmed";

export default function InvoiceManagementPage() {
    return (
        <div className="p-4 space-y-8">
       <InvToBeConfirmed/>
       <InvoicePaid/>
        </div>
    )
  }