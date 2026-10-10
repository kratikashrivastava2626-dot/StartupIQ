import pandas as pd

# Read dataset
df = pd.read_excel("StartupIQ_V2_300_Startups.xlsx")

# Health Score Formula
df["Startup_Health_Score"] = (

    df["Revenue_Growth_Percent"] * 0.30 +
    df["Customer_Growth_Percent"] * 0.20 +
    df["Product_Score"] * 0.20 +
    df["Market_Demand_Score"] * 0.15 +
    df["Innovation_Score"] * 0.15
)

# Success Prediction
def predict(score):
    if score >= 80:
        return "High Potential"
    elif score >= 60:
        return "Moderate Potential"
    else:
        return "High Risk"

df["Success_Prediction"] = df["Startup_Health_Score"].apply(predict)

# Risk Level
def risk(row):
    if row["Runway_Months"] > 18:
        return "Low Risk"
    elif row["Runway_Months"] > 8:
        return "Medium Risk"
    else:
        return "High Risk"

# Only if Runway_Months exists
if "Runway_Months" in df.columns:
    df["Risk_Level"] = df.apply(risk, axis=1)



# Investment Recommendation

def investment(score):
    if score >= 85:
        return "Strong Invest"
    elif score >= 70:
        return "Consider Investment"
    else:
        return "Avoid"

df["Investment_Recommendation"] = df["Startup_Health_Score"].apply(investment)


# Growth Category

def growth(score):
    if score >= 90:
        return "Unicorn Potential"
    elif score >= 75:
        return "Fast Growth"
    elif score >= 60:
        return "Stable Growth"
    else:
        return "Struggling"

df["Growth_Category"] = df["Startup_Health_Score"].apply(growth)


# AI Confidence Score

df["AI_Confidence"] = (
    df["Startup_Health_Score"] * 0.85
).round(2)

# Save output
df.to_excel(
    "StartupIQ_AI_Analyzed_Dataset.xlsx",
    index=False
)

print("Analysis Complete!")