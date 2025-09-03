# User Analytics Guide for Vakil Tech

## 📋 **About This Guide**

This comprehensive analytics guide is designed to help you understand and leverage the Google Analytics 4 (GA4) data collected from the Vakil Tech platform. It provides actionable insights, performance benchmarks, and optimization strategies to improve user experience and business outcomes.

### **What This Guide Covers:**
- **Conversion Funnel Analysis**: Track user journeys from page views to lead generation
- **Service Performance Metrics**: Understand which legal services perform best
- **User Behavior Insights**: Identify drop-off points and optimization opportunities
- **Business Intelligence**: Calculate ROI, CAC, and revenue metrics
- **Operational Excellence**: Set up alerts and monitoring systems

### **How to Use This Guide:**
1. **Start with Key Metrics Dashboard** for daily monitoring
2. **Use the SQL queries** to extract specific insights from GA4
3. **Follow the optimization recommendations** based on your data
4. **Set up regular reporting** using the provided templates
5. **Implement A/B tests** based on the suggested framework

### **Related Documentation:**
- **Analytics Quick Reference**: For daily monitoring queries and troubleshooting
- **GA4 Analytics Documentation**: Technical implementation details
- **Analytics Implementation Guide**: Setup and configuration instructions

## Overview

This guide helps you understand and utilize the comprehensive analytics data collected from the Vakil Tech platform to make data-driven business decisions, optimize user experience, and improve conversion rates.

## Key Metrics Dashboard

### 🎯 **Conversion Funnel Metrics**

#### Lead Generation Funnel

```
Page Views → Service Views → Form Starts → Form Completions → Lead Generation
```

**Key Metrics to Monitor:**

- **Page View to Form Start Rate**: `form_start / page_view`
- **Form Start to Completion Rate**: `form_submitted / form_start`
- **Overall Lead Conversion Rate**: `lead_generated / page_view`

**Benchmark Targets:**

- Page View to Form Start: 5-10%
- Form Start to Completion: 60-80%
- Overall Lead Conversion: 3-8%

#### Payment Conversion Funnel

```
Form Submission → Payment Started → Payment Completed
```

**Key Metrics to Monitor:**

- **Payment Initiation Rate**: `payment_started / form_submitted`
- **Payment Success Rate**: `payment_completed / payment_started`
- **Overall Payment Conversion**: `payment_completed / form_submitted`

**Benchmark Targets:**

- Payment Initiation: 40-60%
- Payment Success: 85-95%
- Overall Payment Conversion: 35-55%

### 📊 **Service Performance Metrics**

#### Service Popularity Analysis

Track which services are most viewed and selected:

```sql
-- Service View to Selection Rate
SELECT
  service_type,
  COUNT(*) as views,
  COUNT(CASE WHEN event_name = 'service_selected' THEN 1 END) as selections,
  ROUND(COUNT(CASE WHEN event_name = 'service_selected' THEN 1 END) * 100.0 / COUNT(*), 2) as conversion_rate
FROM events
WHERE event_name IN ('service_viewed', 'service_selected')
GROUP BY service_type
ORDER BY conversion_rate DESC;
```

**Expected Performance:**

- **Legal Notice**: 15-25% conversion rate
- **Consultation**: 20-30% conversion rate
- **Document Drafting**: 10-20% conversion rate
- **Corporate Retainer**: 5-15% conversion rate

#### Geographic Performance

Analyze performance by city/state:

```sql
-- Geographic Performance
SELECT
  city,
  COUNT(*) as total_leads,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments,
  ROUND(COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) * 100.0 / COUNT(*), 2) as payment_rate
FROM events
WHERE event_name IN ('lead_generated', 'payment_completed')
GROUP BY city
ORDER BY payment_rate DESC;
```

### 🔍 **User Behavior Analysis**

#### Form Step Analysis

Identify where users drop off in the form:

