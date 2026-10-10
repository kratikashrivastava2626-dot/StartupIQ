"use client";

import { useState, useEffect } from "react";
import { StartupRecord } from "@/lib/data";
import { Search, X, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CompareClient({ initialData }: { initialData: StartupRecord[] }) {
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      setSelectedIds(prev => {
        if (prev.includes(idFromUrl)) return prev;
        return [...prev, idFromUrl].slice(0, 3);
      });
    }
  }, [searchParams]);

  const searchResults = initialData.filter(d => 
    searchTerm.length > 1 && 
    (d.Startup_Name.toLowerCase().includes(searchTerm.toLowerCase()) || d.Startup_ID.toLowerCase().includes(searchTerm.toLowerCase())) &&
    !selectedIds.includes(d.Startup_ID)
  ).slice(0, 5);

  const selectedStartups = selectedIds.map(id => initialData.find(s => s.Startup_ID === id)!).filter(Boolean);

  const removeStartup = (id: string) => {
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const formatCurrency = (val: unknown) => {
    if (val == null) return "N/A";
    const num = Number(val);
    if (isNaN(num)) return "N/A";
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const compareMetric = (metric: keyof StartupRecord, higherIsBetter: boolean = true) => {
    if (selectedStartups.length < 2) return null;
    
    let bestIdx = 0;
    let bestVal = Number(selectedStartups[0][metric]) || 0;

    for (let i = 1; i < selectedStartups.length; i++) {
      const val = Number(selectedStartups[i][metric]) || 0;
      if (higherIsBetter ? val > bestVal : val < bestVal) {
        bestVal = val;
        bestIdx = i;
      }
    }
    return bestIdx;
  };

  const healthBest = compareMetric("Startup_Health_Score");
  const fundingBest = compareMetric("Funding_Raised_USD");
  const valuationBest = compareMetric("Valuation_USD");
  const revGrowthBest = compareMetric("Revenue_Growth_Percent");
  const burnBest = compareMetric("Burn_Rate_USD", false); // lower is better

  return (
    <div className="flex flex-col gap-8 flex-grow">
      {/* Selector */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="flex-1 w-full relative">
          <label className="text-sm font-semibold text-foreground mb-2 block">Add Startup to Compare ({selectedIds.length}/3)</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Type startup name..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              disabled={selectedIds.length >= 3}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>
          {searchTerm.length > 1 && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 z-10 max-h-64 overflow-y-auto">
              {searchResults.map(s => (
                <button 
                  key={s.Startup_ID}
                  onClick={() => {
                    setSelectedIds(prev => [...prev, s.Startup_ID]);
                    setSearchTerm("");
                  }}
                  className="w-full text-left px-4 py-2 border-b border-gray-50 hover:bg-gray-50 transition-colors text-sm"
                >
                  <span className="font-semibold">{s.Startup_Name}</span> <span className="text-xs text-secondary">({s.Industry})</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 flex-1">
          {selectedStartups.map((s, idx) => (
            <div key={`${s.Startup_ID}-${idx}`} className="bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">{s.Startup_Name}</span>
              <button onClick={() => removeStartup(s.Startup_ID)} className="text-gray-400 hover:text-red transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {selectedStartups.length === 0 && <span className="text-sm text-secondary py-2">No startups selected.</span>}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedStartups.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-4 font-semibold text-secondary w-1/4">Metric</th>
                {selectedStartups.map((s, idx) => (
                  <th key={`${s.Startup_ID}-${idx}`} className="px-6 py-4 w-1/4">
                    <div className="font-bold text-foreground text-lg">{s.Startup_Name}</div>
                    <div className="font-normal text-secondary text-xs">{s.Industry} • {s.Stage}</div>
                  </th>
                ))}
                {Array.from({ length: 3 - selectedStartups.length }).map((_, i) => (
                  <th key={`empty-${i}`} className="px-6 py-4 w-1/4 border-l border-dashed border-gray-200">
                    <span className="text-gray-400 font-normal">Empty Slot</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              
              {/* Row helper */}
              {([
                { label: "Health Score", key: "Startup_Health_Score", format: (v: unknown) => typeof v === 'number' ? v.toFixed(1) : String(v || "N/A"), best: healthBest },
                { label: "Prediction", key: "Success_Prediction", format: (v: unknown) => String(v || "N/A"), best: null },
                { label: "Risk Level", key: "Risk_Level", format: (v: unknown) => String(v || "N/A"), best: null },
                { label: "Growth Category", key: "Growth_Category", format: (v: unknown) => String(v || "N/A"), best: null },
                { label: "Funding Raised", key: "Funding_Raised_USD", format: (v: unknown) => formatCurrency(v), best: fundingBest },
                { label: "Valuation", key: "Valuation_USD", format: (v: unknown) => formatCurrency(v), best: valuationBest },
                { label: "Revenue Growth", key: "Revenue_Growth_Percent", format: (v: unknown) => `${String(v || 0)}%`, best: revGrowthBest },
                { label: "Burn Rate", key: "Burn_Rate_USD", format: (v: unknown) => formatCurrency(v), best: burnBest },
                { label: "Runway", key: "Runway_Months", format: (v: unknown) => v != null ? `${String(v)} mo` : "N/A", best: null },
                { label: "Innovation Score", key: "Innovation_Score", format: (v: unknown) => String(v || "N/A"), best: null },
              ] as const).map(row => (
                <tr key={row.label} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-secondary">{row.label}</td>
                  {selectedStartups.map((s, idx) => (
                    <td key={`${s.Startup_ID}-${idx}`} className={`px-6 py-4 ${row.best === idx ? 'bg-green/5' : ''}`}>
                      <div className="flex items-center justify-between">
                        <span className={`${row.best === idx ? 'font-bold text-green' : 'text-foreground'}`}>
                          {row.format(s[row.key as keyof StartupRecord])}
                        </span>
                        {row.best === idx && <Check className="w-4 h-4 text-green" />}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedStartups.length }).map((_, i) => (
                    <td key={`empty-td-${i}`} className="px-6 py-4 border-l border-dashed border-gray-200"></td>
                  ))}
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
