/**
 * Shared formatting functions used across the application
 */

import { DATE_FORMAT_OPTIONS, DATE_LOCALE } from "./constants";

/**
 * Formats an ISO date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Jan 15, 2024, 10:30 AM")
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString(DATE_LOCALE, DATE_FORMAT_OPTIONS);
};

/**
 * Truncates a string to a maximum length and adds ellipsis if truncated
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncating
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Formats a GUID for display (shortened version)
 * @param guid - Full GUID string
 * @param showFull - If true, returns full GUID; if false, returns first 8 chars
 * @returns Formatted GUID
 */
export const formatGUID = (guid: string, showFull: boolean = false): string => {
  if (showFull) return guid;
  return guid.substring(0, 8) + "...";
};
