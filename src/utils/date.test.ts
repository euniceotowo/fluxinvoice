import { describe, expect, it } from "vitest";
import { formatDate, parseDateInput } from "./date";

describe("parseDateInput utility", () => {
  it("parses ISO date strings", () => {
    expect(formatDate(parseDateInput("2025-10-25"))).toBe("Oct 25, 2025");
  });

  it("parses ordinal dates like the invoice mock data", () => {
    expect(formatDate(parseDateInput("25th Oct 2025"))).toBe("Oct 25, 2025");
    expect(formatDate(parseDateInput("1st March 2025"))).toBe("Mar 01, 2025");
  });

  it("accepts Date objects and rejects invalid ones", () => {
    expect(formatDate(parseDateInput(new Date(2025, 9, 25)))).toBe("Oct 25, 2025");
    expect(parseDateInput(new Date("invalid"))).toBeNull();
  });

  it("returns null for invalid or empty input", () => {
    expect(parseDateInput("not a date")).toBeNull();
    expect(parseDateInput("")).toBeNull();
    expect(parseDateInput(null)).toBeNull();
    expect(parseDateInput(undefined)).toBeNull();
  });
});
