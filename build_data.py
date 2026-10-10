import pandas as pd
import json
import os

def build_data():
    # Read the dataset
    df = pd.read_excel("StartupIQ_AI_Analyzed_Dataset.xlsx")
    
    # Handle NaN values: Replace NaN with None so it becomes null in JSON
    df = df.where(pd.notnull(df), None)
    
    # Convert to list of dicts
    records = df.to_dict(orient="records")
    
    # Ensure public/data directory exists
    os.makedirs("public/data", exist_ok=True)
    
    # Write to JSON
    with open("public/data/startups.json", "w") as f:
        json.dump(records, f)

    print(f"Successfully generated public/data/startups.json with {len(records)} records.")

if __name__ == "__main__":
    build_data()
