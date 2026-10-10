import DashboardClient from "./DashboardClient";
import { startupData } from "@/lib/data";

export const metadata = {
  title: "Executive Analytics | StartupIQ",
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Executive Overview</h1>
        <p className="text-secondary mt-1">High-level analysis of startup health, growth, and risk distributions.</p>
      </div>
      <DashboardClient initialData={startupData} />
    </div>
  );
}