```sql
-- Form Step Drop-off Analysis
SELECT
  step_number,
  step_name,
  COUNT(*) as step_entries,
  COUNT(CASE WHEN event_name = 'form_step_completed' THEN 1 END) as completions,
  COUNT(CASE WHEN event_name = 'form_step_abandoned' THEN 1 END) as abandonments,
  ROUND(COUNT(CASE WHEN event_name = 'form_step_completed' THEN 1 END) * 100.0 / COUNT(*), 2) as completion_rate
FROM events
WHERE event_name IN ('form_step_completed', 'form_step_abandoned')
GROUP BY step_number, step_name
ORDER BY step_number;
```

**Expected Completion Rates:**

- Step 1 (Personal Details): 85-95%
- Step 2 (Service Selection): 90-98%
- Step 3 (Review & Submit): 70-85%

#### Time on Step Analysis

Monitor how long users spend on each step:

```sql
-- Average Time on Step
SELECT
  step_number,
  step_name,
  AVG(time_spent_seconds) as avg_time_seconds,
  COUNT(*) as total_users
FROM events
WHERE event_name = 'form_step_completed'
GROUP BY step_number, step_name
ORDER BY step_number;
```

**Expected Time Ranges:**

- Step 1: 30-90 seconds
- Step 2: 15-45 seconds
- Step 3: 20-60 seconds

### 📱 **User Engagement Metrics**

#### Page Engagement Analysis

```sql
-- Page Engagement Metrics
SELECT
  page_type,
  COUNT(*) as page_views,
  AVG(time_spent_seconds) as avg_time_on_page,
  COUNT(CASE WHEN scroll_percentage >= 75 THEN 1 END) as deep_scrolls,
  ROUND(COUNT(CASE WHEN scroll_percentage >= 75 THEN 1 END) * 100.0 / COUNT(*), 2) as deep_scroll_rate
FROM events
WHERE event_name IN ('page_view', 'time_on_page', 'scroll_depth')
GROUP BY page_type;
```

#### Content Engagement

Track which content performs best:

```sql
-- Content Performance
SELECT
  content_type,
  content_title,
  COUNT(*) as views,
  COUNT(CASE WHEN event_name = 'cta_click' THEN 1 END) as cta_clicks,
  ROUND(COUNT(CASE WHEN event_name = 'cta_click' THEN 1 END) * 100.0 / COUNT(*), 2) as cta_rate
FROM events
WHERE event_name IN ('content_viewed', 'cta_click')
GROUP BY content_type, content_title
ORDER BY cta_rate DESC;
```

### 🛠 **Error Analysis & Optimization**

#### Form Error Analysis

```sql
-- Form Validation Errors
SELECT
  field_name,
  error_type,
  COUNT(*) as error_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as error_percentage
FROM events
WHERE event_name = 'form_validation_error'
GROUP BY field_name, error_type
ORDER BY error_count DESC;
```

**Common Error Patterns:**

- **Phone Number**: Invalid format, missing country code
- **Location**: Empty field, invalid city
- **Name**: Empty field, special characters

#### Payment Error Analysis

```sql
-- Payment Failure Analysis
SELECT
  error_reason,
  COUNT(*) as failure_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as failure_percentage
FROM events
WHERE event_name = 'payment_failed'
GROUP BY error_reason
ORDER BY failure_count DESC;
```

### 📈 **Traffic Source Analysis**

#### UTM Parameter Performance

```sql
-- Traffic Source Performance
SELECT
  utm_source,
  utm_medium,
  utm_campaign,
  COUNT(*) as sessions,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments,
  ROUND(COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) * 100.0 / COUNT(*), 2) as lead_rate,
  ROUND(COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) * 100.0 / COUNT(*), 2) as payment_rate
FROM events
WHERE utm_source IS NOT NULL
GROUP BY utm_source, utm_medium, utm_campaign
ORDER BY lead_rate DESC;
```

### 🎯 **Actionable Insights & Recommendations**

#### 1. Form Optimization Opportunities

**High Drop-off at Step 1:**

- Simplify personal details form
- Add field validation hints
- Consider social login options

**High Drop-off at Step 2:**

- Improve service descriptions
- Add pricing comparison
- Include testimonials

**High Drop-off at Step 3:**

- Simplify review process
- Add progress indicators
- Reduce form length

#### 2. Payment Optimization

**Low Payment Initiation:**

