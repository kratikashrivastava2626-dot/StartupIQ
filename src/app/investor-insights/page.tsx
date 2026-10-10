import InvestorInsightsClient from "./InvestorInsightsClient";
import { startupData } from "@/lib/data";

export const metadata = {
  title: "Investor Insights | StartupIQ",
};

export default function InvestorInsightsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Investor Insights</h1>
        <p className="text-secondary mt-1">Deep dive into funding, valuations, and industry potential.</p>
      </div>
      <InvestorInsightsClient initialData={startupData} />
    </div>
  );
}
