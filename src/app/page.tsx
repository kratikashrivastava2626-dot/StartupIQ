import Link from "next/link";
import { ArrowRight, Activity, TrendingUp, ShieldCheck, Database } from "lucide-react";
import { getOverviewMetrics } from "@/lib/data";

export default function Home() {
  const metrics = getOverviewMetrics();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-primary-light to-background py-20 lg:py-32 flex flex-col items-center text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-primary/20 text-primary text-sm font-medium mb-8 shadow-sm">
          <Database className="w-4 h-4" />
          <span>Analyzing {metrics.totalStartups} Real Startup Records</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-4xl mb-6">
          Discover Startup Potential. <br className="hidden md:block" />
          <span className="text-primary">Make Data-Driven Decisions.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-secondary max-w-2xl mb-10 leading-relaxed">
          AI-Powered Startup Intelligence & Investor Analytics Platform. Uncover insights on funding, growth, risk, and health scores instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
          <Link 
            href="/dashboard"
            className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            View Analytics
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/startups"
            className="flex items-center justify-center gap-2 bg-white text-foreground border border-gray-200 px-8 py-3.5 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm"
          >
            Explore Startups
          </Link>
        </div>
      </section>

      {/* KPI Preview Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16 -mt-16 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card bg-white p-6 rounded-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <div className="p-2 bg-primary-light rounded-lg">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm">Avg Health Score</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{metrics.avgHealth}<span className="text-lg text-secondary font-normal">/100</span></p>
          </div>
          
          <div className="glass-card bg-white p-6 rounded-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-4 text-teal">
              <div className="p-2 bg-teal/10 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm">High Potential</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{metrics.highPotential}</p>
            <p className="text-xs text-secondary mt-2">Startups identified</p>
          </div>
          
          <div className="glass-card bg-white p-6 rounded-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-4 text-green">
              <div className="p-2 bg-green/10 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm">Low Risk</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{metrics.lowRisk}</p>
            <p className="text-xs text-secondary mt-2">Based on runway &gt; 18 mo</p>
          </div>
          
          <div className="glass-card bg-white p-6 rounded-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-4 text-amber">
              <div className="p-2 bg-amber/10 rounded-lg">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm">AI Confidence</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{metrics.avgConfidence}%</p>
            <p className="text-xs text-secondary mt-2">Average confidence score</p>
          </div>
        </div>
      </section>

      {/* Methodology Brief */}
      <section className="w-full max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-6">Transparent & Data-Driven</h2>
        <p className="text-lg text-secondary max-w-3xl mx-auto mb-12">
          Our platform analyzes startups using a robust rule-based model combining real revenue growth, product metrics, and market demand to generate actionable insights. No black boxes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-3">Health Score</h3>
            <p className="text-secondary text-sm">
              A composite metric weighing Revenue Growth (30%), Customer Growth (20%), Product Score (20%), and Innovation (15%).
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-3">Risk Assessment</h3>
            <p className="text-secondary text-sm">
              Startups are classified based on hard operational data. Runway greater than 18 months indicates Low Risk, while under 8 months flags High Risk.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-3">Growth Potential</h3>
            <p className="text-secondary text-sm">
              Categorized predictions ranging from &quot;Struggling&quot; to &quot;Unicorn Potential&quot; providing immediate context to raw health scores.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
