## GA4 Funnel Guide: Multi‑Step Lead Form Journey

This guide helps you build a clear GA4 funnel to understand how users progress through the multi‑step lead form from open to payment.

### What this covers

- Form open source (which page triggered the form)
- Field interactions (first keystroke and changes)
- Step views, step completions, back/jump abandons
- Form submission and payment CTA through to payment outcome

## Events emitted by the app

- **form_start**: when the modal opens
  - Params: `page_url`, `page_type`, `referrer`, `service_type`, `timestamp`
- **form_step_viewed**: when a step becomes visible
  - Params: `step_number` (number), `step` (string), `step_name`, `service_type`, `timestamp`
- **form_step_completed**: when user advances from a step
  - Params: `step_number`, `step`, `step_name`, `service_type`, `time_spent_seconds`, `timestamp`
- **form_step_abandoned**: when user goes back or jumps
  - Params: `step_number`, `step`, `step_name`, `service_type`, `abandonment_reason`, `timestamp`
- **form_field_input**: on first keystroke and subsequent changes
  - Params: `field_name`, `input_action` ("input_started" | "input_changed"), `step_number`, `step`, `timestamp`
- **form_field_focus / form_field_blur**
  - Params: `field_name`, `step_number`, `step`, `timestamp`
- **form_submitted**: when the user submits the form
  - Params: `service_type`, `payment_choice`, `form_step_count` (also mirrored into `step`), `timestamp`
- **form_abandoned**: when the modal closes before success
  - Params: `step_number`, `step`, `service_type`, `abandonment_reason`, `timestamp`
- **payment_started**: when the user clicks Pay
  - Params: `service_type`, `payment_amount`, `payment_method`, `timestamp`
- **payment_completed / payment_failed**
  - Params: `service_type`, `payment_amount`, `payment_method`, `payment_id?`, `error_reason?`, `timestamp`

Step name mapping used by the app:

- 1: "Personal Details"
- 2: "Service Selection"
- 3: "Review & Submit"
- 4: "What's Next"

## GA4 setup: custom definitions

Create event‑scoped custom dimensions in GA4 Admin → Custom definitions → Create custom dimension. Recommended:

- `step_number` (Event parameter: step_number) — Number
- `step` (Event parameter: step) — Text
- `step_name` (Event parameter: step_name) — Text
- `service_type` (Event parameter: service_type) — Text
- `page_type` (Event parameter: page_type) — Text
- `page_url` (Event parameter: page_url) — Text
- `referrer` (Event parameter: referrer) — Text
- `abandonment_reason` (Event parameter: abandonment_reason) — Text
- `input_action` (Event parameter: input_action) — Text
- `field_name` (Event parameter: field_name) — Text
- `time_spent_seconds` (Event parameter: time_spent_seconds) — Number
- `form_step_count` (Event parameter: form_step_count) — Number

Mark the following as Conversions (Admin → Conversions):

- `lead_generated` (if you want MQL as primary)
- `payment_completed` (main revenue conversion)

## Build a Funnel Exploration (GA4 UI)

1. Go to Explore → "Funnel exploration" → Create new.
2. Date range: last 28 days (adjust as needed). Attribution: data‑driven or last click as per org policy.
3. Steps (Recommended closed funnel for true sequential, open funnel for flexible entry):

   - Step 1: `form_start`
   - Step 2: `form_step_viewed` where `step_number` = 1
   - Step 3: `form_step_completed` where `step_number` = 1
   - Step 4: `form_step_viewed` where `step_number` = 2
   - Step 5: `form_step_completed` where `step_number` = 2
   - Step 6: `form_step_viewed` where `step_number` = 3
   - Step 7: `form_submitted`
   - Step 8: `form_step_viewed` where `step_number` = 4
   - Step 9: `payment_started`
   - Step 10: `payment_completed`

4. Filters (optional):

   - Include `service_type` in [consultation, legal-notice, document-drafting, corporate-retainer]
   - Include `page_type` if you want per‑template funnel (e.g., `legal_notice_page`)
   - Exclude internal traffic (use your internal traffic segment)

