/**
 * Funções de formatação compartilhadas usadas em toda a aplicação
 */

import { DATE_FORMAT_OPTIONS, DATE_LOCALE } from "./constants";

/**
 * Formata uma string de data ISO em um formato legível
 * @param dateString - String de data ISO
 * @returns String de data formatada (ex.: "15 de jan. de 2024, 10:30 AM")
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString(DATE_LOCALE, DATE_FORMAT_OPTIONS);
};

/**
 * Trunca uma string para um comprimento máximo e adiciona reticências se truncada
 * @param text - Texto para truncar
 * @param maxLength - Comprimento máximo antes de truncar
 * @returns Texto truncado com reticências se necessário
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Formata um GUID para exibição (versão encurtada)
 * @param guid - String de GUID completo
 * @param showFull - Se verdadeiro, retorna GUID completo; se falso, retorna os primeiros 8 caracteres
 * @returns GUID formatado
 */
export const formatGUID = (guid: string, showFull: boolean = false): string => {
  if (showFull) return guid;
  return guid.substring(0, 8) + "...";
};
