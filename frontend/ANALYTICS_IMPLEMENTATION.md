# GA4 Analytics Implementation for Vakil Tech

## Overview

This document outlines the comprehensive Google Analytics 4 (GA4) implementation for the Vakil Tech legal services platform. The implementation tracks user journeys, form interactions, conversions, and engagement metrics to provide actionable insights for business optimization.

## Event Categories

### 1. Page Views & User Engagement

- **Page Views**: Enhanced page view tracking with page type, referrer, and user agent
- **Scroll Depth**: Tracks 25%, 50%, 75%, and 100% scroll completion
- **Time on Page**: Tracks time spent on each page before navigation/close
- **User Engagement**: General user interaction events

### 2. Form Interactions

- **Form Start**: When user opens the lead form
- **Form Step Completion**: Each step of the multi-step form
- **Form Step Abandonment**: When users leave a step without completion
- **Form Field Interactions**: Focus/blur events on form fields
- **Form Validation Errors**: When validation fails
- **Form Submission**: Successful form submission
- **Form Abandonment**: When users close form without completion

### 3. Service Selection

- **Service Viewed**: When users view service pages
- **Service Selected**: When users select a service in the form
- **Service Comparison**: When users compare multiple services

### 4. Payment Events

- **Payment Started**: When payment process begins
- **Payment Completed**: Successful payment completion
- **Payment Failed**: Failed payment attempts
- **Payment Abandoned**: When users abandon payment process

### 5. Conversion Events

- **Lead Generated**: When a lead is successfully created
- **Consultation Booked**: When consultation service is selected
- **Legal Notice Ordered**: When legal notice service is selected
- **Document Drafted**: When document drafting service is selected
- **Corporate Retainer Signed**: When corporate retainer is selected

### 6. Navigation & CTAs

- **Navigation Clicks**: Header navigation, footer links
- **CTA Clicks**: Call-to-action button clicks
- **Breadcrumb Clicks**: Breadcrumb navigation

### 7. Content Engagement

- **Content Viewed**: When users view specific content
- **FAQ Expanded**: When users expand FAQ sections
- **Testimonial Viewed**: When users view testimonials

### 8. Error Tracking

- **Form Errors**: Form-related errors
- **Payment Errors**: Payment-related errors
- **General Errors**: Other application errors

## Key User Journeys & Funnels

### 1. Lead Generation Funnel

```
Page View → Service View → Form Start → Form Step 1 → Form Step 2 → Form Step 3 → Form Submission → Lead Generated
```

**Tracking Points:**

- `page_view` → `service_viewed` → `form_start` → `form_step_completed` → `form_submitted` → `lead_generated`

**Abandonment Points:**

- `form_step_abandoned` (with step number and reason)
- `form_abandoned` (with step number and reason)

### 2. Payment Conversion Funnel

```
Form Submission → Payment Started → Payment Completed
```

**Tracking Points:**

- `form_submitted` → `payment_started` → `payment_completed`

**Abandonment Points:**

- `payment_failed` (with error reason)
- `payment_abandoned` (with step abandoned)

### 3. Service Selection Journey

```
Page View → Service Viewed → Service Selected → Form Start
```

**Tracking Points:**

- `page_view` → `service_viewed` → `service_selected` → `form_start`

### 4. Content Engagement Journey

```
Page View → Scroll Depth → Content Viewed → CTA Click
```

**Tracking Points:**

- `page_view` → `scroll_depth` → `content_viewed` → `cta_click`

## Event Parameters

### Common Parameters

- `timestamp`: Unix timestamp of event
- `page_url`: Current page URL
- `page_type`: Type of page (homepage, service_page, etc.)
- `user_agent`: Browser user agent
- `referrer`: Referring page URL

### Form-Specific Parameters

- `step_number`: Form step number (1-4)
- `step_name`: Human-readable step name
- `service_type`: Selected service type
- `time_spent_seconds`: Time spent on step
- `abandonment_reason`: Reason for abandonment
- `field_name`: Form field name
- `error_type`: Type of validation error

### Payment-Specific Parameters

- `payment_amount`: Payment amount in INR
- `payment_method`: Payment method (razorpay)
- `payment_id`: Payment transaction ID
- `error_reason`: Payment failure reason
- `currency`: Currency code (INR)

### Service-Specific Parameters

