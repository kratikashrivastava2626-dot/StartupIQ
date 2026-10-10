"use client";

import { useState, useMemo } from "react";
import { StartupRecord } from "@/lib/data";
import { Search, Download, FilterX, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import Link from "next/link";

export default function ExplorerClient({ initialData }: { initialData: StartupRecord[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [growthFilter, setGrowthFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [sortBy, setSortBy] = useState("health_desc");
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const industries = ["All", ...Array.from(new Set(initialData.map(d => d.Industry))).sort()];
  const locations = ["All", ...Array.from(new Set(initialData.map(d => d.Location))).sort()];
  const stages = ["All", ...Array.from(new Set(initialData.map(d => d.Stage))).sort()];
  const growths = ["All", ...Array.from(new Set(initialData.map(d => d.Growth_Category))).sort()];
  const risks = ["All", ...Array.from(new Set(initialData.map(d => d.Risk_Level).filter(Boolean))) as string[]].sort();

  const filteredAndSortedData = useMemo(() => {
    let result = initialData.filter(d => {
      const matchSearch = d.Startup_Name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.Startup_ID.toLowerCase().includes(searchTerm.toLowerCase());
      const matchInd = industryFilter === "All" || d.Industry === industryFilter;
      const matchLoc = locationFilter === "All" || d.Location === locationFilter;
      const matchStage = stageFilter === "All" || d.Stage === stageFilter;
      const matchGrow = growthFilter === "All" || d.Growth_Category === growthFilter;
      const matchRisk = riskFilter === "All" || d.Risk_Level === riskFilter;
      return matchSearch && matchInd && matchLoc && matchStage && matchGrow && matchRisk;
    });

    result = result.sort((a, b) => {
      switch (sortBy) {
        case "health_desc": return (b.Startup_Health_Score || 0) - (a.Startup_Health_Score || 0);
        case "health_asc": return (a.Startup_Health_Score || 0) - (b.Startup_Health_Score || 0);
        case "funding_desc": return (b.Funding_Raised_USD || 0) - (a.Funding_Raised_USD || 0);
        case "valuation_desc": return (b.Valuation_USD || 0) - (a.Valuation_USD || 0);
        case "rev_growth_desc": return (b.Revenue_Growth_Percent || 0) - (a.Revenue_Growth_Percent || 0);
        default: return 0;
      }
    });

    return result;
  }, [initialData, searchTerm, industryFilter, locationFilter, stageFilter, growthFilter, riskFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const formatCurrency = (val: number | null | undefined) => {
    if (val == null) return "N/A";
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
    return `$${val.toLocaleString()}`;
  };

  const handleExportCSV = () => {
    if (filteredAndSortedData.length === 0) return;
    const headers = Object.keys(filteredAndSortedData[0]).join(",");
    const rows = filteredAndSortedData.map(d => Object.values(d).map(val => `"${String(val).replace(/"/g, '""')}"`).join(","));
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "startupiq_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6 flex-grow">
      {/* Search and Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchTerm}
            onChange={e => {setSearchTerm(e.target.value); setPage(1);}}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <span className="text-sm font-medium text-secondary whitespace-nowrap">
            {filteredAndSortedData.length} records found
          </span>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white border border-gray-200 text-foreground px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium ml-auto md:ml-0"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
        {[
          { label: "Industry", val: industryFilter, set: setIndustryFilter, opts: industries },
          { label: "Location", val: locationFilter, set: setLocationFilter, opts: locations },
          { label: "Stage", val: stageFilter, set: setStageFilter, opts: stages },
          { label: "Growth", val: growthFilter, set: setGrowthFilter, opts: growths },
          { label: "Risk", val: riskFilter, set: setRiskFilter, opts: risks },
        ].map(filter => (
          <div key={filter.label} className="flex flex-col gap-1 flex-1 min-w-[120px]">
            <label className="text-xs font-semibold text-secondary">{filter.label}</label>
            <select 
              value={filter.val} 
              onChange={e => {filter.set(e.target.value); setPage(1);}} 
              className="border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary w-full"
            >
              {filter.opts.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        ))}
        <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
          <label className="text-xs font-semibold text-secondary">Sort By</label>
          <select 
            value={sortBy} 
            onChange={e => {setSortBy(e.target.value); setPage(1);}} 
            className="border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary w-full"
          >
            <option value="health_desc">Health Score (High to Low)</option>
            <option value="health_asc">Health Score (Low to High)</option>
            <option value="funding_desc">Funding (High to Low)</option>
            <option value="valuation_desc">Valuation (High to Low)</option>
            <option value="rev_growth_desc">Revenue Growth (High to Low)</option>
          </select>
        </div>
        <button 
          onClick={() => {
            setSearchTerm(""); setIndustryFilter("All"); setLocationFilter("All");
            setStageFilter("All"); setGrowthFilter("All"); setRiskFilter("All");
            setSortBy("health_desc"); setPage(1);
          }}
          className="flex items-center gap-2 text-sm text-secondary hover:text-foreground transition-colors px-3 py-1.5"
        >
          <FilterX className="w-4 h-4" /> Reset
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-grow flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-secondary font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Startup</th>
                <th className="px-6 py-4">Industry & Stage</th>
                <th className="px-6 py-4">Health Score</th>
                <th className="px-6 py-4">Funding</th>
                <th className="px-6 py-4">Prediction</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-secondary">No startups match your filters.</td>
                </tr>
              ) : (
                paginatedData.map(s => (
                  <tr key={s.Startup_ID} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{s.Startup_Name}</div>
                      <div className="text-xs text-secondary">{s.Startup_ID} • {s.Location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-foreground">{s.Industry}</div>
                      <div className="text-xs text-secondary">{s.Stage}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">{s.Startup_Health_Score.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {formatCurrency(s.Funding_Raised_USD)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${s.Success_Prediction === 'High Potential' ? 'bg-green/10 text-green' : 
                          s.Success_Prediction === 'Moderate Potential' ? 'bg-amber/10 text-amber' : 
                          'bg-red/10 text-red'}
                      `}>
                        {s.Success_Prediction}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/startups/${s.Startup_ID}`}
                        className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                      >
                        View Profile &rarr;
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 mt-auto">
            <span className="text-sm text-secondary">
              Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-md text-secondary hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium text-foreground">
                Page {page} of {totalPages}
              </span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-md text-secondary hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
