import { DocPaid } from "../components/features/table/DocPaid";
import { DocToBeConfirmed } from "../components/features/table/DocToBeConfirmed";


export default function DocumentManagementPage() {
    return (
        <div className="p-4 space-y-8">
        <DocToBeConfirmed/>
        <DocPaid/>
        </div>
    )
  }