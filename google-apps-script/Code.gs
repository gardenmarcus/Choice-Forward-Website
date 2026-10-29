/**
 * Choice Forward form webhook
 *
 * Setup:
 * 1) Create a Google Sheet with two tabs: Contact, Speaking
 * 2) Open Extensions > Apps Script and paste this file
 * 3) Replace SPREADSHEET_ID
 * 4) Deploy as Web App (Anyone)
 * 5) Copy Web App URL into js/config.js -> APPS_SCRIPT_WEBHOOK_URL
 */

const SPREADSHEET_ID = 'REPLACE_WITH_YOUR_SHEET_ID';
const CONTACT_SHEET_NAME = 'Contact';
const SPEAKING_SHEET_NAME = 'Speaking';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (payload.type === 'contact') {
      writeContactRow_(sheet, payload);
    } else if (payload.type === 'speaking') {
      writeSpeakingRow_(sheet, payload);
    } else {
      return json_({ ok: false, error: 'Unknown payload type' });
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function writeContactRow_(spreadsheet, data) {
  const sheet = spreadsheet.getSheetByName(CONTACT_SHEET_NAME) || spreadsheet.insertSheet(CONTACT_SHEET_NAME);
  ensureContactHeader_(sheet);
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.reason || '',
    data.reasonTag || '',
    data.message || ''
  ]);
}

function writeSpeakingRow_(spreadsheet, data) {
  const sheet = spreadsheet.getSheetByName(SPEAKING_SHEET_NAME) || spreadsheet.insertSheet(SPEAKING_SHEET_NAME);
  ensureSpeakingHeader_(sheet);
  sheet.appendRow([
    new Date(),
    data.fullName || '',
    data.email || '',
    data.organization || '',
    data.role || '',
    data.eventType || '',
    data.eventDate || '',
    data.datesFlexible === true,
    data.format || '',
    data.location || '',
    data.audienceSize || '',
    data.audienceOutcome || '',
    data.budgetTier || '',
    data.travelCovered || '',
    data.decisionTimeline || '',
    data.leadSource || ''
  ]);
}

function ensureContactHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Reason', 'Reason Tag', 'Message']);
  }
}

function ensureSpeakingHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Full Name',
      'Email',
      'Organization',
      'Role',
      'Event Type',
      'Event Date',
      'Dates Flexible',
      'Format',
      'Location',
      'Audience Size',
      'Audience Outcome',
      'Budget Tier',
      'Travel Covered',
      'Decision Timeline',
      'Lead Source'
    ]);
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
