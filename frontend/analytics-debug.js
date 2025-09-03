// Analytics Debug Script
// Run this in browser console to test analytics events

console.log("🔍 Analytics Debug Script");
console.log("Current gtag status:", typeof window.gtag);

// Test UTM parameter detection
console.log("🔍 UTM Parameters:");
const urlParams = new URLSearchParams(window.location.search);
const utmParams = {
  utm_source: urlParams.get("utm_source") || "",
  utm_medium: urlParams.get("utm_medium") || "",
  utm_campaign: urlParams.get("utm_campaign") || "",
  utm_term: urlParams.get("utm_term") || "",
  utm_content: urlParams.get("utm_content") || "",
};
console.log("UTM Data:", utmParams);

// Check if gtag is available
if (typeof window.gtag === 'function') {
  console.log("✅ gtag is available");
  
  // Test payment_completed event
  console.log("🔄 Testing payment_completed event...");
  window.gtag('event', 'payment_completed', {
    service_type: 'legal-notice',
    payment_amount: 49900,
    payment_method: 'razorpay',
    payment_id: 'test_payment_123',
    currency: 'INR',
    step: 2,
    step_name: 'Payment',
    timestamp: Date.now()
  });
  console.log("✅ payment_completed event sent");
  
  // Test form_step_viewed event
  console.log("🔄 Testing form_step_viewed event...");
  window.gtag('event', 'form_step_viewed', {
    step_number: 1,
    step: '1',
    step_name: 'Personal Details',
    service_type: 'legal-notice',
    timestamp: Date.now()
  });
  console.log("✅ form_step_viewed event sent");
  
  // Test page_view event with UTM
  console.log("🔄 Testing enhanced page_view event with UTM...");
  window.gtag('event', 'page_view', {
    page_path: window.location.pathname,
    page_title: document.title,
    page_type: 'legal_notice_page',
    service_type: 'legal-notice',
    utm_source: utmParams.utm_source,
    utm_medium: utmParams.utm_medium,
    utm_campaign: utmParams.utm_campaign,
    timestamp: Date.now()
  });
  console.log("✅ page_view event with UTM sent");
  
} else {
  console.log("❌ gtag is not available");
  console.log("Check if Google Analytics script is loaded");
}

// Check dataLayer
console.log("DataLayer contents:", window.dataLayer?.slice(-5)); // Last 5 events