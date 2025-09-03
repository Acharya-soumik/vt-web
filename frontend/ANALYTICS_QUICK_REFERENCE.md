# Analytics Quick Reference Guide

## 📋 **About This Quick Reference**

This quick reference guide provides instant access to the most important analytics queries and metrics for monitoring the Vakil Tech platform performance. It's designed for daily use by analytics teams, product managers, and business stakeholders who need quick insights without diving into complex analysis.

### **What This Guide Provides:**

- **Daily Monitoring Queries**: Essential metrics for daily performance tracking
- **Troubleshooting Tools**: Quick diagnostics for common issues
- **Real-time Monitoring**: Live performance indicators
- **Alert Queries**: Proactive monitoring for anomalies
- **Benchmark References**: Performance targets and thresholds

### **When to Use This Guide:**

- **Daily Standups**: Quick performance overview
- **Incident Response**: Rapid troubleshooting and diagnostics
- **Weekly Reviews**: Trend analysis and performance tracking
- **Alert Investigation**: Understanding performance anomalies
- **Quick Insights**: Fast answers to common questions

### **How to Use This Guide:**

1. **Copy the SQL queries** directly into your GA4 BigQuery interface
2. **Modify date ranges** as needed for your analysis period
3. **Set up automated alerts** using the provided threshold queries
4. **Bookmark frequently used queries** for quick access
5. **Share insights** with stakeholders using the results

### **Related Documentation:**

- **User Analytics Guide**: Comprehensive analysis and optimization strategies
- **GA4 Analytics Documentation**: Technical implementation details
- **Analytics Implementation Guide**: Setup and configuration instructions

### **Quick Start:**

- **New to Analytics?** Start with "Daily Monitoring Queries"
- **Troubleshooting Issues?** Use "Troubleshooting Queries"
- **Setting Up Alerts?** Check "Alert Queries"
- **Performance Analysis?** Use "Weekly/Monthly Analysis Queries"

## 🚀 **Daily Monitoring Queries**

### Lead Generation Today

```sql
SELECT
  COUNT(*) as leads_generated,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments_completed,
  ROUND(COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) * 100.0 / COUNT(*), 2) as conversion_rate
FROM events
WHERE event_name = 'lead_generated'
  AND DATE(timestamp) = CURRENT_DATE();
```

### Form Performance Today

```sql
SELECT
  COUNT(CASE WHEN event_name = 'form_start' THEN 1 END) as form_starts,
  COUNT(CASE WHEN event_name = 'form_submitted' THEN 1 END) as form_submissions,
  ROUND(COUNT(CASE WHEN event_name = 'form_submitted' THEN 1 END) * 100.0 / COUNT(CASE WHEN event_name = 'form_start' THEN 1 END), 2) as completion_rate
FROM events
WHERE DATE(timestamp) = CURRENT_DATE()
  AND event_name IN ('form_start', 'form_submitted');
```

### Service Performance Today

```sql
SELECT
  service_type,
  COUNT(CASE WHEN event_name = 'service_viewed' THEN 1 END) as views,
  COUNT(CASE WHEN event_name = 'service_selected' THEN 1 END) as selections,
  ROUND(COUNT(CASE WHEN event_name = 'service_selected' THEN 1 END) * 100.0 / COUNT(CASE WHEN event_name = 'service_viewed' THEN 1 END), 2) as conversion_rate
FROM events
WHERE DATE(timestamp) = CURRENT_DATE()
  AND event_name IN ('service_viewed', 'service_selected')
GROUP BY service_type
ORDER BY conversion_rate DESC;
```

## 📊 **Weekly Analysis Queries**

### Weekly Conversion Funnel

```sql
SELECT
  DATE_TRUNC('week', timestamp) as week,
  COUNT(CASE WHEN event_name = 'page_view' THEN 1 END) as page_views,
  COUNT(CASE WHEN event_name = 'form_start' THEN 1 END) as form_starts,
  COUNT(CASE WHEN event_name = 'form_submitted' THEN 1 END) as form_submissions,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads_generated,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments_completed
FROM events
WHERE timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 4 WEEK)
GROUP BY DATE_TRUNC('week', timestamp)
ORDER BY week DESC;
```

