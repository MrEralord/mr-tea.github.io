# QUICK FIX — Server submission failed

The website files in this package use **schema 3**.

## 1. Update Apps Script
1. Open the Google Sheet used for the exam.
2. Extensions → Apps Script.
3. Replace the entire contents of `Code.gs` with the `Code.gs` from this package.
4. Save.

## 2. Redeploy — this step is mandatory
Saving `Code.gs` does NOT update the public `/exec` endpoint.

1. Deploy → Manage deployments.
2. Open the existing Web App deployment (pencil icon).
3. Version → **New version**.
4. Deploy.
5. Keep the same `/exec` URL.

## 3. Test the /exec URL before the exam
Open the `/exec` URL in a normal browser tab.

It must return JSON containing:

```json
{
  "ok": true,
  "version": "2026-09-21-v3.1",
  "schema": 3,
  "exams": ["g12-cs-component1-covered-topics-2026-v1"]
}
```

If it says `schema: 2`, the old backend is still deployed.
If a Google login/permission page appears, Web App access is not set to the required public setting.

## 4. Upload the website files
Upload/replace:
- `index.html`
- `exam.css`
- `exam-data.js`
- `exam.js`

The current `exam-data.js` already contains your Apps Script `/exec` URL.

## 5. New protection in v3.1
Before an exam starts, the page checks the backend.
If the Apps Script is the wrong version, students will see the error BEFORE the 90-minute timer starts.

If a submission fails, the page now shows the exact server error instead of only “Server submission failed”.

## 6. Existing failed attempt
Do not clear browser storage yet.
After fixing and redeploying Apps Script, reopen the same exam page and press **Try again**.
The locally saved answers can then be submitted with the same Submission ID.
