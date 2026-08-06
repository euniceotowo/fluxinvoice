import {
  format,
  formatDistanceToNow,
  isValid,
  parse,
  parseISO,
} from "date-fns";

const ORDINAL_DATE_FORMATS = ["do MMM yyyy", "do MMMM yyyy"];

/**
 * Parse a date string or Date object into a valid Date.
 *
 * Accepts ISO strings (e.g. "2025-10-25") as well as human-readable
 * ordinal dates used in invoice data (e.g. "25th Oct 2025").
 * Returns null when the input cannot be parsed.
 */
export function parseDateInput(
  dateInput: string | Date | null | undefined,
): Date | null {
  if (dateInput == null || dateInput === "") return null;

  if (dateInput instanceof Date) {
    return isValid(dateInput) ? dateInput : null;
  }

  const iso = parseISO(dateInput);
  if (isValid(iso)) return iso;

  for (const pattern of ORDINAL_DATE_FORMATS) {
    const parsed = parse(dateInput, pattern, new Date());
    if (isValid(parsed)) return parsed;
  }

  return null;
}

/**
 * Format a date string or Date object to a consistent human-readable format.
 * Format: "MMM dd, yyyy" (e.g., "Apr 26, 2026")
 */
export function formatDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "";
  
  try {
    const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
    
    if (!isValid(date)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Invalid date provided: ${dateInput}`);
      }
      return "";
    }
    
    return format(date, "MMM dd, yyyy");
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Error formatting date: ${dateInput}`, error);
    }
    return "";
  }
}

/**
 * Format a date string or Date object to include both date and time.
 * Format: "MMM dd, yyyy HH:mm" (e.g., "Apr 26, 2026 14:30")
 */
export function formatDateTime(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "";
  
  try {
    const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
    
    if (!isValid(date)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Invalid date provided: ${dateInput}`);
      }
      return "";
    }
    
    return format(date, "MMM dd, yyyy HH:mm");
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Error formatting date: ${dateInput}`, error);
    }
    return "";
  }
}

/**
 * Format a date range with two dates.
 * Format: "MMM dd, yyyy - MMM dd, yyyy" (e.g., "Apr 20, 2026 - Apr 26, 2026")
 */
export function formatDateRange(
  startDate: string | Date | null | undefined,
  endDate: string | Date | null | undefined
): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  
  if (!start || !end) return "";
  
  return `${start} - ${end}`;
}

/**
 * Format a date relative to now using distance formatting.
 * Format: "2 hours ago", "in 3 days", "just now", etc.
 */
export function formatRelativeDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "";
  
  try {
    const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
    
    if (!isValid(date)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Invalid date provided: ${dateInput}`);
      }
      return "";
    }
    
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Error formatting date: ${dateInput}`, error);
    }
    return "";
  }
}

/**
 * Format a date with a custom format string.
 * Uses date-fns format tokens: https://date-fns.org/docs/format
 */
export function formatDateCustom(
  dateInput: string | Date | null | undefined,
  formatStr: string
): string {
  if (!dateInput) return "";
  
  try {
    const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
    
    if (!isValid(date)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Invalid date provided: ${dateInput}`);
      }
      return "";
    }
    
    return format(date, formatStr);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Error formatting date: ${dateInput}`, error);
    }
    return "";
  }
}

/**
 * Format a date string or Date object in locale-specific format (en-NG for Nigerian locale).
 * Format: "day numeric month short year numeric" (e.g., "26 Apr 2026")
 */
export function formatDateLocale(
  dateInput: string | Date | null | undefined,
  locale: string = "en-NG"
): string {
  if (!dateInput) return "";
  
  try {
    const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
    
    if (!isValid(date)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Invalid date provided: ${dateInput}`);
      }
      return "";
    }
    
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Error formatting date: ${dateInput}`, error);
    }
    return "";
  }
}
