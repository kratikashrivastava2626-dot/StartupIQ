import { Activity, Database, CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Methodology | StartupIQ",
};

export default function MethodologyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Analysis Methodology</h1>
        <p className="text-lg text-secondary leading-relaxed">
          StartupIQ employs a transparent, rule-based analytics pipeline to assess startup potential. 
          There are no &quot;black box&quot; machine learning models; instead, all insights are directly derived 
          from hard financial and operational metrics.
        </p>
      </div>

      <div className="space-y-12">
        
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-primary/10 text-primary rounded-lg">
              <Database className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Dataset & Processing</h2>
          </div>
          <p className="text-secondary mb-4">
            The source dataset contains comprehensive records for 300 startups, tracking metrics like funding, valuation, revenue growth, and team size.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-secondary">
              <CheckCircle2 className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <span><strong>Data Validation:</strong> Null values and missing categorical data are handled gracefully (rendered as "N/A" or "Unknown") ensuring analytical integrity.</span>
            </li>
            <li className="flex items-start gap-3 text-secondary">
              <CheckCircle2 className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <span><strong>Python Pipeline:</strong> Raw Excel data is ingested via <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-foreground">pandas</code>. Metrics are computed in a Python script before being served to the frontend.</span>
            </li>
          </ul>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-primary/10 text-primary rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Startup Health Score Calculation</h2>
          </div>
          <p className="text-secondary mb-4">
            The core metric of StartupIQ is the <strong>Health Score</strong>, a weighted composite index evaluating multiple facets of a startup's performance. The formula is:
          </p>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-4 font-mono text-sm text-foreground overflow-x-auto">
            Health Score = (Revenue Growth % × 0.30) +<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Customer Growth % × 0.20) +<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Product Score × 0.20) +<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Market Demand Score × 0.15) +<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Innovation Score × 0.15)
          </div>
          <p className="text-secondary">
            This approach penalizes startups with poor revenue metrics while rewarding sustainable customer growth and product excellence.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-green/10 text-green rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Predictions & Growth</h2>
            </div>
            <p className="text-secondary mb-4 text-sm">
              Predictions are deterministic classifications based on the computed Health Score:
            </p>
            <ul className="space-y-2 text-sm text-secondary mb-6">
              <li><strong>High Potential:</strong> Score ≥ 80</li>
              <li><strong>Moderate Potential:</strong> Score ≥ 60</li>
              <li><strong>High Risk:</strong> Score &lt; 60</li>
            </ul>
            <p className="text-secondary text-sm">
              Similarly, Growth Categories classify startups from <strong>Unicorn Potential</strong> (Score ≥ 90) down to <strong>Struggling</strong> (Score &lt; 60).
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-amber/10 text-amber rounded-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Risk Assessment</h2>
            </div>
            <p className="text-secondary mb-4 text-sm">
              Risk Level relies exclusively on a startup's operational runway, removing subjective bias:
            </p>
            <ul className="space-y-2 text-sm text-secondary">
              <li><strong>Low Risk:</strong> Runway &gt; 18 months</li>
              <li><strong>Medium Risk:</strong> Runway &gt; 8 months</li>
              <li><strong>High Risk:</strong> Runway ≤ 8 months</li>
            </ul>
          </section>
        </div>

      </div>

      <div className="mt-12 text-center">
        <Link href="/dashboard" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all shadow-sm">
          View Analytics
        </Link>
      </div>
    </div>
  );
}
