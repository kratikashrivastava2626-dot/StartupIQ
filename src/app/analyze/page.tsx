import AnalyzeClient from "./AnalyzeClient";
import { startupData } from "@/lib/data";

export const metadata = {
  title: "Startup Analysis | StartupIQ",
};

export default function AnalyzePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Startup Analysis</h1>
        <p className="text-secondary mt-1">Select a startup to review its rule-based AI analysis and evidence.</p>
      </div>
      <AnalyzeClient initialData={startupData} />
    </div>
  );
}
