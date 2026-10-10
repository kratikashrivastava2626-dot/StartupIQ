"use client";

import { useState, useMemo } from "react";
import { StartupRecord } from "@/lib/data";
import { FilterX } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';

export default function InvestorInsightsClient({ initialData }: { initialData: StartupRecord[] }) {
  const [industryFilter, setIndustryFilter] = useState<string>("All");
  const [stageFilter, setStageFilter] = useState<string>("All");

  const industries = ["All", ...Array.from(new Set(initialData.map(d => d.Industry))).sort()];
  const stages = ["All", ...Array.from(new Set(initialData.map(d => d.Stage))).sort()];

  const filteredData = useMemo(() => {
    return initialData.filter(d => {
      const matchInd = industryFilter === "All" || d.Industry === industryFilter;
      const matchStage = stageFilter === "All" || d.Stage === stageFilter;
      return matchInd && matchStage;
    });
  }, [initialData, industryFilter, stageFilter]);

  const total = filteredData.length;
  const totalFunding = filteredData.reduce((acc, curr) => acc + (curr.Funding_Raised_USD || 0), 0);
  const avgValuation = total > 0 ? filteredData.reduce((acc, curr) => acc + (curr.Valuation_USD || 0), 0) / total : 0;
  const avgRevGrowth = total > 0 ? filteredData.reduce((acc, curr) => acc + (curr.Revenue_Growth_Percent || 0), 0) / total : 0;
  // Total investors across all selected startups
  const totalInvestors = filteredData.reduce((acc, curr) => acc + (curr.Investor_Count || 0), 0);
  const avgInnovation = total > 0 ? filteredData.reduce((acc, curr) => acc + (curr.Innovation_Score || 0), 0) / total : 0;

  // Formatting helpers
  const formatCurrency = (val: number) => {
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
    return `$${val.toLocaleString()}`;
  };

  // Chart Data
  const industryStats = useMemo(() => {
    const map = new Map<string, { funding: number; valuation: number }>();
    filteredData.forEach(d => {
      const ind = d.Industry || "Unknown";
      if (!map.has(ind)) map.set(ind, { funding: 0, valuation: 0 });
      const current = map.get(ind)!;
      current.funding += (d.Funding_Raised_USD || 0);
      current.valuation += (d.Valuation_USD || 0);
    });
    return Array.from(map.entries()).map(([name, stats]) => ({
      name,
      funding: stats.funding,
      valuation: stats.valuation
    })).sort((a,b) => b.funding - a.funding);
  }, [filteredData]);

  const stageDist = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach(d => {
      const val = d.Stage || "Unknown";
      counts[val] = (counts[val] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
  }, [filteredData]);

  const COLORS = ['#2563EB', '#0D9488', '#16A34A', '#D97706', '#DC2626', '#64748B', '#8B5CF6', '#EC4899'];

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-end">
        <div className="flex flex-col gap-1 w-48">
          <label className="text-xs font-semibold text-secondary">Industry</label>
          <select value={industryFilter} onChange={e => setIndustryFilter(e.target.value)} className="border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary">
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1 w-48">
          <label className="text-xs font-semibold text-secondary">Stage</label>
          <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary">
            {stages.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <button 
          onClick={() => { setIndustryFilter("All"); setStageFilter("All"); }}
          className="ml-auto flex items-center gap-2 text-sm text-secondary hover:text-foreground transition-colors px-3 py-1.5"
        >
          <FilterX className="w-4 h-4" /> Reset Filters
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-secondary font-medium mb-1">Total Funding Raised</span>
          <span className="text-2xl font-bold text-foreground">{formatCurrency(totalFunding)}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-secondary font-medium mb-1">Average Valuation</span>
          <span className="text-2xl font-bold text-foreground">{formatCurrency(avgValuation)}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-secondary font-medium mb-1">Avg Revenue Growth</span>
          <span className="text-2xl font-bold text-foreground">{avgRevGrowth.toFixed(1)}%</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-secondary font-medium mb-1">Total Investors</span>
          <span className="text-2xl font-bold text-foreground">{totalInvestors.toLocaleString()}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-secondary font-medium mb-1">Avg Innovation Score</span>
          <span className="text-2xl font-bold text-foreground">{avgInnovation.toFixed(1)}</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-foreground mb-6">Funding Raised by Industry</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryStats} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tickFormatter={formatCurrency} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip cursor={{fill: '#F1F5F9'}} formatter={(value: unknown) => formatCurrency(value as number)} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="funding" radius={[0, 4, 4, 0]}>
                  {industryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-foreground mb-6">Valuation Share by Industry</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={industryStats} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="valuation">
                  {industryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: unknown) => formatCurrency(value as number)} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-foreground mb-6">Startup Stage Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageDist} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
