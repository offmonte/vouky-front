# 👥 User Management System

A complete **CRUD (Create, Read, Update, Delete)** user management application built with **Next.js 16** and **React 19**. Features a clean, responsive interface with both mock and real API modes.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [Code Organization](#code-organization)
- [Components Guide](#components-guide)
- [Services Guide](#services-guide)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## ✨ Features

✅ **User Management**
- List all users with sorting and pagination
- Create new users with validation
- View detailed user information
- Edit existing user information
- Soft delete users (marked as deleted, not removed from DB)

✅ **Search & Filter**
- Search users by ID (GUID format)
- Sort by name, email, or creation date
- Pagination (10 items per page)

✅ **Dual Mode Support**
- **Mock Mode** (default): In-memory database for local development
- **Real API Mode**: Connect to external REST API

✅ **User Experience**
- Clean and responsive design
- Form validation with error messages
- Loading skeletons while fetching data
- Success/error notifications
- Dark mode support
- Accessible (ARIA attributes)

✅ **Data Validation**
- Email format validation
- Required field validation
- Email uniqueness checks
- Real-time error feedback

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.1.6 | React framework with SSR |
| **React** | 19.2.3 | UI library |
| **TypeScript** | ^5 | Type safety |
| **CSS** | Custom | Styling (no Tailwind utilities) |
| **ESLint** | ^9 | Code linting |

---

## 📁 Project Structure

```
vouky-front/
├── app/
│   ├── layout.tsx                 # Root layout & HTML structure
│   ├── page.tsx                   # Main application page (Home)
│   ├── globals.css                # Global styles & CSS variables
│   │
│   ├── components/
│   │   ├── UserList.tsx           # List users with sorting/pagination
│   │   ├── UserForm.tsx           # Create/Edit user form
│   │   ├── UserSearch.tsx         # Search users by ID
│   │   ├── UserDetails.tsx        # Display & manage user details
│   │   ├── UserCard.tsx           # Presentational user card
│   │   └── LoadingSkeleton.tsx    # Skeleton loaders
│   │
│   ├── services/
│   │   └── userService.ts         # API service (mock + real)
│   │
│   ├── types/
│   │   └── user.ts                # TypeScript interfaces
│   │
│   └── config/
│       └── mock.ts                # Mock data & toggle
│
├── public/                         # Static assets
│   └── *.svg
│
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
├── postcss.config.mjs             # PostCSS configuration
├── eslint.config.mjs              # ESLint configuration
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have installed:
- **Node.js** (v18 or higher recommended)
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vouky-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

---

## 🏃 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at **[http://localhost:3000](http://localhost:3000)**

The page will auto-reload as you make code changes.

### Production Build

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Check code quality:

```bash
npm run lint
```

---

## ⚙️ Configuration

### Switching Between Mock and Real API

The application has two modes controlled by `app/config/mock.ts`:

#### Mock Mode (Default)
Perfect for **local development and testing**:

```typescript
// app/config/mock.ts
export const USE_MOCK_DATA = true;
```

**Characteristics:**
- Uses in-memory database (persists during session)
- No external API required
- Simulates 300-500ms network latency
- All data is reset when dev server restarts
- Perfect for UI/UX testing

#### Real API Mode
For **connecting to a real backend**:

```typescript
// app/config/mock.ts
export const USE_MOCK_DATA = false;
```

**Requirements:**
- An API server must be running at `https://localhost:7082`
- API must implement standard REST endpoints (see [API Endpoints](#api-endpoints))
- Handle appropriate HTTP status codes (400, 404, 409, etc.)

### API Configuration

The API base URL is configured in `app/services/userService.ts`:

```typescript
const API_BASE_URL = "https://localhost:7082";
```

**To change the API URL:**
1. Open `app/services/userService.ts`
2. Modify the `API_BASE_URL` constant
3. Restart the development server

**⚠️ Environment Variables (Recommended)**

For better flexibility, consider moving the API URL to environment variables:

```typescript
// app/services/userService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7082";
```

Then create a `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

### API Endpoints Required

When using Real API Mode, your backend should implement:

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/users` | Get all active users |
| **GET** | `/users/{id}` | Get user by ID |
| **POST** | `/users` | Create new user |
| **PATCH** | `/users/{id}` | Update user |
| **DELETE** | `/users/{id}` | Delete user (soft delete) |

**Expected Response Format:**

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

**Expected Error Response (400, 404, 409):**

```json
{
  "message": "Error description here"
}
```

---

## 📚 Code Organization

### Architecture Principles

✅ **Component-Based**: Modular, reusable React components
✅ **Service Layer**: Centralized API logic in `userService.ts`
✅ **Type Safety**: Full TypeScript for better developer experience
✅ **Separation of Concerns**: Components handle UI, services handle data
✅ **State Management**: Local component state + parent coordination
✅ **Error Handling**: Graceful error messages to users
✅ **Accessibility**: ARIA attributes for screen readers

### Code Quality Observations

**✅ Strengths:**
- Clean component structure with clear responsibilities
- Proper TypeScript typing throughout
- Good error handling and user feedback
- Form validation before submission
- Loading states and skeleton components
- Responsive design with media queries
- Accessible markup with ARIA attributes
- DRY principle (Don't Repeat Yourself) applied well
- Mock database is easy to toggle

**📋 Notes:**
- Tailwind CSS is installed but not used; styles are custom CSS
- No global state management library (using component state only)
- API URL is hardcoded (consider env variables for production)
- No unit tests present (good opportunity for future improvement)

---

## 🧩 Components Guide

### 1. **page.tsx** (Home Page)
**Location:** `app/page.tsx`

The main orchestrator component that manages:
- Top-level state (selected user, show create form, refresh trigger)
- Layout structure (sidebar, list, search)
- Component composition

**Key State:**
```typescript
const [refreshKey, setRefreshKey] = useState(0);      // Trigger list refresh
const [showCreateForm, setShowCreateForm] = useState(false);  // Show form
const [selectedUser, setSelectedUser] = useState(null);  // Selected user details
```

---

### 2. **UserList.tsx**
**Location:** `app/components/UserList.tsx`

Displays a paginated table of users with sorting and filtering capabilities.

**Features:**
- Fetches all users from service
- Sorts by name, email, or creation date
- Client-side pagination (10 items per page)
- Loading skeleton while fetching
- Error state with retry option
- Empty state message

**Props:**
```typescript
interface UserListProps {
  refreshKey: number;                    // Triggers refetch when changed
  onSelectUser: (user: User) => void;   // Called when "View" button clicked
}
```

---

### 3. **UserForm.tsx**
**Location:** `app/components/UserForm.tsx`

Reusable form for creating and editing users.

**Features:**
- Create mode: blank form for new users
- Edit mode: pre-populated with user data
- Real-time field validation on blur
- Email uniqueness validation
- Disabled submit button until form is valid
- Success/error messages

**Props:**
```typescript
interface UserFormProps {
  user?: User | null;           // If provided, form enters edit mode
  onSuccess: () => void;        // Called after successful save
  onCancel?: () => void;        // Called when cancel button clicked
}
```

---

### 4. **UserSearch.tsx**
**Location:** `app/components/UserSearch.tsx`

Search component for finding users by ID and viewing/editing their details.

**Features:**
- Search input for GUID user ID
- Displays UserDetails when user is found
- Handles search errors
- Integrates with UserDetails for edit/delete

**Props:**
```typescript
interface UserSearchProps {
  onUserUpdated: () => void;              // Called after user is updated/deleted
  onUserSelected?: (user: User) => void;  // Called when user is selected
  selectedUser?: User | null;             // Pre-selected user to display
  onCloseDetails?: () => void;            // Called when details are closed
}
```

---

### 5. **UserDetails.tsx**
**Location:** `app/components/UserDetails.tsx`

Dialog component displaying user information with edit and delete options.

**Features:**
- View user information
- Edit button toggles to edit form
- Delete with confirmation dialog
- Closes on ESC key
- Shows errors when operations fail

**Props:**
```typescript
interface UserDetailsProps {
  user: User;
  onUserUpdated: () => void;    // Called after update/delete
  onUserSelected: (user: User) => void;  // Called for edit form
  onCloseDetails: () => void;   // Called to close dialog
}
```

---

### 6. **LoadingSkeleton.tsx**
**Location:** `app/components/LoadingSkeleton.tsx`

Skeleton components for loading states.

**Exported Components:**
- `TableSkeleton` - Skeleton for user list table
- `FormSkeleton` - Skeleton for form
- `DetailsSkeleton` - Skeleton for user details

---

### 7. **UserCard.tsx**
**Location:** `app/components/UserCard.tsx`

Presentational component for displaying a user card (currently not used in main layout, available for future use).

---

## 🔧 Services Guide

### userService.ts
**Location:** `app/services/userService.ts`

Centralized service for all user-related API operations. Handles both mock and real API modes.

**Exported Functions:**

```typescript
// Get all active (non-deleted) users
export const getUsers = async (): Promise<User[]>

// Get single user by ID
export const getUserById = async (id: string): Promise<User>

// Create new user
export const createUser = async (userData: CreateUserRequest): Promise<User>

// Update existing user (partial update)
export const updateUser = async (id: string, userData: UpdateUserRequest): Promise<User>

// Delete user (soft delete)
export const deleteUser = async (id: string): Promise<void>
```

**Mock Mode Implementation:**
- Uses in-memory `mockDatabase` object
- Simulates network latency (300-500ms delays)
- Validates email uniqueness
- Implements soft deletes
- Returns structured error messages

**Real API Mode Implementation:**
- Makes HTTP requests using `fetch`
- Maps HTTP status codes to user-friendly errors
- Handles 400 (validation), 404 (not found), 409 (conflict) errors
- Sends JSON request bodies

---

## 📝 Types Guide

### user.ts
**Location:** `app/types/user.ts`

TypeScript interfaces defining all data structures.

```typescript
// Main user data model
interface User {
  id: string;                    // UUID format
  name: string;
  email: string;
  userType: string;              // UUID format for user type
  createdAt: string;             // ISO 8601 datetime
  updatedAt: string;             // ISO 8601 datetime
  deletedAt: string | null;      // Soft delete timestamp
}

// Request payload for creating user
interface CreateUserRequest {
  name: string;
  email: string;
  userType: string;
}

// Request payload for updating user
interface UpdateUserRequest {
  name?: string;
  email?: string;
  userType?: string;
}

// Generic API response wrapper
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// API error structure
interface ApiError {
  message: string;
  status: number;
}
```

---

## 🎯 Available Scripts

### Development
```bash
npm run dev
```
Starts the Next.js development server with hot reload at `localhost:3000`

### Build
```bash
npm run build
```
Creates an optimized production build in the `.next` directory

### Production
```bash
npm start
```
Runs the production server (requires `npm run build` first)

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality

---

## 🌐 Styling

### Global Styles
All styles are defined in a single file: `app/globals.css`

**Features:**
- CSS variables for consistent theming
- Responsive design with media queries
- Dark mode support
- Animations (fade-in, slide-up, error shake)
- Semantic class names (not using Tailwind utilities)

**CSS Variables:**
```css
--font-geist-sans     /* Primary font family */
--font-geist-mono     /* Monospace font family */
--background          /* Background color */
--foreground           /* Text color */
/* ...and more */
```

**Font Loading:**
Fonts are loaded via `next/font`:
- **Geist** (sans-serif) - primary font
- **Geist Mono** (monospace) - for technical content

---

## 🧪 Future Improvements

1. **Testing**
   - Add unit tests for components
   - Add integration tests for services
   - Add E2E tests with Cypress/Playwright

2. **State Management**
   - Consider React Context or Zustand for global state
   - Reduce prop drilling in deeply nested components

3. **API Integration**
   - Move API URL to environment variables
   - Add API request/response interceptors
   - Implement retry logic for failed requests

4. **Performance**
   - Add request caching/memoization
   - Implement virtual scrolling for large lists
   - Add code splitting and lazy loading

5. **Features**
   - Add user avatar/image support
   - Add bulk operations (select multiple, delete all)
   - Add export users to CSV/PDF
   - Add user roles and permissions

6. **Accessibility**
   - Add keyboard navigation shortcuts
   - Improve screen reader experience
   - Add focus indicators

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Vercel will auto-detect Next.js configuration
5. Set environment variables if needed (e.g., `NEXT_PUBLIC_API_BASE_URL`)
6. Click "Deploy"

### Deploy to Other Platforms

Build the application:
```bash
npm run build
```

The production-ready files will be in the `.next` directory.

---

## 📖 Learning Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **React Documentation:** https://react.dev
- **TypeScript Handbook:** https://www.typescriptlang.org/docs

---

## 📝 License

This project is private and not licensed for public use.

---

## 👤 Author

**Lucas Monte** - Lead Developer

---

**Last Updated:** 2024