### Weekly Service Trends

```sql
SELECT
  DATE_TRUNC('week', timestamp) as week,
  service_type,
  COUNT(CASE WHEN event_name = 'service_selected' THEN 1 END) as selections,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments
FROM events
WHERE timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 4 WEEK)
  AND event_name IN ('service_selected', 'payment_completed')
GROUP BY DATE_TRUNC('week', timestamp), service_type
ORDER BY week DESC, payments DESC;
```

## 🎯 **Monthly Performance Queries**

### Monthly Revenue by Service

```sql
SELECT
  DATE_TRUNC('month', timestamp) as month,
  service_type,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as orders,
  SUM(payment_amount) as total_revenue,
  AVG(payment_amount) as avg_order_value
FROM events
WHERE event_name = 'payment_completed'
  AND timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
GROUP BY DATE_TRUNC('month', timestamp), service_type
ORDER BY month DESC, total_revenue DESC;
```

### Monthly Traffic Source Performance

```sql
SELECT
  DATE_TRUNC('month', timestamp) as month,
  utm_source,
  utm_campaign,
  COUNT(*) as sessions,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments,
  ROUND(COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) * 100.0 / COUNT(*), 2) as conversion_rate
FROM events
WHERE utm_source IS NOT NULL
  AND timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
GROUP BY DATE_TRUNC('month', timestamp), utm_source, utm_campaign
ORDER BY month DESC, conversion_rate DESC;
```

## 🔍 **Troubleshooting Queries**

### Form Drop-off Analysis

```sql
SELECT
  step_number,
  step_name,
  COUNT(CASE WHEN event_name = 'form_step_completed' THEN 1 END) as completions,
  COUNT(CASE WHEN event_name = 'form_step_abandoned' THEN 1 END) as abandonments,
  ROUND(COUNT(CASE WHEN event_name = 'form_step_abandoned' THEN 1 END) * 100.0 /
    (COUNT(CASE WHEN event_name = 'form_step_completed' THEN 1 END) + COUNT(CASE WHEN event_name = 'form_step_abandoned' THEN 1 END)), 2) as dropoff_rate
FROM events
WHERE event_name IN ('form_step_completed', 'form_step_abandoned')
  AND timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
GROUP BY step_number, step_name
ORDER BY step_number;
```

### Payment Error Analysis

```sql
SELECT
  error_reason,
  COUNT(*) as error_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as error_percentage
FROM events
WHERE event_name = 'payment_failed'
  AND timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
GROUP BY error_reason
ORDER BY error_count DESC;
```

### Form Validation Errors

```sql
SELECT
  field_name,
  error_type,
  COUNT(*) as error_count
FROM events
WHERE event_name = 'form_validation_error'
  AND timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
GROUP BY field_name, error_type
ORDER BY error_count DESC;
```

## 📱 **Device Performance**

### Mobile vs Desktop Performance

```sql
SELECT
  device_category,
  COUNT(*) as sessions,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments,
  ROUND(COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) * 100.0 / COUNT(*), 2) as lead_rate,
  ROUND(COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) * 100.0 / COUNT(*), 2) as payment_rate
FROM events
WHERE timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY device_category
ORDER BY payment_rate DESC;
```

## 🌍 **Geographic Performance**

### Top Performing Cities

```sql
SELECT
  city,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments,
  ROUND(COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) * 100.0 / COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END), 2) as conversion_rate
FROM events
WHERE event_name IN ('lead_generated', 'payment_completed')
  AND timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
  AND city IS NOT NULL
GROUP BY city
ORDER BY payments DESC
LIMIT 20;
```

## ⚡ **Real-time Monitoring**

### Current Hour Performance

