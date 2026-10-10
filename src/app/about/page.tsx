import { BarChart3, Code, FileSpreadsheet, Server } from "lucide-react";

export const metadata = {
  title: "About | StartupIQ",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About StartupIQ</h1>
        <p className="text-lg text-secondary leading-relaxed max-w-2xl mx-auto">
          An academic data analytics project demonstrating the integration of Python data science pipelines with modern web technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Project Objective
          </h2>
          <p className="text-secondary leading-relaxed text-sm">
            StartupIQ bridges the gap between raw data analysis and actionable insights. 
            Originally conceived as an Excel and Power BI analytical report, this web application transforms static datasets into an interactive, 
            investor-facing dashboard. The goal is to prove how rule-based logic and clean data pipelines can provide transparent decision support.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            Architecture
          </h2>
          <p className="text-secondary leading-relaxed text-sm">
            The application uses a Static Site Generation (SSG) approach. 
            A Python script reads and analyzes the raw dataset, exporting a compiled JSON file. 
            Next.js then ingests this file to generate highly performant, server-rendered pages and interactive client charts, 
            eliminating the need for a complex backend database.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Technology Stack</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-4">
            <Code className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-foreground mb-2">Frontend</h3>
          <p className="text-sm text-secondary">Next.js 15, React 19, TypeScript, Tailwind CSS v4, and Recharts for interactive visualizations.</p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="p-3 bg-green-50 text-green-600 rounded-full mb-4">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-foreground mb-2">Data Processing</h3>
          <p className="text-sm text-secondary">Python (Pandas & OpenPyXL) used for dataset cleaning, validation, and computing health scores.</p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-full mb-4">
            <Server className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-foreground mb-2">Deployment</h3>
          <p className="text-sm text-secondary">Designed for Vercel edge deployment, serving pre-processed JSON data natively without an active database.</p>
        </div>
      </div>
      
      <div className="mt-16 text-center text-secondary text-sm">
        <p>Developed as a College Project Demonstration.</p>
      </div>
    </div>
  );
}
