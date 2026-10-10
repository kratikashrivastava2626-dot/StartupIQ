import startups from '@/../public/data/startups.json';

export interface StartupRecord {
  Startup_ID: string;
  Startup_Name: string;
  Industry: string;
  Location: string;
  Startup_Age_Years: number;
  Stage: string;
  Founder_Experience_Years: number;
  Co_Founder_Count: number;
  Team_Size: number;
  Funding_Raised_USD: number;
  Valuation_USD: number;
  Monthly_Revenue_USD: number;
  Burn_Rate_USD: number;
  Runway_Months: number | null;
  Investor_Count: number;
  Revenue_Growth_Percent: number;
  Customer_Growth_Percent: number;
  Customer_Count: number;
  Employee_Growth_Percent: number;
  Product_Score: number;
  Market_Demand_Score: number;
  Innovation_Score: number;
  Marketing_Score: number;
  Customer_Satisfaction_Score: number;
  Startup_Health_Score: number;
  Success_Prediction: string;
  Risk_Level: string | null;
  Investment_Recommendation: string;
  Growth_Category: string;
  AI_Confidence: number;
}

// The parsed JSON dataset
export const startupData: StartupRecord[] = startups as StartupRecord[];

export function getOverviewMetrics() {
  const totalStartups = startupData.length;
  
  const avgHealth = startupData.reduce((acc, curr) => acc + curr.Startup_Health_Score, 0) / totalStartups;
  
  const avgConfidence = startupData.reduce((acc, curr) => acc + curr.AI_Confidence, 0) / totalStartups;
  
  const highPotential = startupData.filter(s => s.Success_Prediction === "High Potential").length;
  
  const lowRisk = startupData.filter(s => s.Risk_Level === "Low Risk").length;
  
  return {
    totalStartups,
    avgHealth: Number(avgHealth.toFixed(1)),
    avgConfidence: Number(avgConfidence.toFixed(1)),
    highPotential,
    lowRisk
  };
}
