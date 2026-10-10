# StartupIQ
AI-Powered Startup Success Prediction and Investor Analytics Platform.

Originally conceived as an analytical report using Python, Excel, and Power BI, this project has been fully developed into an interactive Next.js web application for academic demonstration.

## Features
- **Executive Analytics**: Dashboard overview of startup health, AI confidence, and risk distributions.
- **Investor Insights**: Deep dive into funding, valuation, and industry trends.
- **Startup Explorer**: Search, filter, and export the dataset of 300 real startup records.
- **Startup Analysis & Comparison**: View evidence-based insights, health scores, and side-by-side metric comparisons.

## Architecture & Data Pipeline
The application avoids complex backend deployment by using a static data ingestion pipeline:
1. **Raw Data**: `StartupIQ_V2_300_Startups.xlsx` (Initial Dataset)
2. **Python Analysis**: `analyze_startups.py` computes rule-based predictions, health scores, and risk levels, outputting to `StartupIQ_AI_Analyzed_Dataset.xlsx`.
3. **Web Data Builder**: `build_data.py` converts the analyzed Excel file into a static JSON payload (`public/data/startups.json`).
4. **Next.js Frontend**: The application consumes the JSON dataset natively to generate fast, interactive React Server Components and Client Components with Recharts.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- pandas, openpyxl (`pip install pandas openpyxl`)

### 1. Data Pipeline
If you modify the original dataset, rebuild the JSON payload:
\`\`\`bash
python analyze_startups.py
python build_data.py
\`\`\`

### 2. Frontend Development
Install dependencies and run the Next.js development server:
\`\`\`bash
npm install
npm run dev
\`\`\`
The application will be available at [http://localhost:3000](http://localhost:3000).

### 3. Production Build
To create an optimized production build (can be deployed to Vercel):
\`\`\`bash
npm run build
npm start
\`\`\`

## Methodology & Limitations
- **No Black Box AI**: "AI Confidence" and "Success Predictions" are transparent, rule-based algorithms defined in `analyze_startups.py`. No actual machine learning models were trained.
- **Dataset**: The system relies entirely on the provided 300-startup dataset. Missing data is handled gracefully within the UI.
