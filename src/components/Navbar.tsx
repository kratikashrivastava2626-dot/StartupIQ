import Link from "next/link";
import { BarChart3, Compass, LayoutDashboard, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-white p-1.5 rounded-lg group-hover:bg-primary/90 transition-colors">
            <BarChart3 className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            Startup<span className="text-primary">IQ</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/dashboard" className="text-secondary hover:text-primary flex items-center gap-2 transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Analytics
          </Link>
          <Link href="/startups" className="text-secondary hover:text-primary flex items-center gap-2 transition-colors">
            <Search className="w-4 h-4" />
            Explorer
          </Link>
          <Link href="/investor-insights" className="text-secondary hover:text-primary flex items-center gap-2 transition-colors">
            <Compass className="w-4 h-4" />
            Investor Insights
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/analyze"
            className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
          >
            Analyze Startup
          </Link>
        </div>
      </div>
    </header>
  );
}
