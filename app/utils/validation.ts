/**
 * Shared validation functions used across the application
 */

/**
 * Validates if a string is a valid email format
 * @param email - Email string to validate
 * @returns true if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if a value is a non-empty string
 * @param value - Value to validate
 * @returns true if value is a non-empty string, false otherwise
 */
export const validateRequired = (value: any): boolean => {
  return typeof value === "string" && value.trim().length > 0;
};

/**
 * Validates if a field has an error based on touched state and value
 * @param fieldValue - The current value of the field
 * @param isTouched - Whether the field has been touched
 * @param fieldType - Type of validation (optional)
 * @returns Error message if field has error, null otherwise
 */
export const getFieldError = (
  fieldValue: string,
  isTouched: boolean,
  fieldType?: "email" | "text"
): string | null => {
  if (!isTouched) return null;

  if (!fieldValue) return "This field is required";

  if (fieldType === "email" && !validateEmail(fieldValue)) {
    return "Please enter a valid email address";
  }

  return null;
};
