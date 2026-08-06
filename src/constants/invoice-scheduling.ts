import { z } from "zod";

export const invoiceFrequencies = [
  "Weekly",
  "Bi-weekly",
  "Monthly",
  "Quarterly",
  "Annually",
] as const;

export const weekdayIssueInvoiceOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const periodIssueInvoiceOptions = [
  "1st of the month",
  "15th of the month",
  "Last day of the month",
  "Start of contract period",
  "End of contract period",
] as const;

export const issueInvoiceOnOptions = [
  ...weekdayIssueInvoiceOptions,
  ...periodIssueInvoiceOptions,
] as const;

export type IssueInvoiceOn = (typeof issueInvoiceOnOptions)[number];

export function getIssueInvoiceOptions(
  frequency: string,
): readonly string[] {
  if (frequency === "Weekly" || frequency === "Bi-weekly") {
    return weekdayIssueInvoiceOptions;
  }
  return periodIssueInvoiceOptions;
}

export const issueInvoiceOnSchema = z.enum(
  issueInvoiceOnOptions,
  "Select a valid invoice schedule option",
);

/**
 * Returns an error message when the issue-invoice-on value is not valid for
 * the given invoice frequency, or null when it is valid.
 */
export function validateIssueInvoiceOn(
  frequency: string,
  value: string,
): string | null {
  if (!value) return "Issue invoice on is required";
  if (!issueInvoiceOnSchema.safeParse(value).success) {
    return "Select a valid invoice schedule option";
  }
  if (!getIssueInvoiceOptions(frequency).includes(value)) {
    return "Issue invoice on must match the selected invoice frequency";
  }
  return null;
}