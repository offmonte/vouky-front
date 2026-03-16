/**
 * Shared constants used across the application
 */

// Pagination constants
export const ITEMS_PER_PAGE = 10;

// Mock API delay timings (in milliseconds)
export const MOCK_DELAYS = {
  FETCH_USERS: 300,
  FETCH_USER: 300,
  CREATE_USER: 500,
  UPDATE_USER: 500,
  DELETE_USER: 400,
} as const;

// Date formatting options
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

// Date locale
export const DATE_LOCALE = "en-US";

// API configuration
export const API_BASE_URL = "https://localhost:7082";

// Error messages
export const ERROR_MESSAGES = {
  EMAIL_EXISTS: "Email already exists",
  USER_NOT_FOUND: "User not found",
  VALIDATION_FAILED: "All fields are required",
  FAILED_FETCH_USERS: "Failed to fetch users",
  FAILED_FETCH_USER: "Failed to fetch user",
  FAILED_CREATE_USER: "Failed to create user",
  FAILED_UPDATE_USER: "Failed to update user",
  FAILED_DELETE_USER: "Failed to delete user",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  USER_CREATED: "User created successfully!",
  USER_UPDATED: "User updated successfully!",
} as const;
