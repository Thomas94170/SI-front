import IncomePieChart from "../components/features/dashboard/charts/IncomePieChart";
import MonthlyBarChart from "../components/features/dashboard/charts/MonthlyBarChart";
import Navbar from "../components/features/navbar/Navbar";

export default function DashboardPage() {
    return (
        <>
        <Navbar/>
        <IncomePieChart/>
        <MonthlyBarChart/>
        </>
    )
  }