"""
ZAWADI MANGA - Python Bridge
This script demostrates how to scrape manga chapters and POST them 
to the Google Sheets / AppSheet backed.

Dependencies:
pip install gspread oauth2client requests
"""

import gspread
from oauth2client.service_account import ServiceAccountCredentials
import requests
import time

# 1. Setup Google Sheets Auth
# Replace 'service_account.json' with your real credentials file
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name('service_account.json', scope)
client = gspread.authorize(creds)

# 2. Open the workbook (acting as the AppSheet database)
sheet = client.open("ZawadiMangaDB").sheet1

def scrape_and_sync(manga_id, chapter_url):
    """
    Simulation of a scraper that finds new chapters and 
    updates the AppSheet backend.
    """
    print(f"Scraping {chapter_url}...")
    
    # Mock data extraction
    new_data = {
        "manga_id": manga_id,
        "chapter_number": 125,
        "title": "Shadows of Kilimanjaro",
        "sync_date": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    
    # 3. POST to Google Sheets
    row = [new_data["manga_id"], new_data["chapter_number"], new_data["title"], new_data["sync_date"]]
    sheet.append_row(row)
    print("Successfully appended to Google Sheets.")

    # 4. (Optional) Trigger AppSheet Automation Webhook directly on the Dev Server
    webhook_url = "https://YOUR_APP_URL/api/webhook/chapters" # Replace with real APP_URL
    try:
        requests.post(webhook_url, json=new_data)
        print("Webhook triggered.")
    except Exception as e:
        print(f"Webhook failed: {e}")

if __name__ == "__main__":
    scrape_and_sync("manga_001", "https://manga-source.com/the-awakening")
