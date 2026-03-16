/**
 * Funções de validação compartilhadas usadas em toda a aplicação
 */

/**
 * Valida se uma string é um formato de e-mail válido
 * @param email - String de e-mail para validar
 * @returns true se o e-mail é válido, false caso contrário
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida se um valor é uma string não vazia
 * @param value - Valor para validar
 * @returns true se o valor é uma string não vazia, false caso contrário
 */
export const validateRequired = (value: any): boolean => {
  return typeof value === "string" && value.trim().length > 0;
};

/**
 * Valida se um campo tem erro baseado no estado touched e valor
 * @param fieldValue - Valor atual do campo
 * @param isTouched - Se o campo foi tocado
 * @param fieldType - Tipo de validação (opcional)
 * @returns Mensagem de erro se o campo tiver erro, null caso contrário
 */
export const getFieldError = (
  fieldValue: string,
  isTouched: boolean,
  fieldType?: "email" | "text"
): string | null => {
  if (!isTouched) return null;

  if (!fieldValue) return "Este campo é obrigatório";

  if (fieldType === "email" && !validateEmail(fieldValue)) {
    return "Digite um endereço de e-mail válido";
  }

  return null;
};
