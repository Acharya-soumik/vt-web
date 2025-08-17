export interface Lead {
  id: string;
  name: string;
  location: string;
  whatsapp_number: string;
  service: string;
  service_details?: string;
  payment_choice: "pay-advance" | "submit-only";
  whatsapp_consent: boolean;
  created_at: string;
  updated_at: string;
  payment_status: "pending" | "paid" | "failed";
  payment_amount?: number;
  payment_reference?: string;
  status: "new" | "processing" | "completed";
  notes?: string;
}
