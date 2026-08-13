import { describe, expect, it } from "vitest";
import { formatCompactCurrency, formatCurrency, formatCurrencyFromKobo } from "./formatters";

describe("formatCurrency utility", () => {
  it("formats NGN from kobo using Intl.NumberFormat", () => {
    expect(formatCurrencyFromKobo(150000, { currency: "NGN" })).toBe("₦1,500.00");
    expect(formatCurrencyFromKobo("250000", { currency: "NGN" })).toBe("₦2,500.00");
  });

  it("formats USD with two decimals", () => {
    expect(formatCurrency(1250, { currency: "USD" })).toBe("$1,250.00");
  });

  it("formats custom currency symbols for unknown currencies", () => {
    expect(formatCurrency(1200, { currency: "USDT" })).toBe("1,200.00 USDT");
  });

  it("formats compact currency for large invoice values", () => {
    expect(formatCompactCurrency(1250000, { currency: "USD" })).toBe("$1.3M");
    expect(formatCompactCurrency(1500000, { currency: "NGN" })).toBe("₦1.5M");
  });

  it("returns zero for invalid values", () => {
    expect(formatCurrency(null)).toBe("₦0.00");
    expect(formatCurrencyFromKobo("", { currency: "NGN" })).toBe("₦0.00");
  });

  it("handles non-finite and malformed values gracefully", () => {
    expect(formatCurrency(Infinity)).toBe("₦0.00");
    expect(formatCurrency(NaN)).toBe("₦0.00");
    expect(formatCurrency("not-a-number")).toBe("₦0.00");
    expect(formatCurrency(undefined)).toBe("₦0.00");
  });

  it("strips thousand separators from string inputs", () => {
    expect(formatCurrency("1,250,000", { currency: "USD" })).toBe("$1,250,000.00");
    expect(formatCurrencyFromKobo("1,500,000", { currency: "NGN" })).toBe("₦15,000.00");
  });

  it("formats common ISO currencies with their symbols", () => {
    expect(formatCurrency(2500, { currency: "EUR" })).toBe("€2,500.00");
    expect(formatCurrency(2500, { currency: "GBP" })).toBe("£2,500.00");
    expect(formatCurrency(2500, { currency: "JPY" })).toBe("¥2,500.00");
  });

  it("falls back to plain number formatting for unknown or invalid currencies", () => {
    expect(formatCurrency(1200, { currency: "USDT" })).toBe("1,200.00 USDT");
    expect(formatCurrency(1250000, { currency: "USDT" })).toBe("1,250,000.00 USDT");
    expect(formatCompactCurrency(1250000, { currency: "INVALID" })).toBe("1,250,000.00 INVALID");
  });

  it("supports custom fraction digits", () => {
    expect(formatCurrency(1250.5, { currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })).toBe("$1,251");
    expect(formatCurrency(1250.55, { currency: "USD", minimumFractionDigits: 1, maximumFractionDigits: 1 })).toBe("$1,250.6");
  });

  it("handles large bigint amounts", () => {
    expect(formatCurrency(250000n, { currency: "NGN" })).toBe("₦250,000.00");
    expect(formatCompactCurrency(1250000n, { currency: "USD" })).toBe("$1.3M");
  });
});
