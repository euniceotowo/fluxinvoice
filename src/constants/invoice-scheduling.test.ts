import { describe, expect, it } from "vitest";
import {
  getIssueInvoiceOptions,
  issueInvoiceOnOptions,
  issueInvoiceOnSchema,
  periodIssueInvoiceOptions,
  validateIssueInvoiceOn,
  weekdayIssueInvoiceOptions,
} from "./invoice-scheduling";

describe("getIssueInvoiceOptions", () => {
  it("returns weekdays for weekly and bi-weekly frequencies", () => {
    expect(getIssueInvoiceOptions("Weekly")).toEqual(weekdayIssueInvoiceOptions);
    expect(getIssueInvoiceOptions("Bi-weekly")).toEqual(
      weekdayIssueInvoiceOptions,
    );
  });

  it("returns period options for monthly-style frequencies", () => {
    for (const frequency of ["Monthly", "Quarterly", "Annually"]) {
      expect(getIssueInvoiceOptions(frequency)).toEqual(
        periodIssueInvoiceOptions,
      );
    }
  });

  it("defaults to period options when frequency is empty or unknown", () => {
    expect(getIssueInvoiceOptions("")).toEqual(periodIssueInvoiceOptions);
    expect(getIssueInvoiceOptions("Per deliverable")).toEqual(
      periodIssueInvoiceOptions,
    );
  });
});

describe("issueInvoiceOnSchema", () => {
  it("accepts every supported option", () => {
    for (const value of issueInvoiceOnOptions) {
      expect(issueInvoiceOnSchema.safeParse(value).success).toBe(true);
    }
  });

  it("rejects empty and unknown values", () => {
    expect(issueInvoiceOnSchema.safeParse("").success).toBe(false);
    expect(issueInvoiceOnSchema.safeParse("Wednesday-afternoon").success).toBe(
      false,
    );
  });
});

describe("validateIssueInvoiceOn", () => {
  it("requires a selection", () => {
    expect(validateIssueInvoiceOn("Monthly", "")).toBe(
      "Issue invoice on is required",
    );
  });

  it("requires the value to match the invoice frequency", () => {
    expect(validateIssueInvoiceOn("Weekly", "1st of the month")).toBe(
      "Issue invoice on must match the selected invoice frequency",
    );
    expect(validateIssueInvoiceOn("Monthly", "Monday")).toBe(
      "Issue invoice on must match the selected invoice frequency",
    );
  });

  it("accepts valid combinations", () => {
    expect(validateIssueInvoiceOn("Weekly", "Monday")).toBeNull();
    expect(validateIssueInvoiceOn("Bi-weekly", "Friday")).toBeNull();
    expect(validateIssueInvoiceOn("Monthly", "1st of the month")).toBeNull();
    expect(validateIssueInvoiceOn("Quarterly", "Last day of the month")).toBeNull();
  });

  it("rejects values that are not valid invoice schedules", () => {
    expect(validateIssueInvoiceOn("Monthly", "Next month")).not.toBeNull();
  });
});