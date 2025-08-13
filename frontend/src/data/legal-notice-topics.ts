export interface LegalNoticeTopic {
  id: string;
  title: string;
  synonyms?: string[];
  description: string;
}

export const legalNoticeTopics: LegalNoticeTopic[] = [
  {
    id: "demand-notice-recovery-of-money",
    title: "Demand Notice for Recovery of Money",
    description:
      "Draft and send a formal demand notice to recover pending amounts with legal backing.",
  },
  {
    id: "demand-notice-loan-repayment",
    title: "Demand Notice for Loan Repayment",
    description:
      "Issue a legal demand for repayment of a personal or business loan.",
  },
  {
    id: "dishonoured-cheque",
    title: "Notice for Dishonoured Cheque",
    synonyms: ["cheque bounce", "sec 138 ni act"],
    description:
      "Initiate action for cheque bounce under Section 138 of the NI Act.",
  },
  {
    id: "unpaid-salary-wages",
    title: "Notice for Recovery of Unpaid Salary",
    description:
      "Recover unpaid salary, wages, or dues from employer with a formal notice.",
  },
  {
    id: "security-deposit-recovery",
    title: "Notice for Recovery of Security Deposit",
    description:
      "Seek refund of withheld security deposit from landlord or service provider.",
  },
  {
    id: "outstanding-invoice-dues",
    title: "Notice for Recovery of Outstanding Invoice/Business Dues",
    description:
      "Recover unpaid invoices and business dues from clients or vendors.",
  },
  {
    id: "professional-fees-recovery",
    title: "Notice for Recovery of Professional Fees",
    description: "Demand payment of outstanding professional fees.",
  },
  {
    id: "refund-from-builder",
    title: "Notice for Refund from Builder/Developer",
    description:
      "Seek refund for project delays or deficiencies from the builder/developer.",
  },
  {
    id: "recovery-tenant-landlord",
    title: "Notice for Recovery from Tenant/Landlord",
    description:
      "Recover unpaid rent or dues from tenant/landlord with a legal notice.",
  },
  {
    id: "wrongful-termination",
    title: "Notice to Employer for Wrongful Termination",
    description: "Challenge unlawful dismissal with a notice to your employer.",
  },
  {
    id: "non-payment-salary-benefits",
    title: "Notice to Employer for Non-payment of Salary or Benefits",
    description: "Demand unpaid salary, benefits, or reimbursements.",
  },
  {
    id: "workplace-harassment",
    title: "Notice to Employer for Workplace Harassment",
    description: "Report and demand redressal for workplace harassment.",
  },
  {
    id: "employee-misconduct",
    title: "Notice to Employee for Misconduct",
    description: "Send a disciplinary notice to employee for misconduct.",
  },
  {
    id: "breach-employment-contract",
    title: "Notice to Employee for Breach of Employment Contract",
    description: "Formally notify breach of employment contract terms.",
  },
  {
    id: "absenteeism-negligence",
    title: "Notice to Employee for Absenteeism/Negligence",
    description: "Address absenteeism or negligence through a formal notice.",
  },
  {
    id: "recovery-company-assets",
    title: "Notice for Recovery of Company Assets from Employee",
    description:
      "Recover company property, devices or assets from ex-employee.",
  },
  {
    id: "property-partition",
    title: "Legal Notice for Property Partition",
    description:
      "Initiate property partition with a legal notice to co-owners.",
  },
  {
    id: "tenant-eviction",
    title: "Legal Notice for Eviction of Tenant",
    description: "Begin tenant eviction process with due legal notice.",
  },
  {
    id: "tenant-non-payment",
    title: "Legal Notice to Tenant for Non-payment of Rent",
    description: "Demand unpaid rent from tenant through a legal notice.",
  },
  {
    id: "tenant-property-damage",
    title: "Legal Notice to Tenant for Property Damage",
    description: "Seek compensation for property damage from tenant.",
  },
  {
    id: "landlord-repairs",
    title: "Legal Notice to Landlord for Repairs/Maintenance",
    description: "Request repairs or maintenance from landlord legally.",
  },
  {
    id: "possession-of-property",
    title: "Legal Notice for Possession of Property",
    description: "Claim possession of property via legal notice.",
  },
  {
    id: "encroachment-trespassing",
    title: "Legal Notice for Encroachment or Trespassing",
    description: "Stop encroachment or trespassing through a formal notice.",
  },
  {
    id: "specific-performance",
    title: "Legal Notice for Specific Performance of Property Agreement",
    description: "Enforce property agreement obligations.",
  },
  {
    id: "stop-illegal-construction",
    title: "Legal Notice to Stop Illegal Construction",
    description: "Issue a notice to halt unauthorized construction.",
  },
  {
    id: "amenities-society-builder",
    title: "Legal Notice to Society/Builder for Amenities",
    description: "Demand agreed amenities from society or builder.",
  },
  {
    id: "divorce",
    title: "Legal Notice for Divorce",
    synonyms: ["matrimonial", "family law"],
    description: "Send a legal notice prior to divorce proceedings.",
  },
  {
    id: "restitution-conjugal-rights",
    title: "Legal Notice for Restitution of Conjugal Rights",
    description: "Seek restoration of marital cohabitation.",
  },
  {
    id: "child-custody",
    title: "Legal Notice for Child Custody/Visitation Rights",
    description: "Claim child custody or visitation rights formally.",
  },
  {
    id: "domestic-violence",
    title: "Legal Notice for Domestic Violence",
    description: "Initiate action against domestic violence.",
  },
  {
    id: "maintenance-alimony",
    title: "Legal Notice for Maintenance/Alimony",
    description: "Claim maintenance or alimony through a legal notice.",
  },
  {
    id: "annulment-of-marriage",
    title: "Legal Notice for Annulment of Marriage",
    description: "Start annulment process with a legal notice.",
  },
  {
    id: "defamation",
    title: "Legal Notice for Defamation",
    description: "Demand retraction or damages for defamation.",
  },
  {
    id: "harassment-threats",
    title: "Legal Notice for Harassment/Threats",
    description: "Address harassment or threats legally.",
  },
  {
    id: "breach-of-contract",
    title: "Legal Notice for Breach of Contract",
    description: "Notify breach and demand performance or damages.",
  },
  {
    id: "termination-of-contract",
    title: "Legal Notice for Termination of Contract",
    description: "Terminate contract formally citing reasons.",
  },
  {
    id: "non-performance-of-contract",
    title: "Legal Notice for Non-performance of Contract",
    description: "Demand performance of contractual obligations.",
  },
  {
    id: "recovery-of-advance-payment",
    title: "Legal Notice for Recovery of Advance Payment",
    description: "Recover advance payments made.",
  },
  {
    id: "violation-of-nda",
    title: "Legal Notice for Violation of Non-Disclosure Agreement (NDA)",
    description: "Address NDA violations formally.",
  },
  {
    id: "recovery-supply-of-goods",
    title: "Legal Notice for Recovery in Supply of Goods/Services",
    description: "Recover dues in goods/services transactions.",
  },
  {
    id: "franchise-disputes",
    title: "Legal Notice for Franchise Disputes",
    description: "Handle franchise-related disputes legally.",
  },
  {
    id: "agency-distribution-disputes",
    title: "Legal Notice for Agency/Distribution Agreement Disputes",
    description: "Resolve agency/distribution disputes.",
  },
  {
    id: "builder-delay-possession",
    title: "Legal Notice to Builder for Delay in Possession",
    description: "Claim compensation for delayed possession.",
  },
  {
    id: "deficiency-in-service",
    title: "Legal Notice for Deficiency in Service",
    description: "Demand remedy for poor service.",
  },
  {
    id: "faulty-defective-product",
    title: "Legal Notice for Faulty/Defective Product",
    description: "Seek replacement or refund for defective product.",
  },
  {
    id: "insurance-claim-disputes",
    title: "Legal Notice for Insurance Claim Disputes",
    description: "Dispute insurance claim denials or delays.",
  },
  {
    id: "bank-loan-settlement",
    title: "Legal Notice for Bank Disputes/Loan Settlement",
    description: "Handle bank disputes and settlements.",
  },
  {
    id: "airlines-travel-disputes",
    title: "Legal Notice to Airlines/Travel Companies",
    description: "Address disputes with airlines or travel companies.",
  },
  {
    id: "telecom-internet-disputes",
    title: "Legal Notice for Telecom/Internet Service Disputes",
    description: "Resolve telecom/internet disputes legally.",
  },
  {
    id: "cheque-bounce-sec-138",
    title: "Legal Notice for Cheque Bounce (Sec 138 NI Act)",
    description: "Send a notice for cheque bounce under Sec 138 NI Act.",
  },
  {
    id: "criminal-defamation",
    title: "Legal Notice for Criminal Defamation (Sec 499 IPC / Sec 356 BNS)",
    description: "Proceed against criminal defamation.",
  },
  {
    id: "criminal-intimidation",
    title: "Legal Notice for Criminal Intimidation (Sec 506 IPC / Sec 351 BNS)",
    description: "Address threats and intimidation.",
  },
  {
    id: "recovery-of-stolen-property",
    title: "Legal Notice for Recovery of Stolen Property",
    description: "Recover stolen property through legal channels.",
  },
  {
    id: "copyright-trademark",
    title: "Legal Notice for Copyright/Trademark Infringement",
    description: "Protect IP rights through legal notice.",
  },
  {
    id: "patent-infringement",
    title: "Legal Notice for Patent Infringement",
    description: "Address patent infringement issues.",
  },
  {
    id: "data-privacy-breach",
    title: "Legal Notice for Data Privacy Breach",
    description: "Respond to data privacy breaches.",
  },
  {
    id: "cyber-defamation",
    title: "Legal Notice for Cyber Defamation or Online Harassment",
    description: "Take action for defamation/harassment online.",
  },
  {
    id: "environmental-violations",
    title: "Legal Notice for Environmental Law Violations",
    description: "Address environmental violations.",
  },
  {
    id: "arbitration-clause",
    title: "Legal Notice under Arbitration Clause",
    description: "Invoke arbitration through a legal notice.",
  },
  {
    id: "notice-to-government",
    title: "Legal Notice to Government Departments/Public Authorities",
    description: "Serve notice to government/public authorities.",
  },
];

export function getTopicById(id: string): LegalNoticeTopic | undefined {
  return legalNoticeTopics.find((t) => t.id === id);
}
