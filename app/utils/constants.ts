/**
 * Constantes compartilhadas usadas em toda a aplicação
 */

// Constantes de paginação
export const ITEMS_PER_PAGE = 10;

// Atrasos de API Mock (em milissegundos)
export const MOCK_DELAYS = {
  FETCH_USERS: 300,
  FETCH_USER: 300,
  CREATE_USER: 500,
  UPDATE_USER: 500,
  DELETE_USER: 400,
} as const;

// Opções de formatação de data
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

// Localidade de data
export const DATE_LOCALE = "pt-BR";

// Configuração de API
export const API_BASE_URL = "https://localhost:7082";

// Mensagens de erro
export const ERROR_MESSAGES = {
  EMAIL_EXISTS: "E-mail já existe",
  USER_NOT_FOUND: "Usuário não encontrado",
  VALIDATION_FAILED: "Todos os campos são obrigatórios",
  FAILED_FETCH_USERS: "Falha ao buscar usuários",
  FAILED_FETCH_USER: "Falha ao buscar usuário",
  FAILED_CREATE_USER: "Falha ao criar usuário",
  FAILED_UPDATE_USER: "Falha ao atualizar usuário",
  FAILED_DELETE_USER: "Falha ao deletar usuário",
} as const;

// Mensagens de sucesso
export const SUCCESS_MESSAGES = {
  USER_CREATED: "Usuário criado com sucesso!",
  USER_UPDATED: "Usuário atualizado com sucesso!",
} as const;
