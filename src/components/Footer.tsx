import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                Startup<span className="text-primary">IQ</span>
              </span>
            </Link>
            <p className="text-secondary text-sm max-w-xs leading-relaxed">
              AI-Powered Startup Intelligence & Investor Analytics Platform. Discover startup potential, understand risk, and make data-driven decisions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-secondary">
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Executive Analytics</Link></li>
              <li><Link href="/investor-insights" className="hover:text-primary transition-colors">Investor Insights</Link></li>
              <li><Link href="/startups" className="hover:text-primary transition-colors">Startup Explorer</Link></li>
              <li><Link href="/compare" className="hover:text-primary transition-colors">Compare Startups</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Project Info</h3>
            <ul className="space-y-3 text-sm text-secondary">
              <li><Link href="/methodology" className="hover:text-primary transition-colors">Methodology</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Project</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © 2026 StartupIQ Project. Academic Demonstration.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            Data sourced from StartupIQ Dataset.
          </div>
        </div>
      </div>
    </footer>
  );
}
