"use client";

import { StartupRecord } from "@/lib/data";
import Link from "next/link";
import { 
  ArrowLeft, Download, Building2, MapPin, Briefcase, 
  Users, Calendar, TrendingUp, DollarSign, Activity,
  ShieldCheck, AlertTriangle
} from "lucide-react";

const MetricCard = ({ title, value, icon: Icon, colorClass = "text-primary" }: { title: string, value: React.ReactNode, icon: any, colorClass?: string }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
    <div className={`p-2.5 rounded-lg bg-gray-50 ${colorClass}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">{title}</p>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </div>
  </div>
);

export default function ProfileClient({ startup }: { startup: StartupRecord }) {
  const formatCurrency = (val: number | null | undefined) => {
    if (val == null) return "N/A";
    return `$${val.toLocaleString()}`;
  };

  const handleExportCSV = () => {
    const headers = Object.keys(startup).join(",");
    const row = Object.values(startup).map(val => `"${String(val).replace(/"/g, '""')}"`).join(",");
    const csvContent = [headers, row].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${startup.Startup_ID}_profile.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Link href="/startups" className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Explorer
        </Link>
        <div className="flex gap-3 w-full md:w-auto">
          <Link 
            href={`/compare?id=${startup.Startup_ID}`}
            className="flex-1 md:flex-none justify-center flex items-center gap-2 bg-white border border-gray-200 text-foreground px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Compare
          </Link>
          <button 
            onClick={handleExportCSV}
            className="flex-1 md:flex-none justify-center flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Header Profile */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">{startup.Startup_Name}</h1>
            <span className="bg-gray-100 text-secondary text-xs font-mono px-2 py-1 rounded">{startup.Startup_ID}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-secondary font-medium">
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {startup.Industry}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {startup.Location}</span>
            <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {startup.Stage} Stage</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <div className="text-right">
            <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-1">Success Prediction</p>
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold
              ${startup.Success_Prediction === 'High Potential' ? 'bg-green/10 text-green' : 
                startup.Success_Prediction === 'Moderate Potential' ? 'bg-amber/10 text-amber' : 
                'bg-red/10 text-red'}
            `}>
              {startup.Success_Prediction}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column - Financials */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-foreground border-b pb-2">Financials</h2>
          <MetricCard title="Funding Raised" value={formatCurrency(startup.Funding_Raised_USD)} icon={DollarSign} />
          <MetricCard title="Valuation" value={formatCurrency(startup.Valuation_USD)} icon={TrendingUp} colorClass="text-teal" />
          <MetricCard title="Monthly Revenue" value={formatCurrency(startup.Monthly_Revenue_USD)} icon={Activity} />
          <MetricCard title="Revenue Growth" value={`${startup.Revenue_Growth_Percent || 0}%`} icon={TrendingUp} colorClass="text-green" />
          <MetricCard title="Burn Rate" value={formatCurrency(startup.Burn_Rate_USD)} icon={Activity} colorClass="text-red" />
          <MetricCard title="Runway" value={startup.Runway_Months != null ? `${startup.Runway_Months} months` : "N/A"} icon={Calendar} colorClass="text-amber" />
        </div>

        {/* Middle Column - Health & Risk */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-foreground border-b pb-2">Health & Risk</h2>
          <MetricCard title="Health Score" value={`${startup.Startup_Health_Score.toFixed(1)} / 100`} icon={Activity} colorClass="text-primary" />
          <MetricCard title="Risk Level" value={startup.Risk_Level || "Unknown"} icon={startup.Risk_Level === "Low Risk" ? ShieldCheck : AlertTriangle} colorClass={startup.Risk_Level === "Low Risk" ? "text-green" : startup.Risk_Level === "Medium Risk" ? "text-amber" : "text-red"} />
          <MetricCard title="Growth Category" value={startup.Growth_Category} icon={TrendingUp} colorClass="text-teal" />
          <MetricCard title="Investment Recommendation" value={startup.Investment_Recommendation} icon={Briefcase} />
          <MetricCard title="AI Confidence" value={`${startup.AI_Confidence.toFixed(1)}%`} icon={Activity} colorClass="text-primary" />
          <MetricCard title="Investors" value={startup.Investor_Count} icon={Users} />
        </div>

        {/* Right Column - Operations */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-foreground border-b pb-2">Operations</h2>
          <MetricCard title="Team Size" value={startup.Team_Size} icon={Users} />
          <MetricCard title="Customer Count" value={startup.Customer_Count?.toLocaleString() || "N/A"} icon={Users} colorClass="text-teal" />
          <MetricCard title="Customer Growth" value={`${startup.Customer_Growth_Percent || 0}%`} icon={TrendingUp} colorClass="text-green" />
          <MetricCard title="Product Score" value={`${startup.Product_Score} / 100`} icon={Activity} />
          <MetricCard title="Innovation Score" value={`${startup.Innovation_Score} / 100`} icon={Activity} />
          <MetricCard title="Market Demand" value={`${startup.Market_Demand_Score} / 100`} icon={Activity} />
        </div>

      </div>
    </div>
  );
}
