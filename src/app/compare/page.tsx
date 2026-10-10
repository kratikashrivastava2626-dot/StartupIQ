import CompareClient from "./CompareClient";
import { startupData } from "@/lib/data";
import { Suspense } from "react";

export const metadata = {
  title: "Compare Startups | StartupIQ",
};

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Compare Startups</h1>
        <p className="text-secondary mt-1">Evaluate and benchmark startups side-by-side.</p>
      </div>
      <Suspense fallback={<div className="p-8 text-center text-secondary">Loading comparison...</div>}>
        <CompareClient initialData={startupData} />
      </Suspense>
    </div>
  );
}