5. Breakdown (Rows/slice):

   - Breakdown by `service_type`
   - Secondary breakdown by `page_type` or `page_url` (long tail — use page_type for stable grouping)

6. Additional settings:

   - Show elapsed time between steps to identify long steps
   - Enable "Next action" to see drop‑off destinations

7. Save exploration as "Lead Form Funnel" and share with your team.

## Diagnostic views

- Add a second exploration focused on abandonment:

  - View: `form_step_abandoned` and `form_abandoned`
  - Dimensions: `step_number`, `abandonment_reason`, `service_type`, `page_type`
  - Metric: Event count, Users

- Field friction micro‑funnel:

  - View: `form_field_input` filtered to `field_name = name` or `whatsappNumber`
  - Breakdowns: `input_action`, `step_number`, `service_type`

## Suggested dashboards (Reports → Library)

- Card: "Form open by page" — Event: `form_start` grouped by `page_type`, `page_url`
- Card: "Step view → completion rate (per step)" — Use `form_step_viewed` vs `form_step_completed` by `step_number`
- Card: "Abandon rate by step" — `form_step_abandoned` and `form_abandoned` by `step_number` and `abandonment_reason`
- Card: "Submit rate and Pay CTA rate" — `form_submitted`, `payment_started`, `payment_completed`

## Optional: BigQuery SQL (GA4 export)

Example to compute step view→complete rates and drop‑offs by page*type and service_type for the last 30 days. Replace `project.dataset.events*\*` with your table wildcard.

```sql
-- GA4 BigQuery (standard export schema)
DECLARE start_date DATE DEFAULT DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY);

WITH events AS (
  SELECT
    PARSE_DATE('%Y%m%d', event_date) AS event_date,
    user_pseudo_id,
    event_name,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'step_number') AS step_number,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'step') AS step,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'step_name') AS step_name,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'service_type') AS service_type,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_type') AS page_type
  FROM `project.dataset.events_*`
  WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d', start_date) AND FORMAT_DATE('%Y%m%d', CURRENT_DATE())
    AND event_name IN (
      'form_step_viewed','form_step_completed','form_abandoned','form_step_abandoned','form_start','form_submitted','payment_started','payment_completed'
    )
),
views AS (
  SELECT page_type, service_type, step_number, COUNT(*) AS views
  FROM events
  WHERE event_name = 'form_step_viewed'
  GROUP BY 1,2,3
),
completions AS (
  SELECT page_type, service_type, step_number, COUNT(*) AS completes
  FROM events
  WHERE event_name = 'form_step_completed'
  GROUP BY 1,2,3
),
abandons AS (
  SELECT page_type, service_type, step_number, COUNT(*) AS abandons
  FROM events
  WHERE event_name = 'form_step_abandoned'
  GROUP BY 1,2,3
)
SELECT
  v.page_type,
  v.service_type,
  v.step_number,
  v.views,
  c.completes,
  a.abandons,
  SAFE_DIVIDE(c.completes, v.views) AS view_to_complete_rate,
  SAFE_DIVIDE(a.abandons, v.views) AS abandon_rate
FROM views v
LEFT JOIN completions c USING (page_type, service_type, step_number)
LEFT JOIN abandons a USING (page_type, service_type, step_number)
ORDER BY v.page_type, v.service_type, v.step_number;
```

## QA and Debug checklist

- Use DebugView to confirm parameters are present:
  - `form_start` contains `page_url`, `page_type`, `referrer`
  - `form_step_viewed`, `form_step_completed` contain `step_number` and `step`
  - `form_field_input` fires on first keystroke for Name and WhatsApp number
  - `form_abandoned` includes the current step when closing
  - `payment_started` fires on pay CTA; `payment_completed` or `payment_failed` fires after

## KPIs to monitor

- Form start → Step 1 view rate
- Step view → completion rate per step
- Submit rate per page_type and service_type
- Pay CTA click‑through rate and payment success rate
- Top abandonment step and reason

## Tips

- Prefer `page_type` for stable breakdowns; use `page_url` for detailed deep dives
- Use an Open funnel when users may re‑enter at later steps; Closed funnel to assess strict sequential performance
- Consider creating audiences for users who reached Step 2 or Step 3 but did not submit (remarketing)
