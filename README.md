# 👥 Sistema de Gerenciamento de Usuários

Uma aplicação completa de gerenciamento de usuários com **CRUD (Criar, Ler, Atualizar, Deletar)** construída com **Next.js 16** e **React 19**. Oferece uma interface limpa e responsiva com modos mock e API real.

---

## 📋 Índice

- [Funcionalidades](#funcionalidades)
- [Stack Tecnológico](#stack-tecnológico)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Começando](#começando)
- [Executando a Aplicação](#executando-a-aplicação)
- [Configuração](#configuração)
- [Organização do Código](#organização-do-código)
- [Guia de Componentes](#guia-de-componentes)
- [Guia de Serviços](#guia-de-serviços)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Implantação](#implantação)
- [Contribuindo](#contribuindo)

---

## ✨ Funcionalidades

✅ **Gerenciamento de Usuários**
- Listar todos os usuários com ordenação e paginação
- Criar novos usuários com validação
- Visualizar informações detalhadas do usuário
- Editar informações de usuários existentes
- Deletar usuários com soft delete (marcados como deletados, não removidos do BD)

✅ **Busca e Filtro**
- Buscar usuários por ID (formato GUID)
- Ordenar por nome, e-mail ou data de criação
- Paginação (10 itens por página)

✅ **Suporte Duplo Modo**
- **Modo Mock** (padrão): Banco de dados em memória para desenvolvimento local
- **Modo API Real**: Conectar a API REST externa

✅ **Experiência do Usuário**
- Design limpo e responsivo
- Validação de formulário com mensagens de erro
- Skeletons de carregamento durante busca de dados
- Notificações de sucesso/erro
- Suporte a modo escuro
- Acessível (atributos ARIA)

✅ **Validação de Dados**
- Validação de formato de e-mail
- Validação de campo obrigatório
- Verificação de unicidade de e-mail
- Feedback de erro em tempo real

---

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Next.js** | 16.1.6 | Framework React com SSR |
| **React** | 19.2.3 | Biblioteca de UI |
| **TypeScript** | ^5 | Segurança de tipo |
| **CSS** | Customizado | Estilos (sem Tailwind) |
| **ESLint** | ^9 | Linting de código |

---

## 📁 Estrutura do Projeto

```
vouky-front/
├── app/
│   ├── layout.tsx                 # Layout raiz & estrutura HTML
│   ├── page.tsx                   # Página principal da aplicação
│   ├── globals.css                # Estilos globais & variáveis CSS
│   │
│   ├── components/
│   │   ├── UserList.tsx           # Listar usuários com sort/paginação
│   │   ├── UserForm.tsx           # Formulário criar/editar usuário
│   │   ├── UserSearch.tsx         # Buscar usuários por ID
│   │   ├── UserDetails.tsx        # Exibir & gerenciar detalhes
│   │   ├── UserCard.tsx           # Card apresentação usuário
│   │   └── LoadingSkeleton.tsx    # Carregadores Skeleton
│   │
│   ├── services/
│   │   └── userService.ts         # Serviço API (mock + real)
│   │
│   ├── types/
│   │   └── user.ts                # Interfaces TypeScript
│   │
│   └── config/
│       └── mock.ts                # Dados mock & toggle
│
├── public/                         # Ativos estáticos
│   └── *.svg
│
├── package.json                   # Dependências & scripts
├── tsconfig.json                  # Configuração TypeScript
├── next.config.ts                 # Configuração Next.js
├── postcss.config.mjs             # Configuração PostCSS
├── eslint.config.mjs              # Configuração ESLint
└── README.md                       # Este arquivo
```

---

## 🚀 Começando

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- **Node.js** (v18 ou superior recomendado)
- **npm**, **yarn**, **pnpm** ou **bun** gerenciador de pacotes

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd vouky-front
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

---

## 🏃 Executando a Aplicação

### Modo Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em **[http://localhost:3000](http://localhost:3000)**

A página será recarregada automaticamente conforme você faz mudanças de código.

### Build de Produção

Construa para produção:

```bash
npm run build
```

Inicie o servidor de produção:

```bash
npm start
```

### Linting

Verifique a qualidade do código:

```bash
npm run lint
```

---

## ⚙️ Configuração

### Alternando Entre Mock e API Real

A aplicação possui dois modos controlados por `app/config/mock.ts`:

#### Modo Mock (Padrão)
Perfeito para **desenvolvimento local e testes**:

```typescript
// app/config/mock.ts
export const USE_MOCK_DATA = true;
```

**Características:**
- Usa banco de dados em memória (persiste durante sessão)
- Nenhuma API externa necessária
- Simula latência de rede de 300-500ms
- Todos os dados são resetados quando dev server reinicia
- Perfeito para testes de UI/UX

#### Modo API Real
Para **conectar a um backend real**:

```typescript
// app/config/mock.ts
export const USE_MOCK_DATA = false;
```

**Requisitos:**
- Um servidor de API deve estar rodando em `https://localhost:7082`
- API deve implementar endpoints REST padrão (veja [Endpoints de API](#endpoints-de-api))
- Lidar com códigos HTTP apropriados (400, 404, 409, etc.)

### Configuração de API

A URL base da API é configurada em `app/services/userService.ts`:

```typescript
const API_BASE_URL = "https://localhost:7082";
```

**Para mudar a URL da API:**
1. Abra `app/services/userService.ts`
2. Modifique a constante `API_BASE_URL`
3. Reinicie o servidor de desenvolvimento

**⚠️ Variáveis de Ambiente (Recomendado)**

Para melhor flexibilidade, considere mover a URL da API para variáveis de ambiente:

```typescript
// app/services/userService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7082";
```

Depois crie um arquivo `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

### Endpoints de API Necessários

Quando usar Modo API Real, seu backend deve implementar:

| Método | Endpoint | Descrição |
|--------|----------|------------|
| **GET** | `/users` | Obter todos usuários ativos |
| **GET** | `/users/{id}` | Obter usuário por ID |
| **POST** | `/users` | Criar novo usuário |
| **PATCH** | `/users/{id}` | Atualizar usuário |
| **DELETE** | `/users/{id}` | Deletar usuário (soft delete) |

**Formato de Resposta Esperada:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "userType": "550e8400-e29b-41d4-a716-446655440011",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "deletedAt": null
}
```

**Resposta de Erro Esperada (400, 404, 409):**

```json
{
  "message": "Descrição do erro aqui"
}
```

---

## 📚 Organização do Código

### Princípios de Arquitetura

✅ **Baseado em Componentes**: Componentes React modulares e reutilizáveis
✅ **Camada de Serviço**: Lógica centralizada de API em `userService.ts`
✅ **Segurança de Tipo**: TypeScript completo para melhor experiência
✅ **Separação de Responsabilidades**: Componentes lidam com UI, serviços com dados
✅ **Gerenciamento de Estado**: Estado local + coordenação de componente pai
✅ **Tratamento de Erros**: Mensagens de erro elegantes para usuários
✅ **Acessibilidade**: Atributos ARIA para leitores de tela

### Observações de Qualidade do Código

**✅ Pontos Fortes:**
- Estrutura limpa de componentes com responsabilidades claras
- Digitação completa em TypeScript
- Bom tratamento de erros e feedback do usuário
- Validação de formulário antes da submissão
- Estados de carregamento e componentes skeleton
- Design responsivo com media queries
- Markup acessível com atributos ARIA
- Princípio DRY bem aplicado
- Banco de dados mock é fácil de alternar

**📋 Notas:**
- Tailwind CSS está instalado mas não é usado; estilos são CSS customizado
- Nenhuma biblioteca de gerenciamento de estado global (usando state de componente)
- URL de API é hardcoded (considere variáveis de ambiente para produção)
- Sem testes unitários presentes (boa oportunidade para melhoria futura)

---

## 🧩 Guia de Componentes

### 1. **page.tsx** (Página Principal)
**Localização:** `app/page.tsx`

O componente orquestrador principal que gerencia:
- Estado de nível superior (usuário selecionado, mostrar formulário, gatilho de atualização)
- Estrutura de layout (sidebar, lista, busca)
- Composição de componentes

**Estado Principal:**
```typescript
const [refreshKey, setRefreshKey] = useState(0);      // Atualizar lista
const [showCreateForm, setShowCreateForm] = useState(false);  // Mostrar form
const [selectedUser, setSelectedUser] = useState(null);  // Detalhes selecionados
```

---

### 2. **UserList.tsx**
**Localização:** `app/components/UserList.tsx`

Exibe uma tabela paginada de usuários com capacidades de ordenação e filtro.

**Funcionalidades:**
- Busca todos os usuários do serviço
- Ordena por nome, e-mail ou data de criação
- Paginação no cliente (10 itens por página)
- Skeleton de carregamento durante busca
- Estado de erro com opção de tentar novamente
- Mensagem de estado vazio

**Props:**
```typescript
interface UserListProps {
  refreshKey: number;                    // Dispara busca quando muda
  onSelectUser: (user: User) => void;   // Chamado quando botão "Ver" clicado
}
```

---

### 3. **UserForm.tsx**
**Localização:** `app/components/UserForm.tsx`

Formulário reutilizável para criar e editar usuários.

**Funcionalidades:**
- Modo criar: formulário em branco para novos usuários
- Modo editar: pré-preenchido com dados do usuário
- Validação de campo em tempo real ao desfocar
- Validação de unicidade de e-mail
- Botão submit desabilitado até formulário ser válido
- Mensagens de sucesso/erro

**Props:**
```typescript
interface UserFormProps {
  user?: User | null;           // Se fornecido, formulário entra em modo editar
  onSuccess: () => void;        // Chamado após salvar com sucesso
  onCancel?: () => void;        // Chamado quando botão cancelar clicado
}
```

---

### 4. **UserSearch.tsx**
**Localização:** `app/components/UserSearch.tsx`

Componente de busca para encontrar usuários por ID e visualizar/editar detalhes.

**Funcionalidades:**
- Campo de entrada para ID de usuário GUID
- Exibe UserDetails quando usuário é encontrado
- Trata erros de busca
- Integra com UserDetails para editar/deletar

**Props:**
```typescript
interface UserSearchProps {
  onUserUpdated: () => void;              // Chamado após atualizar/deletar
  onUserSelected?: (user: User) => void;  // Chamado quando usuário selecionado
  selectedUser?: User | null;             // Usuário pré-selecionado para exibir
  onCloseDetails?: () => void;            // Chamado quando detalhes fechados
}
```

---

### 5. **UserDetails.tsx**
**Localização:** `app/components/UserDetails.tsx`

Componente de diálogo exibindo informações do usuário com opções de editar e deletar.

**Funcionalidades:**
- Visualizar informações do usuário
- Botão editar alterna para formulário de edição
- Deletar com diálogo de confirmação
- Fecha com tecla ESC
- Mostra erros quando operações falham

**Props:**
```typescript
interface UserDetailsProps {
  user: User;
  onUserUpdated: () => void;              // Chamado após atualizar/deletar
  onUserSelected: (user: User) => void;   // Chamado para formulário edição
  onCloseDetails: () => void;             // Chamado para fechar diálogo
}
```

---

### 6. **LoadingSkeleton.tsx**
**Localização:** `app/components/LoadingSkeleton.tsx`

Componentes skeleton para estados de carregamento.

**Componentes Exportados:**
- `TableSkeleton` - Skeleton para tabela de lista de usuários
- `FormSkeleton` - Skeleton para formulário
- `DetailsSkeleton` - Skeleton para detalhes de usuário

---

### 7. **UserCard.tsx**
**Localização:** `app/components/UserCard.tsx`

Componente de apresentação para exibir um card de usuário (atualmente não usado no layout principal, disponível para uso futuro).

---

## 🔧 Guia de Serviços

### userService.ts
**Localização:** `app/services/userService.ts`

Serviço centralizado para todas as operações de API relacionadas a usuários. Trata tanto modos mock quanto API real.

**Funções Exportadas:**

```typescript
// Obter todos usuários ativos (não deletados)
export const getUsers = async (): Promise<User[]>

// Obter usuário único por ID
export const getUserById = async (id: string): Promise<User>

// Criar novo usuário
export const createUser = async (userData: CreateUserRequest): Promise<User>

// Atualizar usuário existente (atualização parcial)
export const updateUser = async (id: string, userData: UpdateUserRequest): Promise<User>

// Deletar usuário (soft delete)
export const deleteUser = async (id: string): Promise<void>
```

**Implementação Modo Mock:**
- Usa objeto `mockDatabase` em memória
- Simula latência de rede (atrasos de 300-500ms)
- Valida unicidade de e-mail
- Implementa soft deletes
- Retorna mensagens de erro estruturadas

**Implementação Modo API Real:**
- Faz requisições HTTP usando `fetch`
- Mapeia códigos de status HTTP para erros amigáveis
- Trata erros 400 (validação), 404 (não encontrado), 409 (conflito)
- Envia corpos de requisição JSON

---

## 📝 Guia de Tipos

### user.ts
**Localização:** `app/types/user.ts`

Interfaces TypeScript definindo todas estruturas de dados.

```typescript
// Modelo principal de dados de usuário
interface User {
  id: string;                    // Formato UUID
  name: string;
  email: string;
  userType: string;              // Formato UUID para tipo de usuário
  createdAt: string;             // Datetime ISO 8601
  updatedAt: string;             // Datetime ISO 8601
  deletedAt: string | null;      // Timestamp de soft delete
}

// Payload de requisição para criar usuário
interface CreateUserRequest {
  name: string;
  email: string;
  userType: string;
}

// Payload de requisição para atualizar usuário
interface UpdateUserRequest {
  name?: string;
  email?: string;
  userType?: string;
}

// Invólucro genérico de resposta de API
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Estrutura de erro de API
interface ApiError {
  message: string;
  status: number;
}
```

---

## 🎯 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento Next.js com hot reload em `localhost:3000`

### Build
```bash
npm run build
```
Cria um build otimizado de produção no diretório `.next`

### Produção
```bash
npm start
```
Executa o servidor de produção (requer `npm run build` primeiro)

### Linting
```bash
npm run lint
```
Executa ESLint para verificar qualidade do código

---

## 🌐 Estilos

### Estilos Globais
Todos os estilos são definidos em um único arquivo: `app/globals.css`

**Funcionalidades:**
- Variáveis CSS para tema consistente
- Design responsivo com media queries
- Suporte a modo escuro
- Animações (fade-in, slide-up, error shake)
- Nomes de classe semântica (não usando utilitários Tailwind)

**Variáveis CSS:**
```css
--font-geist-sans     /* Família de fonte primária */
--font-geist-mono     /* Família de fonte monospace */
--background          /* Cor de fundo */
--foreground           /* Cor de texto */
/* ...e mais */
```

**Carregamento de Fontes:**
Fontes são carregadas via `next/font`:
- **Geist** (sans-serif) - fonte primária
- **Geist Mono** (monospace) - para conteúdo técnico

---

## 🧪 Melhorias Futuras

1. **Testes**
   - Adicionar testes unitários para componentes
   - Adicionar testes de integração para serviços
   - Adicionar testes E2E com Cypress/Playwright

2. **Gerenciamento de Estado**
   - Considerar React Context ou Zustand para estado global
   - Reduzir prop drilling em componentes profundamente aninhados

3. **Integração de API**
   - Mover URL de API para variáveis de ambiente
   - Adicionar interceptadores de requisição/resposta
   - Implementar lógica de retry para requisições falhadas

4. **Desempenho**
   - Adicionar cache/memoização de requisições
   - Implementar virtual scrolling para listas grandes
   - Adicionar code splitting e lazy loading

5. **Funcionalidades**
   - Adicionar suporte a avatar/imagem de usuário
   - Adicionar operações em massa (selecionar múltiplos, deletar todos)
   - Adicionar exportação de usuários para CSV/PDF
   - Adicionar roles e permissões de usuário

6. **Acessibilidade**
   - Adicionar atalhos de navegação com teclado
   - Melhorar experiência com leitor de tela
   - Adicionar indicadores de foco

---

## 🚀 Implantação

### Deploy em Vercel (Recomendado)

1. Faça push do seu código para GitHub
2. Vá para [vercel.com](https://vercel.com)
3. Clique em "New Project" e selecione seu repositório
4. Vercel detectará automaticamente a configuração Next.js
5. Configure variáveis de ambiente se necessário (ex: `NEXT_PUBLIC_API_BASE_URL`)
6. Clique em "Deploy"

### Deploy em Outras Plataformas

Construa a aplicação:
```bash
npm run build
```

Os arquivos prontos para produção estarão no diretório `.next`.

---

## 📖 Recursos de Aprendizado

- **Documentação Next.js:** https://nextjs.org/docs
- **Documentação React:** https://react.dev
- **TypeScript Handbook:** https://www.typescriptlang.org/docs

---

## 📝 Licença

Este projeto é privado e não é licenciado para uso público.

---

## 👤 Autor

**Lucas Monte** - Desenvolvedor Principal

---

**Última Atualização:** 2024
