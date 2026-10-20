// Constants shared by the clinic demo's Function (./clinic.js) and its page
// (src/components/clinic/*). No prompt text here: this file ships to the browser.

export const CLINIC = 'Northlight Aesthetics';
export const MIN_MESSAGE = 10;
export const MAX_MESSAGE = 1500;

/** What the visitor can pick in the form's "Treatment" select. */
export const FORM_TREATMENTS = ['Botox / anti-wrinkle', 'Dermal fillers', 'GLP-1 weight loss (semaglutide)', 'Skin treatments', 'Free consultation', 'Not sure yet'];

export const PIPELINE = 'Clinic enquiries';
export const STAGES = [
  { id: 'new_lead', label: 'New lead' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'consult_booked', label: 'Consult booked' },
  { id: 'showed', label: 'Showed' },
  { id: 'treated', label: 'Treated' },
];

/** GoHighLevel "Inbound Webhook" trigger URL shape. Placeholders: the demo never calls it. */
export const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/{LOCATION_ID}/webhook-trigger/{TRIGGER_ID}';
