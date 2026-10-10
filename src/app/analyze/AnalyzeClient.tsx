"use client";

import { useState } from "react";
import { StartupRecord } from "@/lib/data";
import { CheckCircle2, AlertCircle, ArrowRight, Search } from "lucide-react";
import Link from "next/link";

export default function AnalyzeClient({ initialData }: { initialData: StartupRecord[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const searchResults = initialData.filter(d => 
    searchTerm.length > 1 && (
      d.Startup_Name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.Startup_ID.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).slice(0, 5);

  const selectedStartup = initialData.find(s => s.Startup_ID === selectedId);

  // Generate Evidence-based strengths and concerns based on actual metrics
  const getInsights = (s: StartupRecord) => {
    const strengths = [];
    const concerns = [];

    if (s.Revenue_Growth_Percent > 50) strengths.push(`Strong revenue growth at ${s.Revenue_Growth_Percent}%`);
    else if (s.Revenue_Growth_Percent < 20) concerns.push(`Low revenue growth at ${s.Revenue_Growth_Percent}%`);

    if (s.Runway_Months && s.Runway_Months > 18) strengths.push(`Healthy runway of ${s.Runway_Months} months`);
    else if (s.Runway_Months && s.Runway_Months < 8) concerns.push(`Critical runway: only ${s.Runway_Months} months remaining`);

    if (s.Product_Score >= 80) strengths.push(`Excellent product score (${s.Product_Score}/100)`);
    if (s.Market_Demand_Score >= 80) strengths.push(`High market demand (${s.Market_Demand_Score}/100)`);
    if (s.Innovation_Score < 50) concerns.push(`Low innovation score (${s.Innovation_Score}/100)`);

    if (s.Customer_Growth_Percent > 100) strengths.push(`Exceptional customer growth (${s.Customer_Growth_Percent}%)`);

    return { strengths, concerns };
  };

  return (
    <div className="flex flex-col gap-8 flex-grow">
      {/* Search Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
        <h2 className="text-lg font-bold text-foreground mb-4">Search for a Startup to Analyze</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Type startup name or ID..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-gray-50 text-foreground"
          />
        </div>
        
        {/* Dropdown Results */}
        {searchTerm.length > 1 && searchResults.length > 0 && (
          <div className="absolute top-full left-6 right-6 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-10 max-h-64 overflow-y-auto">
            {searchResults.map(s => (
              <button 
                key={s.Startup_ID}
                onClick={() => {
                  setSelectedId(s.Startup_ID);
                  setSearchTerm("");
                }}
                className="w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold text-foreground block">{s.Startup_Name}</span>
                  <span className="text-xs text-secondary">{s.Startup_ID} • {s.Industry}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Analysis Output */}
      {selectedStartup && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* Left panel: Score & Recommendation */}
          <div className="bg-primary/5 p-8 flex flex-col md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100">
            <h2 className="text-2xl font-bold text-foreground mb-1">{selectedStartup.Startup_Name}</h2>
            <p className="text-sm text-secondary mb-8">{selectedStartup.Industry} • {selectedStartup.Stage}</p>
            
            <div className="mb-8">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Health Score</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-primary">{selectedStartup.Startup_Health_Score.toFixed(1)}</span>
                <span className="text-lg text-secondary font-normal mb-1">/100</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Prediction</p>
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold
                ${selectedStartup.Success_Prediction === 'High Potential' ? 'bg-green/10 text-green' : 
                  selectedStartup.Success_Prediction === 'Moderate Potential' ? 'bg-amber/10 text-amber' : 
                  'bg-red/10 text-red'}
              `}>
                {selectedStartup.Success_Prediction}
              </span>
            </div>

            <div className="mt-auto pt-6">
              <Link href={`/startups/${selectedStartup.Startup_ID}`} className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1">
                View Full Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right panel: Insights */}
          <div className="p-8 flex-1">
            <h3 className="text-lg font-bold text-foreground mb-6">Analysis Breakdown</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-secondary mb-1">Risk Level</p>
                <p className="font-semibold text-foreground">{selectedStartup.Risk_Level || "Unknown"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-secondary mb-1">Growth Category</p>
                <p className="font-semibold text-foreground">{selectedStartup.Growth_Category}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-secondary mb-1">Recommendation</p>
                <p className="font-semibold text-foreground">{selectedStartup.Investment_Recommendation}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-secondary mb-1">AI Confidence</p>
                <p className="font-semibold text-foreground">{selectedStartup.AI_Confidence.toFixed(1)}%</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green" /> Evidence-Based Strengths
                </h4>
                <ul className="space-y-2">
                  {getInsights(selectedStartup).strengths.map((str, idx) => (
                    <li key={idx} className="text-sm text-secondary flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green mt-1.5 flex-shrink-0" />
                      {str}
                    </li>
                  ))}
                  {getInsights(selectedStartup).strengths.length === 0 && <li className="text-sm text-gray-400">No significant strengths identified.</li>}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red" /> Areas of Concern
                </h4>
                <ul className="space-y-2">
                  {getInsights(selectedStartup).concerns.map((con, idx) => (
                    <li key={idx} className="text-sm text-secondary flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red mt-1.5 flex-shrink-0" />
                      {con}
                    </li>
                  ))}
                  {getInsights(selectedStartup).concerns.length === 0 && <li className="text-sm text-gray-400">No significant concerns identified.</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