```sql
SELECT
  COUNT(CASE WHEN event_name = 'form_start' THEN 1 END) as form_starts,
  COUNT(CASE WHEN event_name = 'form_submitted' THEN 1 END) as form_submissions,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads_generated,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments_completed
FROM events
WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 1 HOUR);
```

### Active Users Right Now

```sql
SELECT
  COUNT(DISTINCT user_id) as active_users
FROM events
WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 5 MINUTE);
```

## 🎯 **A/B Test Analysis**

### Test Variant Performance

```sql
SELECT
  experiment_name,
  variant_name,
  COUNT(*) as sessions,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments,
  ROUND(COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) * 100.0 / COUNT(*), 2) as conversion_rate
FROM events
WHERE experiment_name IS NOT NULL
  AND timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 14 DAY)
GROUP BY experiment_name, variant_name
ORDER BY experiment_name, conversion_rate DESC;
```

## 📈 **Trend Analysis**

### Daily Trends (Last 30 Days)

```sql
SELECT
  DATE(timestamp) as date,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments,
  ROUND(COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) * 100.0 / COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END), 2) as conversion_rate
FROM events
WHERE event_name IN ('lead_generated', 'payment_completed')
  AND timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY DATE(timestamp)
ORDER BY date DESC;
```

### Hourly Performance Pattern

```sql
SELECT
  HOUR(timestamp) as hour_of_day,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as payments
FROM events
WHERE event_name IN ('lead_generated', 'payment_completed')
  AND timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
GROUP BY HOUR(timestamp)
ORDER BY hour_of_day;
```

## 🚨 **Alert Queries**

### Unusual Drop in Performance

```sql
-- Compare today vs 7-day average
SELECT
  'Today' as period,
  COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as leads
FROM events
WHERE event_name = 'lead_generated'
  AND DATE(timestamp) = CURRENT_DATE()

UNION ALL

SELECT
  '7-day Average' as period,
  ROUND(AVG(daily_leads), 0) as leads
FROM (
  SELECT
    DATE(timestamp) as date,
    COUNT(CASE WHEN event_name = 'lead_generated' THEN 1 END) as daily_leads
  FROM events
  WHERE event_name = 'lead_generated'
    AND timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
    AND DATE(timestamp) < CURRENT_DATE()
  GROUP BY DATE(timestamp)
) as daily_stats;
```

### High Error Rate Alert

```sql
SELECT
  'Today' as period,
  COUNT(CASE WHEN event_name = 'payment_failed' THEN 1 END) as failures,
  COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END) as successes,
  ROUND(COUNT(CASE WHEN event_name = 'payment_failed' THEN 1 END) * 100.0 /
    (COUNT(CASE WHEN event_name = 'payment_failed' THEN 1 END) + COUNT(CASE WHEN event_name = 'payment_completed' THEN 1 END)), 2) as failure_rate
FROM events
WHERE event_name IN ('payment_failed', 'payment_completed')
  AND DATE(timestamp) = CURRENT_DATE();
```

## 📋 **Quick Metrics Reference**

### Key Performance Indicators (KPIs)

- **Lead Conversion Rate**: `leads_generated / page_views`
- **Form Completion Rate**: `form_submitted / form_start`
- **Payment Conversion Rate**: `payment_completed / form_submitted`
- **Average Order Value**: `total_revenue / payment_completed`
- **Customer Acquisition Cost**: `ad_spend / payment_completed`

### Benchmark Targets

- **Lead Conversion**: 3-8%
- **Form Completion**: 60-80%
- **Payment Conversion**: 35-55%
- **Average Session Duration**: 2-5 minutes
- **Bounce Rate**: < 50%

### Alert Thresholds

- **Lead Generation Drop**: < 80% of 7-day average
- **Payment Failure Rate**: > 15%
- **Form Abandonment**: > 50%
- **Page Load Time**: > 3 seconds

This quick reference guide provides instant access to the most important analytics queries for monitoring and optimizing the Vakil Tech platform performance.
