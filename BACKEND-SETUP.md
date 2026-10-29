# Backend setup map (Google + GitHub + Vercel)

This project now uses a Google Apps Script webhook instead of Node.

## 1) Google destination (Sheet)

1. Create a Google Sheet.
2. Copy the Sheet ID from the URL.
3. Create two tabs:
   - `Contact`
   - `Speaking`

## 2) Apps Script webhook

1. In that Sheet: Extensions → Apps Script.
2. Paste [google-apps-script/Code.gs](google-apps-script/Code.gs).
3. Replace:
   - `SPREADSHEET_ID = 'REPLACE_WITH_YOUR_SHEET_ID'`
4. Deploy:
   - Deploy → New deployment → Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web App URL.

## 3) Frontend webhook config

1. Open [js/config.js](js/config.js)
2. Set:
   - `APPS_SCRIPT_WEBHOOK_URL: 'YOUR_WEB_APP_URL'`

## 4) GitHub setup

1. Create a new GitHub repo.
2. From this folder, connect and push:
   - `git init`
   - `git add .`
   - `git commit -m "Initial Choice Forward 2027 site"`
   - `git branch -M main`
   - `git remote add origin <YOUR_GITHUB_REPO_URL>`
   - `git push -u origin main`

## 5) Vercel setup

1. Import the GitHub repo into Vercel.
2. Framework preset: **Other** (static site).
3. Root directory: repository root (this folder).
4. Build command: *(leave empty)*
5. Output directory: *(leave empty)*
6. Deploy.

## 6) Post-deploy checks

1. Submit test from Contact page.
2. Submit test from Speaking page.
3. Confirm both rows appear in Google Sheet tabs.

## Notes

- The temporary Node backend folder can be ignored for now.
- Current form code posts with `fetch(..., { mode: 'no-cors' })`, which is normal for Apps Script webhooks.
