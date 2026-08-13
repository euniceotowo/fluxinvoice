export interface FormatCurrencyOptions {
  currency?: string;
  locale?: string;
  isKobo?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

function isSupportedCurrency(currency: string): boolean {
  try {
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
    }).format(0);
    return true;
  } catch {
    return false;
  }
}

function parseNumberValue(value: string | number | bigint | null | undefined): number {
  if (value == null || value === "") {
    return NaN;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : NaN;
  }

  if (typeof value === "bigint") {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : NaN;
  }

  const trimmed = String(value).replace(/,/g, "").trim();
  if (trimmed === "") {
    return NaN;
  }

  const numericValue = Number(trimmed);
  return Number.isFinite(numericValue) ? numericValue : NaN;
}

export function formatCurrency(
  amount: string | number | bigint | null | undefined,
  options: FormatCurrencyOptions = {},
): string {
  const currency = options.currency ?? "NGN";
  const locale = options.locale ?? (currency === "NGN" ? "en-NG" : "en-US");
  const isKobo = options.isKobo ?? false;
  const minimumFractionDigits = options.minimumFractionDigits ?? 2;
  const maximumFractionDigits = options.maximumFractionDigits ?? 2;

  const numericValue = parseNumberValue(amount);
  const displayValue = isKobo ? numericValue / 100 : numericValue;
  const normalizedValue = Number.isFinite(displayValue) ? displayValue : 0;

  if (!isSupportedCurrency(currency)) {
    return normalizedValue.toLocaleString(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    }) + ` ${currency}`;
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(normalizedValue);
}

export function formatCurrencyFromKobo(
  amount: string | number | bigint | null | undefined,
  options: Omit<FormatCurrencyOptions, "isKobo"> = {},
): string {
  return formatCurrency(amount, { ...options, isKobo: true });
}

export function formatCompactCurrency(
  amount: string | number | bigint | null | undefined,
  options: FormatCurrencyOptions = {},
): string {
  const currency = (options.currency ?? "NGN").toUpperCase();
  const locale = options.locale ?? (currency === "NGN" ? "en-NG" : "en-US");
  const numericValue = parseNumberValue(amount);
  const normalizedValue = Number.isFinite(numericValue) ? numericValue : 0;

  if (!isSupportedCurrency(currency)) {
    return formatCurrency(amount, options);
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(normalizedValue);
  } catch {
    return formatCurrency(amount, options);
  }
}