- Add trust signals (security badges, testimonials)
- Simplify payment process
- Offer multiple payment options

**High Payment Failures:**

- Improve error messaging
- Add payment retry options
- Optimize payment gateway

#### 3. Content Optimization

**Low Engagement Pages:**

- Improve content quality
- Add interactive elements
- Optimize page load speed

**High Bounce Rate:**

- Improve page relevance
- Add internal linking
- Optimize meta descriptions

### 📊 **Regular Reporting Schedule**

#### Daily Monitoring

- Lead generation count
- Payment completion rate
- Critical error alerts

#### Weekly Analysis

- Conversion funnel performance
- Service popularity trends
- User behavior patterns

#### Monthly Review

- Traffic source performance
- Content engagement analysis
- A/B test results

### 🔧 **Setting Up Custom Reports**

#### Google Analytics 4 Custom Reports

1. **Lead Generation Report**

   - Dimensions: Date, Service Type, City
   - Metrics: Page Views, Form Starts, Lead Generation
   - Filters: Event Name contains 'lead_generated'

2. **Payment Performance Report**

   - Dimensions: Date, Service Type, Payment Method
   - Metrics: Payment Started, Payment Completed, Payment Failed
   - Filters: Event Name contains 'payment'

3. **User Journey Report**
   - Dimensions: Step Number, Step Name
   - Metrics: Step Entries, Step Completions, Time Spent
   - Filters: Event Name contains 'form_step'

### 📱 **Mobile vs Desktop Analysis**

```sql
-- Device Performance Comparison
SELECT
  device_category,
  COUNT(*) as sessions,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments,
  ROUND(COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) * 100.0 / COUNT(*), 2) as lead_rate,
  ROUND(COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) * 100.0 / COUNT(*), 2) as payment_rate
FROM events
GROUP BY device_category
ORDER BY lead_rate DESC;
```

### 🎯 **A/B Testing Framework**

#### Test Ideas Based on Analytics

1. **Form Length Test**

   - Control: Current 3-step form
   - Variant: 2-step form
   - Metric: Form completion rate

2. **Service Pricing Test**

   - Control: Current pricing display
   - Variant: Highlighted pricing
   - Metric: Service selection rate

3. **CTA Button Test**
   - Control: "Get Started"
   - Variant: "Talk to Lawyer Now"
   - Metric: CTA click rate

### 📈 **ROI Calculation**

#### Customer Acquisition Cost (CAC)

```sql
-- CAC by Traffic Source
SELECT
  utm_source,
  utm_campaign,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as customers,
  -- Add your ad spend data here
  ROUND(ad_spend / COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END), 2) as cac
FROM events
WHERE utm_source IS NOT NULL
GROUP BY utm_source, utm_campaign;
```

#### Lifetime Value (LTV)

```sql
-- Average Order Value by Service
SELECT
  service_type,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as orders,
  AVG(payment_amount) as avg_order_value,
  SUM(payment_amount) as total_revenue
FROM events
WHERE event_name = 'payment_completed'
GROUP BY service_type;
```

### 🚨 **Alert Setup**

#### Critical Metrics Alerts

1. **Lead Generation Drop**

   - Alert when daily leads < 80% of 7-day average
   - Check form functionality and traffic sources

2. **Payment Failure Spike**

   - Alert when payment failure rate > 15%
   - Check payment gateway and error logs

3. **Form Abandonment Increase**
   - Alert when form abandonment > 50%
   - Check form validation and user experience

### 📋 **Monthly Analytics Review Template**

#### Executive Summary

- Total leads generated: [Number]
- Total revenue: [Amount]
- Conversion rate: [Percentage]
- Top performing service: [Service Name]

#### Key Insights

- [Insight 1 with data]
- [Insight 2 with data]
- [Insight 3 with data]

#### Action Items

- [Action 1 with owner and deadline]
- [Action 2 with owner and deadline]
- [Action 3 with owner and deadline]

#### Next Month Goals

- [Goal 1 with target]
- [Goal 2 with target]
- [Goal 3 with target]

This comprehensive analytics guide will help you make data-driven decisions to optimize the Vakil Tech platform for better user experience and business growth.
