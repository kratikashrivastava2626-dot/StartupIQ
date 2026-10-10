import ExplorerClient from "./ExplorerClient";
import { startupData } from "@/lib/data";

export const metadata = {
  title: "Startup Explorer | StartupIQ",
};

export default function StartupsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col h-full flex-grow">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Startup Explorer</h1>
        <p className="text-secondary mt-1">Search, filter, and discover startups across the dataset.</p>
      </div>
      <ExplorerClient initialData={startupData} />
    </div>
  );
}
