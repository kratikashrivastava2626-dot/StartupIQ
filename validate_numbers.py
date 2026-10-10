import pandas as pd
import json

with open('public/data/startups.json') as f:
    data = json.load(f)

df = pd.DataFrame(data)

print('--- DATA VALIDATION ---')
print('Total Startups:', len(df))
print('Avg Health:', df['Startup_Health_Score'].mean())
print('Avg Confidence:', df['AI_Confidence'].mean())
print('High Potential:', len(df[df['Success_Prediction'] == 'High Potential']))
print('Low Risk:', len(df[df['Risk_Level'] == 'Low Risk']))
print('Total Funding:', df['Funding_Raised_USD'].sum())
print('Avg Valuation:', df['Valuation_USD'].mean())
print('Avg Rev Growth:', df['Revenue_Growth_Percent'].mean())
print('Total Investors:', df['Investor_Count'].sum())
print('Avg Innovation:', df['Innovation_Score'].mean())
