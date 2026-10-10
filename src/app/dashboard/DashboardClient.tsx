"use client";

import { useState, useMemo } from "react";
import { StartupRecord } from "@/lib/data";
import { Activity, TrendingUp, ShieldCheck, Database, FilterX } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';

export default function DashboardClient({ initialData }: { initialData: StartupRecord[] }) {
  const [industryFilter, setIndustryFilter] = useState<string>("All");
  const [growthFilter, setGrowthFilter] = useState<string>("All");
  const [riskFilter, setRiskFilter] = useState<string>("All");
  const [stageFilter, setStageFilter] = useState<string>("All");

  const industries = ["All", ...Array.from(new Set(initialData.map(d => d.Industry))).sort()];
  const growths = ["All", ...Array.from(new Set(initialData.map(d => d.Growth_Category))).sort()];
  const risks = ["All", ...Array.from(new Set(initialData.map(d => d.Risk_Level).filter(Boolean))) as string[]].sort();
  const stages = ["All", ...Array.from(new Set(initialData.map(d => d.Stage))).sort()];

  const filteredData = useMemo(() => {
    return initialData.filter(d => {
      const matchInd = industryFilter === "All" || d.Industry === industryFilter;
      const matchGro = growthFilter === "All" || d.Growth_Category === growthFilter;
      const matchRisk = riskFilter === "All" || d.Risk_Level === riskFilter;
      const matchStage = stageFilter === "All" || d.Stage === stageFilter;
      return matchInd && matchGro && matchRisk && matchStage;
    });
  }, [initialData, industryFilter, growthFilter, riskFilter, stageFilter]);

  const total = filteredData.length;
  const avgHealth = total > 0 ? filteredData.reduce((acc, curr) => acc + curr.Startup_Health_Score, 0) / total : 0;
  const avgConf = total > 0 ? filteredData.reduce((acc, curr) => acc + curr.AI_Confidence, 0) / total : 0;
  const highPot = filteredData.filter(d => d.Success_Prediction === "High Potential").length;
  const lowRisk = filteredData.filter(d => d.Risk_Level === "Low Risk").length;

  // Chart Data
  const getDistribution = (key: keyof StartupRecord) => {
    const counts: Record<string, number> = {};
    filteredData.forEach(d => {
      const val = String(d[key] || "Unknown");
      counts[val] = (counts[val] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
  };

  const growthDist = getDistribution("Growth_Category");
  const successDist = getDistribution("Success_Prediction");
  const riskDist = getDistribution("Risk_Level");
  
  const COLORS = ['#2563EB', '#0D9488', '#16A34A', '#D97706', '#DC2626', '#64748B'];

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-secondary">Industry</label>
          <select value={industryFilter} onChange={e => setIndustryFilter(e.target.value)} className="border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary">
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-secondary">Growth Category</label>
          <select value={growthFilter} onChange={e => setGrowthFilter(e.target.value)} className="border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary">
            {growths.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-secondary">Risk Level</label>
          <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} className="border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary">
            {risks.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-secondary">Stage</label>
          <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary">
            {stages.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <button 
          onClick={() => { setIndustryFilter("All"); setGrowthFilter("All"); setRiskFilter("All"); setStageFilter("All"); }}
          className="ml-auto flex items-center gap-2 text-sm text-secondary hover:text-foreground transition-colors px-3 py-1.5"
        >
          <FilterX className="w-4 h-4" /> Reset Filters
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-secondary font-medium mb-1">Total Startups</span>
          <span className="text-2xl font-bold text-foreground">{total}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-secondary font-medium mb-1">Avg Health Score</span>
          <span className="text-2xl font-bold text-foreground">{avgHealth.toFixed(1)}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-secondary font-medium mb-1">High Potential</span>
          <span className="text-2xl font-bold text-foreground">{highPot}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-secondary font-medium mb-1">Low Risk</span>
          <span className="text-2xl font-bold text-foreground">{lowRisk}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs text-secondary font-medium mb-1">AI Confidence</span>
          <span className="text-2xl font-bold text-foreground">{avgConf.toFixed(1)}%</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-foreground mb-6">Growth Category Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthDist} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {growthDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-foreground mb-6">Success Prediction</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={successDist} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {successDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-foreground mb-6">Risk Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDist} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {riskDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index+1) % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