- `service_type`: Type of legal service
- `notice_type`: Type of legal notice (for legal notice service)
- `city`: User's city/location
- `source`: Source of service selection

## Implementation Files

### Core Analytics Files

- `src/services/analytics-service.ts`: Core analytics service with all tracking functions
- `src/hooks/use-analytics.ts`: React hook for analytics functions
- `src/lib/analytics-config.ts`: Analytics configuration

### Component Integration

- `src/contexts/form-context.tsx`: Form analytics tracking
- `src/components/shared/client-layout.tsx`: Page view and engagement tracking
- `src/components/shared/header.tsx`: Navigation and CTA tracking
- `src/components/features/homepage/hero-section.tsx`: Hero section CTA tracking
- `src/components/features/lead-form/`: Form step analytics

## Funnel Analysis Examples

### 1. Lead Generation Funnel Analysis

```javascript
// Example GA4 query for lead generation funnel
const leadFunnel = {
  page_view: "Total page views",
  form_start: "Users who started form",
  form_step_completed_1: "Users who completed step 1",
  form_step_completed_2: "Users who completed step 2",
  form_step_completed_3: "Users who completed step 3",
  form_submitted: "Users who submitted form",
  lead_generated: "Total leads generated",
};
```

### 2. Payment Conversion Funnel Analysis

```javascript
// Example GA4 query for payment conversion
const paymentFunnel = {
  form_submitted: "Users who submitted form",
  payment_started: "Users who started payment",
  payment_completed: "Users who completed payment",
  payment_failed: "Users who failed payment",
};
```

### 3. Service Selection Analysis

```javascript
// Example GA4 query for service performance
const serviceAnalysis = {
  service_viewed_legal_notice: "Legal notice page views",
  service_viewed_consultation: "Consultation page views",
  service_selected_legal_notice: "Legal notice selections",
  service_selected_consultation: "Consultation selections",
};
```

## Key Metrics to Track

### Conversion Metrics

- **Lead Conversion Rate**: `lead_generated / page_view`
- **Form Completion Rate**: `form_submitted / form_start`
- **Payment Conversion Rate**: `payment_completed / payment_started`
- **Service Selection Rate**: `service_selected / service_viewed`

### Engagement Metrics

- **Average Time on Page**: From `time_on_page` events
- **Scroll Depth Distribution**: From `scroll_depth` events
- **Form Step Drop-off**: From `form_step_abandoned` events

### Performance Metrics

- **Error Rates**: From `error_occurred` events
- **Form Validation Errors**: From `form_validation_error` events
- **Payment Failure Rate**: From `payment_failed` events

## UTM Parameter Tracking

The implementation automatically captures UTM parameters:

- `utm_source`: Traffic source
- `utm_medium`: Marketing medium
- `utm_campaign`: Campaign name
- `utm_term`: Search terms
- `utm_content`: Ad content

These are included in conversion events for attribution analysis.

## Debug Mode

In development, analytics events are logged to console for debugging:

```javascript
// Enable debug mode
const ANALYTICS_DEBUG = process.env.NODE_ENV !== "production";
```

## Best Practices

1. **Event Naming**: Consistent event naming convention
2. **Parameter Standardization**: Standard parameters across similar events
3. **Error Tracking**: Comprehensive error tracking for debugging
4. **Performance**: Passive event listeners for scroll tracking
5. **Privacy**: No PII in analytics events
6. **Testing**: Debug mode for development testing

## Future Enhancements

1. **A/B Testing Integration**: Track experiment variations
2. **Custom Dimensions**: Add business-specific dimensions
3. **Enhanced E-commerce**: Track service packages and pricing
4. **User Segmentation**: Track user behavior patterns
5. **Real-time Analytics**: Real-time dashboard integration

## Troubleshooting

### Common Issues

1. **Events not firing**: Check GA4 configuration and debug mode
2. **Missing parameters**: Verify parameter types and values
3. **Duplicate events**: Check event firing conditions
4. **Performance impact**: Use passive event listeners

### Debug Commands

```javascript
// Test analytics setup
const { validateAnalyticsSetup } = useAnalytics();
validateAnalyticsSetup();

// Test event firing
const { testEvent } = useAnalytics();
testEvent();
```

This comprehensive analytics implementation provides deep insights into user behavior, conversion optimization opportunities, and business performance metrics for the Vakil Tech platform.
