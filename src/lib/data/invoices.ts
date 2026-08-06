/**
 * Mock invoice data fixtures for development, testing, and UI demonstration.
 * Provides realistic sample invoice entries with matching issue dates, billing
 * period titles, distinct amounts, and varied client companies.
 */

export type InvoiceStatus = "Pending" | "Approved" | "Overdue" | "Paid" | "Rejected";

export interface Invoice {
  id: string;              
  invoiceNo: string;     
  title: string;
  amount: number;
  paidIn: string;      
  status: InvoiceStatus;
  issueDate: string;
  name?: string;
  number?: string;
  company?: string;
  [key: string]: string | number | undefined;
}

export const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNo: "#INV-2025-001",
    title: "Software Engineering Retainer - March 2025",
    amount: 3500,
    paidIn: "USDT",
    status: "Pending",
    issueDate: "01 Mar 2025",
    name: "Software Engineering Invoice",
    number: "#INV-2025-001",
    company: "Acme Technologies Inc.",
  },
  {
    id: "2",
    invoiceNo: "#INV-2025-002",
    title: "UI/UX Design Services - Feb 2025",
    amount: 2200,
    paidIn: "USDC",
    status: "Overdue",
    issueDate: "15 Feb 2025",
    name: "UI/UX Design Invoice",
    number: "#INV-2025-002",
    company: "Global Innovations Ltd",
  },
  {
    id: "3",
    invoiceNo: "#INV-2025-003",
    title: "Cloud Infrastructure Audit - Jan 2025",
    amount: 1850,
    paidIn: "USD",
    status: "Paid",
    issueDate: "10 Jan 2025",
    name: "Infrastructure Audit Invoice",
    number: "#INV-2025-003",
    company: "Apex Dynamics Corp",
  },
  {
    id: "4",
    invoiceNo: "#INV-2025-004",
    title: "Full-Stack Development - Q1 2025 Milestone 1",
    amount: 4800,
    paidIn: "USDT",
    status: "Approved",
    issueDate: "20 Mar 2025",
    name: "Development Milestone 1",
    number: "#INV-2025-004",
    company: "VentureScale Labs",
  },
];

