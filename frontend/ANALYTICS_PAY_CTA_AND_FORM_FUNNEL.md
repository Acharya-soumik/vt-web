### GA4 tracking: Pay CTA and Lead Form Funnel

This guide documents how Pay-related CTAs and the 3-step lead form journey are tracked in GA4, and how to build reports to measure them.

### Prerequisites

- Set `NEXT_PUBLIC_ANALYTICS_ID` to your GA4 Measurement ID.
- Code reads config from `src/lib/analytics-config.ts`. Use GA4 DebugView to verify events in real time.

### Where tracking is wired

- `src/components/features/lead-form/lead-form-modal.tsx`
  - Raise Ticket CTA (`cta_click`, `cta_type=raise_ticket`)
  - Pay CTA (`cta_click`, `cta_type=pay`) and Retry (`cta_type=retry_payment`)
  - Payment lifecycle (`payment_started`, `payment_completed`, `payment_failed`, `payment_abandoned`)
- `src/components/features/lead-form/steps/payment-step.tsx`
  - Refund info CTA (`cta_click`, `cta_type=refund_policy_info`)
- `src/contexts/form-context.tsx`
  - Form journey (`form_start`, `form_step_viewed`, `form_step_completed`, `form_submitted`, `form_abandoned`)

### Event names and key parameters

- `cta_click`: `cta_type` (pay | retry_payment | raise_ticket | refund_policy_info), `service_type`, `step_number`, `page_url`
- `payment_started` / `payment_completed` / `payment_failed` / `payment_abandoned`: `service_type`, `payment_amount`, `payment_method`, `currency`, optional `payment_id`
- `form_start`: `service_type`, `page_type`, `page_url`, `referrer`
- `form_step_viewed` / `form_step_completed` / `form_step_abandoned`: `step_number`, `step_name`, `service_type`, optional `time_spent_seconds`/`abandonment_reason`
- `form_submitted`: `service_type`, `payment_choice`, `form_step_count`

### Recommended GA4 custom dimensions (Event scope)

Create in GA4 Admin → Custom definitions:

- `cta_type`, `service_type`, `step_number`
- `payment_amount`, `payment_method`
- Optional: `payment_choice`, `page_url`

### How to see Pay CTA clicks

1. GA4 → Explore → Free form
2. Filters: `event_name = cta_click`, parameter `cta_type = pay`
3. Rows: Event name or `service_type` and `step_number`
4. Values: Event count
5. Optional breakdowns: `page_path`, `device_category`

To see retries: use `cta_type = retry_payment`. For Raise Ticket: `cta_type = raise_ticket`.

### Lead form funnel (3 steps)

Build a Funnel exploration with these ordered steps:

1. `form_start`
2. `form_step_viewed` with `step_number = 1`
3. `form_step_completed` with `step_number = 1`
4. `form_submitted`

Add breakdowns by `service_type` (and optionally `page_path`). Add additional steps for payments if needed:

- `payment_started` → `payment_completed`

### Quick validation checklist

- Open any page, trigger the modal → see `form_start` in DebugView
- Fill step 1 → see `form_step_viewed`/`form_step_completed`
- Click Raise Ticket → see `cta_click` with `cta_type=raise_ticket`
- Click Pay → see `cta_click` with `cta_type=pay` then `payment_started`
- Success/fail → see `payment_completed`/`payment_failed`

### Notes

- All events are sent via `services/analytics-service.ts` and exposed through `hooks/use-analytics.ts`.
- The modal disables the Raise Ticket CTA until required fields (name, city, WhatsApp, consent) are valid, ensuring clean funnel data for step 1.
