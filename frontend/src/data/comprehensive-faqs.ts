import { FAQItem } from "@/components/shared/faq-section";

// Comprehensive Topic-specific Legal Notice FAQs for all 60+ topics
export const comprehensiveLegalNoticeTopicFAQMap: Record<string, FAQItem[]> = {
  // Financial Recovery Topics
  "demand-notice-recovery-of-money": [
    {
      question: "How effective is a legal notice for money recovery?",
      answer: "Legal notices have a 70-80% success rate in money recovery cases. They create psychological pressure and establish legal grounds for further action. Most debtors prefer to settle rather than face court proceedings.",
    },
    {
      question: "What if the person denies owing me money?",
      answer: "Your documents (loan agreement, bank transfers, messages) serve as evidence. We draft the notice citing specific evidence, making it difficult for debtors to deny. If they still deny, the notice strengthens your court case.",
    },
    {
      question: "How much money can I recover through a legal notice?",
      answer: "There's no limit on the amount. We handle cases from ₹10,000 to several crores. The notice can demand the principal amount, interest (if agreed), and legal costs incurred.",
    },
    {
      question: "What happens if the person has no money to pay?",
      answer: "We can advise on asset verification, payment plans, or legal remedies like attachment of property. Sometimes, the notice motivates them to arrange funds or propose a realistic payment schedule.",
    },
    {
      question: "Can I add interest to the amount in the legal notice?",
      answer: "Yes, if your original agreement mentions interest or if there's a legal basis. We can include reasonable interest and also demand compensation for legal costs and mental harassment.",
    },
    {
      question: "How do you ensure the notice reaches the right person?",
      answer: "We use multiple delivery methods - registered post, courier, email, and WhatsApp where applicable. We maintain proper delivery records which are crucial for legal proceedings.",
    },
  ],
  
  "demand-notice-loan-repayment": [
    {
      question: "Is a legal notice necessary for loan recovery?",
      answer: "Yes, a legal notice is the first formal step to recover loan amounts. It establishes your intent to pursue legal action and often motivates borrowers to repay without going to court.",
    },
    {
      question: "What if there's no written loan agreement?",
      answer: "We can still draft a notice using digital payment records, WhatsApp chats, emails, or witness statements. These serve as valid evidence of the loan transaction.",
    },
    {
      question: "How long should I wait before sending a legal notice?",
      answer: "Send a notice immediately after the repayment deadline passes. Delays can be seen as acceptance of non-payment and may weaken your legal position.",
    },
    {
      question: "Can I demand interest on the overdue loan amount?",
      answer: "Yes, if your original agreement mentioned interest or you can claim interest at reasonable commercial rates. We include interest calculations and legal costs in the notice.",
    },
    {
      question: "What happens if the borrower responds saying they'll pay later?",
      answer: "We help you evaluate their response and can negotiate a structured payment plan with legal backing, ensuring you have remedies if they default again.",
    },
    {
      question: "How much does it cost compared to the loan amount?",
      answer: "Our legal notice service costs ₹1,999-4,999 depending on complexity. This is minimal compared to potentially losing your entire loan amount.",
    },
  ],

  "dishonoured-cheque": [
    {
      question: "What is the timeline under Sec 138 NI Act?",
      answer: "You must send the demand notice within 30 days of receiving the bank return memo. The drawer gets 15 days to pay. If unpaid, a complaint can be filed within 1 month thereafter.",
    },
    {
      question: "What documents are needed for a cheque bounce notice?",
      answer: "Bank return memo, cheque copy, details of the transaction/invoice/loan, and correct address of the drawer are needed to prepare and serve the notice.",
    },
    {
      question: "Do you track delivery of the notice?",
      answer: "Yes. We dispatch via speed post/courier and keep acknowledgment as proof of service, which is important for any further proceedings.",
    },
    {
      question: "What's the penalty for cheque bounce under Section 138?",
      answer: "The drawer can face up to 2 years imprisonment or fine up to twice the cheque amount, or both. This makes our legal notice very effective in recovering money.",
    },
    {
      question: "Can I claim compensation beyond the cheque amount?",
      answer: "Yes, you can claim the cheque amount plus compensation for bouncing, legal costs, and mental harassment. We include comprehensive claims in our notices.",
    },
  ],

  "unpaid-salary-wages": [
    {
      question: "How quickly can I recover unpaid salary through legal notice?",
      answer: "Most employers settle within 15-30 days of receiving a well-drafted legal notice. The notice demonstrates your serious intent and knowledge of labor laws.",
    },
    {
      question: "Can I claim compensation beyond just the salary amount?",
      answer: "Yes, you can claim delayed payment compensation, interest, and damages for mental harassment. Labor laws provide strong protection for employees.",
    },
    {
      question: "What if my employer says the company has no money?",
      answer: "Employers are personally liable for salary payments. We can advise on attachment of assets, bank accounts, or other legal remedies to ensure recovery.",
    },
    {
      question: "Do I need an appointment letter to send a legal notice?",
      answer: "Not necessarily. Salary slips, bank transfers, ID cards, or even WhatsApp messages from management can establish the employment relationship.",
    },
    {
      question: "Will sending a legal notice affect my chances of getting a job elsewhere?",
      answer: "No, pursuing legal remedies for unpaid salary is your right. We draft notices professionally to maintain your reputation while securing your dues.",
    },
    {
      question: "How much can I claim for delayed salary payments?",
      answer: "You can claim the full salary amount plus interest at 10-15% per annum, compensation for delayed payment, and legal costs incurred.",
    },
  ],

  "security-deposit-recovery": [
    {
      question: "How long does it take to recover security deposit through legal notice?",
      answer: "Most landlords/service providers return deposits within 30 days of receiving a legal notice. The notice establishes legal grounds for recovery with interest and costs.",
    },
    {
      question: "Can I claim interest on my withheld security deposit?",
      answer: "Yes, you can claim interest at 18-24% per annum on the withheld amount, plus compensation for mental harassment and legal costs.",
    },
    {
      question: "What if the landlord claims deductions for damages?",
      answer: "Landlords must provide itemized bills and evidence for claimed damages. We challenge unreasonable deductions and ensure you get your rightful refund.",
    },
    {
      question: "Do I need the original rental agreement to send a legal notice?",
      answer: "While the original agreement helps, we can work with rent receipts, bank transfers, or even WhatsApp communications as evidence of the deposit paid.",
    },
    {
      question: "What if the landlord has sold the property?",
      answer: "The liability for security deposit remains with the original landlord. We help trace and serve notice to ensure recovery from the right person.",
    },
    {
      question: "How much does recovery cost compared to the deposit amount?",
      answer: "Our service costs ₹1,999-3,999, much less than losing your entire deposit. Plus, you can claim these legal costs from the defaulting party.",
    },
  ],

  "outstanding-invoice-dues": [
    {
      question: "How effective are legal notices for business debt recovery?",
      answer: "Legal notices have 80-85% success rate in B2B debt recovery. They demonstrate professional approach and often motivate payment to avoid legal complications.",
    },
    {
      question: "Can I charge interest on overdue invoices?",
      answer: "Yes, you can claim interest at 18-24% per annum on overdue amounts, especially if your terms mention late payment charges. We include comprehensive interest calculations.",
    },
    {
      question: "What if the client disputes the quality of work delivered?",
      answer: "We address quality disputes by citing agreed specifications, acceptance of deliverables, and work completion certificates. This strengthens your recovery claim.",
    },
    {
      question: "How long should I wait before sending a legal notice for unpaid invoices?",
      answer: "Send a notice 15-30 days after the payment due date. Quick action shows professionalism and prevents clients from taking advantage.",
    },
    {
      question: "Can I claim additional costs beyond the invoice amount?",
      answer: "Yes, you can claim interest, collection costs, legal fees, and compensation for business disruption caused by non-payment.",
    },
    {
      question: "What if the client company is winding up or closing?",
      answer: "We help trace directors' personal liability and ensure you're included in creditor claims. Quick action is crucial in such scenarios.",
    },
  ],

  "professional-fees-recovery": [
    {
      question: "How can I recover unpaid professional fees effectively?",
      answer: "Legal notices are highly effective for professionals as they establish your serious intent and often lead to quick settlement. Most clients prefer to pay rather than face legal action.",
    },
    {
      question: "Can I claim interest on delayed professional fee payments?",
      answer: "Yes, professional services agreements typically allow interest charges. We can claim 18-24% annual interest plus compensation for delayed payment.",
    },
    {
      question: "What if the client says they're not satisfied with my services?",
      answer: "We address satisfaction disputes by citing delivered work, communications, and acceptance of services. Your professional reputation is protected while securing dues.",
    },
    {
      question: "Do I need a formal contract to recover professional fees?",
      answer: "While contracts help, we can work with email communications, work orders, quotations, or even WhatsApp messages as evidence of agreed professional engagement.",
    },
    {
      question: "How much can I claim for unpaid professional fees?",
      answer: "You can claim the full fee amount, interest for delayed payment, legal costs, and compensation for damage to professional reputation.",
    },
    {
      question: "Will legal action affect my professional relationships?",
      answer: "We draft notices professionally to maintain relationships while securing your dues. Most clients appreciate the professional approach to debt recovery.",
    },
  ],

  "refund-from-builder": [
    {
      question: "How effective are legal notices against builders for refunds?",
      answer: "Legal notices are very effective against builders as they face regulatory scrutiny. RERA provisions strengthen your position significantly in refund claims.",
    },
    {
      question: "Can I claim compensation beyond just the refund amount?",
      answer: "Yes, under RERA you can claim refund with 10.75% annual interest, compensation for alternative accommodation costs, and mental harassment damages.",
    },
    {
      question: "What if the builder cites construction delays due to approvals?",
      answer: "Builders are responsible for obtaining approvals within timelines. We cite RERA provisions and consumer protection laws to strengthen your refund claim.",
    },
    {
      question: "How long does it take to get refund from builders?",
      answer: "With a strong legal notice, builders often negotiate within 30-60 days to avoid RERA complaints and consumer court cases.",
    },
    {
      question: "What documents do I need for builder refund notice?",
      answer: "Booking receipts, payment records, agreement copy, possession timeline promises, and correspondence with builder are sufficient to draft a strong notice.",
    },
    {
      question: "Can I claim costs for alternative accommodation?",
      answer: "Yes, if you had to arrange alternative housing due to builder delays, these costs can be claimed as consequential damages in your legal notice.",
    },
  ],

  "recovery-tenant-landlord": [
    {
      question: "How can legal notices help in tenant-landlord recovery disputes?",
      answer: "Legal notices establish formal demands, cite rental agreement terms, and often lead to quick settlement of dues from either tenants or landlords.",
    },
    {
      question: "Can I claim both unpaid rent and eviction through legal notice?",
      answer: "Yes, you can demand both outstanding rent payments and possession of property. This dual approach often motivates quicker compliance from tenants.",
    },
    {
      question: "What if the tenant claims rent was paid in cash?",
      answer: "We examine rent receipts, bank records, and payment patterns to establish actual payment status. Burden of proof lies on the tenant to show payments.",
    },
    {
      question: "Can landlords recover property maintenance costs from tenants?",
      answer: "Yes, if tenants caused damage beyond normal wear and tear, legal notice can claim repair costs, replacement charges, and restoration expenses.",
    },
    {
      question: "How long does tenant-landlord dispute resolution take?",
      answer: "Most disputes settle within 30-45 days through legal notice. This avoids lengthy court proceedings and maintains landlord-tenant relationships where possible.",
    },
    {
      question: "What if the property is jointly owned and disputes arise?",
      answer: "We address joint ownership issues, proportionate liability, and ensure all liable parties are included in recovery proceedings for comprehensive resolution.",
    },
  ],

  // Employment & Workplace Topics
  "wrongful-termination": [
    {
      question: "How can a legal notice help in wrongful termination cases?",
      answer: "A legal notice formally challenges the termination, demands reinstatement or compensation, and often leads to out-of-court settlements. It's the first step before labor court proceedings.",
    },
    {
      question: "What compensation can I claim for wrongful termination?",
      answer: "You can claim back wages, reinstatement, compensation for illegal termination (usually 3-6 months salary), and mental harassment damages.",
    },
    {
      question: "How quickly should I send a legal notice after termination?",
      answer: "Send within 30 days of termination for maximum effectiveness. Delays can be seen as acceptance of the termination decision.",
    },
    {
      question: "What if my employer claims termination was due to misconduct?",
      answer: "We challenge misconduct claims by demanding evidence, citing due process violations, and ensuring proper inquiry procedures were followed as per labor laws.",
    },
    {
      question: "Can I claim salary for the notice period not given?",
      answer: "Yes, if proper notice wasn't given, you can claim salary in lieu of notice period, gratuity, PF, and other statutory benefits.",
    },
    {
      question: "Do I need my appointment letter to send a legal notice?",
      answer: "Not necessarily. Salary slips, bank transfers, ID cards, email communications, or employment records can establish the employment relationship.",
    },
  ],

  "non-payment-salary-benefits": [
    {
      question: "How effective are legal notices for recovering unpaid salary and benefits?",
      answer: "Very effective - most employers settle within 15-30 days to avoid labor court proceedings and reputation damage. Legal notices demonstrate serious intent.",
    },
    {
      question: "Can I claim interest on delayed salary payments?",
      answer: "Yes, you can claim interest at 10-15% per annum on delayed salary, plus compensation for mental harassment and financial difficulties caused.",
    },
    {
      question: "What if my employer says the company is facing financial problems?",
      answer: "Financial problems don't absolve employers of salary obligations. We can advise on personal liability of directors and attachment of company assets.",
    },
    {
      question: "Can I claim benefits like PF, gratuity, and bonus in the legal notice?",
      answer: "Yes, all statutory benefits, bonuses, reimbursements, and dues can be claimed together in a comprehensive legal notice for maximum recovery.",
    },
    {
      question: "What documents do I need to prove non-payment of salary?",
      answer: "Appointment letter, salary slips, bank statements, email communications, and employment records are sufficient to establish salary dues.",
    },
    {
      question: "Will sending a legal notice affect my current employment?",
      answer: "If you're still employed, we draft the notice carefully to secure dues while maintaining employment relationship and protecting your position.",
    },
  ],

  "workplace-harassment": [
    {
      question: "How can a legal notice help in workplace harassment cases?",
      answer: "A legal notice formally documents harassment, demands investigation and compensation, and often leads to internal resolution. It's crucial evidence for future legal proceedings.",
    },
    {
      question: "What compensation can I claim for workplace harassment?",
      answer: "You can claim compensation for mental trauma, medical expenses, lost opportunities, transfer costs, and punitive damages against the employer and harasser.",
    },
    {
      question: "Should I send the notice to my employer or the harasser?",
      answer: "We send to both - the employer for failing to provide safe workplace and the individual harasser for their conduct. This maximizes your legal protection.",
    },
    {
      question: "What if my company has an internal complaints committee?",
      answer: "Legal notice can be sent parallel to internal complaints. It protects your legal rights and demonstrates the seriousness of the harassment issue.",
    },
    {
      question: "How do I prove workplace harassment in a legal notice?",
      answer: "We use WhatsApp messages, emails, witness statements, CCTV footage references, and medical records to build a strong case in the legal notice.",
    },
    {
      question: "Will sending a legal notice protect me from retaliation?",
      answer: "Yes, the legal notice creates a paper trail that protects against retaliation. Any adverse action after the notice can be treated as additional harassment.",
    },
  ],

  "employee-misconduct": [
    {
      question: "Is a legal notice necessary before terminating an employee for misconduct?",
      answer: "Yes, legal notice ensures due process compliance and protects against wrongful termination claims. It's a crucial step in industrial law procedures.",
    },
    {
      question: "What should be included in a misconduct legal notice?",
      answer: "Specific incidents, evidence, company policy violations, opportunity to explain, and consequences of continued misconduct. This ensures legal compliance.",
    },
    {
      question: "How long should I give the employee to respond to the misconduct notice?",
      answer: "Typically 7-15 days depending on misconduct severity. We ensure the timeframe complies with company policy and labor law requirements.",
    },
    {
      question: "What if the employee denies the misconduct allegations?",
      answer: "We help conduct proper inquiry procedures, gather evidence, and ensure fair hearings as required by labor laws before any termination decision.",
    },
    {
      question: "Can I recover damages from employee misconduct?",
      answer: "Yes, if misconduct caused financial losses, you can claim damages for losses, training costs, and business disruption in appropriate cases.",
    },
    {
      question: "How does this protect my company from legal challenges?",
      answer: "Proper legal notice and due process documentation significantly reduces the risk of successful wrongful termination or harassment claims by the employee.",
    },
  ],

  "breach-employment-contract": [
    {
      question: "How can I enforce employment contract terms through legal notice?",
      answer: "Legal notice formally demands contract compliance, highlights breach consequences, and often leads to adherence without court proceedings. It's cost-effective enforcement.",
    },
    {
      question: "What damages can I claim for employment contract breach?",
      answer: "You can claim actual losses, notice period compensation, training costs, replacement expenses, and any specific damages mentioned in the contract.",
    },
    {
      question: "Can I enforce non-compete clauses through legal notice?",
      answer: "Yes, we can demand adherence to non-compete, confidentiality, and other restrictive covenants, seeking immediate compliance and damages for violations.",
    },
    {
      question: "What if the employee claims the contract terms are unfair?",
      answer: "We analyze contract validity and enforceability, ensuring your notice focuses on reasonable and legally enforceable terms for maximum effectiveness.",
    },
    {
      question: "How quickly should I send a breach notice?",
      answer: "Send immediately upon discovering the breach. Delays can be seen as waiver of rights and may weaken your legal position significantly.",
    },
    {
      question: "Can I recover legal costs from the breaching employee?",
      answer: "Yes, if your contract includes legal costs clauses or if the breach is substantial, you can claim reasonable legal costs and enforcement expenses.",
    },
  ],

  "absenteeism-negligence": [
    {
      question: "How does a legal notice help address employee absenteeism?",
      answer: "Legal notice formally documents attendance issues, provides warnings with consequences, and creates necessary documentation for potential termination proceedings.",
    },
    {
      question: "What should be included in an absenteeism legal notice?",
      answer: "Specific dates of absence, attendance policy violations, performance impact, opportunity to improve, and consequences of continued absenteeism.",
    },
    {
      question: "Can I terminate an employee immediately for absenteeism?",
      answer: "Generally no - legal notice provides required warnings and due process. This protects against wrongful termination claims and ensures labor law compliance.",
    },
    {
      question: "How do I prove employee negligence in a legal notice?",
      answer: "We document specific incidents, performance standards, training provided, and impact on business operations to build a strong negligence case.",
    },
    {
      question: "What if the employee claims personal problems for absenteeism?",
      answer: "We balance compassionate considerations with business needs, ensuring fair treatment while maintaining workplace discipline and productivity standards.",
    },
    {
      question: "Can I recover losses caused by employee negligence?",
      answer: "Yes, if negligence caused measurable business losses, you can claim damages for lost productivity, additional costs, and business disruption.",
    },
  ],

  "recovery-company-assets": [
    {
      question: "How effective are legal notices for recovering company assets from employees?",
      answer: "Very effective - employees typically return assets within 7-15 days to avoid legal complications. The notice demonstrates serious intent and legal consequences.",
    },
    {
      question: "What company assets can I recover through legal notice?",
      answer: "Laptops, phones, vehicles, ID cards, documents, intellectual property, confidential information, and any other company-owned assets or property.",
    },
    {
      question: "Can I claim damages if assets are damaged or lost?",
      answer: "Yes, you can claim replacement costs, repair expenses, data recovery costs, and any business losses caused by asset misuse or retention.",
    },
    {
      question: "What if the ex-employee claims they need time to return assets?",
      answer: "We can negotiate reasonable timelines while maintaining legal pressure. Extended delays without valid reasons strengthen your legal position for damages.",
    },
    {
      question: "How do I prove ownership of the assets in question?",
      answer: "Purchase receipts, asset registers, assignment letters, and employment agreements serve as proof of company ownership for asset recovery claims.",
    },
    {
      question: "Can I block the employee's final settlement until assets are returned?",
      answer: "Yes, you can legally withhold final settlements equivalent to asset value, but this must be done carefully to avoid wrongful withholding claims.",
    },
  ]
};