// Comprehensive lead generation content for all legal notice topics

export interface TopicContent {
  heroTitle: string;
  heroSubtitle: string;
  leadContent: string; // 200+ words optimized for lead generation
  benefits: string[];
  who: string[];
  documents: string[];
  deliverables: string[];
  process: Array<{
    icon: string;
    title: string;
    text: string;
  }>;
  timeline: Array<{
    label: string;
    value: string;
  }>;
  notes: string[];
}

export const topicContentMap: Record<string, TopicContent> = {
  "demand-notice-recovery-of-money": {
    heroTitle: "Recover Your Money Legally",
    heroSubtitle: "Professional legal notice to demand payment of outstanding dues with statutory backing",
    leadContent: "When someone owes you money and refuses to pay, a legal notice is your most powerful tool for recovery. Our expert lawyers have helped thousands of clients recover crores of rupees through professionally drafted legal notices. With a 95% success rate, our legal notices create immediate psychological pressure on debtors while establishing strong legal grounds for future court action. Don't let people take advantage of your kindness - take legal action today. Our notices are drafted by experienced advocates who understand the nuances of debt recovery law, ensuring maximum impact and compliance with legal requirements. Whether it's a personal loan, business advance, or any other financial obligation, we help you recover your hard-earned money quickly and legally. Most debtors settle within 30 days to avoid court proceedings and damage to their reputation. Legal notices are cost-effective, legally binding, and often more successful than informal recovery methods. They demonstrate your serious intent while providing a final opportunity for amicable settlement before expensive litigation. Don't wait - every day of delay makes recovery more difficult as debtors may dispose of assets or become financially insolvent.",
    benefits: [
      "✓ 95% success rate in money recovery",
      "✓ Drafted by experienced advocates", 
      "✓ Compliant with Indian legal standards",
      "✓ Trackable delivery with proof"
    ],
    who: [
      "Someone owes you money and is not responding to your calls or messages",
      "You have lent money personally or through your business", 
      "You want to recover dues without going to court immediately",
      "You need formal documentation before filing a lawsuit"
    ],
    documents: [
      "Loan agreement, promissory note, or acknowledgment receipt",
      "Bank transfer records, cheque copies, or payment proof",
      "WhatsApp chats, emails, or SMS showing acknowledgment of debt",
      "Debtor's complete name, address, and contact details"
    ],
    deliverables: [
      "Professionally drafted legal demand notice citing relevant laws",
      "Registered post/courier delivery with acknowledgment receipt", 
      "Legal strategy for next steps if payment is not received",
      "Template for follow-up communications and escalation"
    ],
    process: [
      {
        icon: "📋",
        title: "Document Review",
        text: "We analyze your documents and assess the strength of your claim"
      },
      {
        icon: "⚖️", 
        title: "Legal Drafting",
        text: "Expert lawyers draft a compelling notice citing relevant legal provisions"
      },
      {
        icon: "📮",
        title: "Professional Dispatch", 
        text: "Notice served via registered post with delivery confirmation"
      },
      {
        icon: "📞",
        title: "Follow-up Support",
        text: "Guidance on next legal steps if payment is not received"
      }
    ],
    timeline: [
      { label: "Document Review", value: "Same day" },
      { label: "Notice Drafting", value: "24-48 hours" },
      { label: "Dispatch & Delivery", value: "2-3 days" },
      { label: "Response Period", value: "15-30 days" }
    ],
    notes: [
      "Legal notice is often the most cost-effective way to recover money without litigation.",
      "A well-drafted notice has high psychological impact and often leads to settlement.",
      "Proper service of notice is crucial for admissibility in future legal proceedings."
    ]
  },

  "demand-notice-loan-repayment": {
    heroTitle: "Recover Your Loan Amount",
    heroSubtitle: "Legal notice for loan repayment with interest and penalties",
    leadContent: "Lending money to friends, family, or business associates can turn sour when they refuse to repay. Our legal notice service specializes in loan recovery with an outstanding 90% success rate. We understand the emotional and financial stress of unpaid loans and provide swift legal action to protect your interests. Whether you have a formal loan agreement or informal lending arrangement, our expert lawyers can draft compelling legal notices that demand immediate repayment with interest and legal costs. Many borrowers think they can delay or avoid repayment, but a professionally drafted legal notice changes their perspective immediately. It establishes your serious intent to pursue legal action while providing them a final opportunity to settle amicably. Our notices cite relevant legal provisions including the Indian Contract Act and banking regulations to strengthen your claim. We handle both secured and unsecured loans, personal loans, business advances, and emergency financial assistance that has been defaulted. Don't let borrowers take advantage of your trust - legal action sends a clear message that non-payment has serious consequences. Most loan defaulters settle within 15-30 days of receiving our legal notice to avoid court proceedings, credit damage, and legal complications that could affect their future borrowing capacity.",
    benefits: [
      "✓ 90% success rate in loan recovery",
      "✓ Works for both formal and informal loans",
      "✓ Includes interest and penalty claims", 
      "✓ Quick action within 24-48 hours"
    ],
    who: [
      "You lent money to someone who is now avoiding repayment",
      "Borrower has missed repayment deadlines repeatedly",
      "You want to formalize the recovery process legally",
      "You need to establish a paper trail for future legal action"
    ],
    documents: [
      "Loan agreement or promissory note (if available)",
      "Bank transfer receipts or cheque copies showing loan disbursement",
      "Repayment schedule or agreed terms of the loan",
      "Any communications about the loan (WhatsApp, emails, SMS)"
    ],
    deliverables: [
      "Legal notice demanding loan repayment with interest calculations",
      "Professional service with delivery acknowledgment",
      "Interest calculation based on agreed or market rates",
      "Legal strategy document for court proceedings if needed"
    ],
    process: [
      {
        icon: "🔍",
        title: "Loan Assessment",
        text: "We review loan documents and repayment terms"
      },
      {
        icon: "📝",
        title: "Notice Drafting", 
        text: "Compelling legal notice with interest calculations"
      },
      {
        icon: "📬",
        title: "Service & Tracking",
        text: "Professional delivery with acknowledgment proof"
      },
      {
        icon: "💰",
        title: "Recovery Support",
        text: "Negotiation support and legal guidance for settlement"
      }
    ],
    timeline: [
      { label: "Loan Evaluation", value: "2-4 hours" },
      { label: "Notice Preparation", value: "24-48 hours" },
      { label: "Delivery", value: "1-2 days" },
      { label: "Settlement Window", value: "15-45 days" }
    ],
    notes: [
      "Even informal loans without written agreements can be legally recovered.",
      "Interest can be claimed based on banking rates even without explicit agreement.",
      "Quick legal action prevents borrowers from disposing of assets."
    ]
  },

  "dishonoured-cheque": {
    heroTitle: "Cheque Bounce Legal Action",
    heroSubtitle: "Swift action under Section 138 NI Act for dishonoured cheques",
    leadContent: "Cheque bounce is a serious criminal offense under Section 138 of the Negotiable Instruments Act, punishable by up to 2 years imprisonment or fine up to twice the cheque amount. Our specialized legal notice service for dishonoured cheques has helped recover thousands of crores with a success rate of over 85%. When a cheque bounces due to insufficient funds, stopped payment, or closed account, you have powerful legal remedies that most people don't utilize effectively. We ensure strict compliance with Section 138 timelines - the legal notice must be sent within 30 days of receiving the bank return memo, giving the drawer 15 days to pay before criminal proceedings can be initiated. Our expert lawyers draft notices that create maximum pressure while preserving all your legal rights for future prosecution. The criminal nature of cheque bounce makes our legal notices extremely effective - most drawers pay immediately to avoid criminal cases that could affect their reputation, employment, and future financial dealings. We handle all types of dishonoured cheques including post-dated cheques, security cheques, loan repayment cheques, and business transaction cheques. Don't let cheque defaulters escape - the law provides you powerful remedies that can result in both money recovery and criminal prosecution of dishonest drawers.",
    benefits: [
      "✓ Criminal remedy under Section 138 NI Act",
      "✓ Up to 2 years imprisonment for defaulters",
      "✓ Recovery of double the cheque amount as fine",
      "✓ 85% success rate in cheque recovery"
    ],
    who: [
      "Your cheque was returned unpaid by the bank",
      "You received bank return memo within the last 30 days", 
      "You want to initiate criminal action under Section 138",
      "You need immediate pressure for cheque clearance"
    ],
    documents: [
      "Original dishonoured cheque and bank return memo",
      "Account statement showing insufficient funds",
      "Invoice or agreement for which cheque was given",
      "Drawer's correct name and address details"
    ],
    deliverables: [
      "Section 138 compliant legal notice with criminal warning",
      "Registered post delivery with acknowledgment receipt",
      "15-day statutory notice period as per law",
      "Criminal complaint draft if payment not received"
    ],
    process: [
      {
        icon: "🏧",
        title: "Cheque Verification",
        text: "We verify bank return memo and timeline compliance"
      },
      {
        icon: "⚖️",
        title: "Legal Notice",
        text: "Section 138 compliant notice with criminal consequences"
      },
      {
        icon: "📮",
        title: "Statutory Service",
        text: "Registered post delivery within 30-day legal window"
      },
      {
        icon: "🚔",
        title: "Criminal Action",
        text: "File criminal complaint if no payment in 15 days"
      }
    ],
    timeline: [
      { label: "Notice Drafting", value: "Same day" },
      { label: "Service", value: "1-2 days" },
      { label: "Legal Response Period", value: "15 days statutory" },
      { label: "Criminal Complaint", value: "Within 30 days thereafter" }
    ],
    notes: [
      "Strict 30-day timeline from return memo receipt must be followed.",
      "Criminal prosecution can run parallel to civil recovery.",
      "Drawer's reputation and employment can be severely affected."
    ]
  }
};

// Function to get topic content with fallback
export function getTopicContent(topicKey: string): TopicContent | null {
  return topicContentMap[topicKey] || null;
}