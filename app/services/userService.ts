import { User, CreateUserRequest, UpdateUserRequest } from "@/app/types/user";
import { USE_MOCK_DATA, mockUsers } from "@/app/config/mock";

const API_BASE_URL = "https://localhost:7082";

// Store mock data in memory (persists during session)
const mockDatabase: Record<string, User> = { ...mockUsers };

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate a simple GUID-like string for mock
const generateMockId = () => {
  return "550e8400-e29b-41d4-" + Math.random().toString(16).slice(2, 18);
};

// Get all active users (not deleted)
const getUsersMock = async (): Promise<User[]> => {
  await delay(300);
  return Object.values(mockDatabase).filter((user) => !user.deletedAt);
};

// Get user by ID
const getUserByIdMock = async (id: string): Promise<User> => {
  await delay(300);

  const user = mockDatabase[id];

  if (!user || user.deletedAt) {
    throw new Error("User not found");
  }

  return user;
};

// Create user
const createUserMock = async (userData: CreateUserRequest): Promise<User> => {
  await delay(500);

  // Check if email already exists in active users
  const activeUsers = Object.values(mockDatabase).filter((u) => !u.deletedAt);
  const emailExists = activeUsers.some((user) => user.email === userData.email);

  if (emailExists) {
    throw new Error("Email already exists");
  }

  // Validate required fields
  if (!userData.name || !userData.email || !userData.userType) {
    throw new Error("All fields are required");
  }

  const now = new Date().toISOString();
  const newUser: User = {
    id: generateMockId(),
    name: userData.name,
    email: userData.email,
    userType: userData.userType,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };

  mockDatabase[newUser.id] = newUser;
  return newUser;
};

// Update user (partial update)
const updateUserMock = async (
  id: string,
  userData: UpdateUserRequest
): Promise<User> => {
  await delay(500);

  const user = mockDatabase[id];

  if (!user || user.deletedAt) {
    throw new Error("User not found");
  }

  // Check if email is being changed and if it already exists
  if (userData.email && userData.email !== user.email) {
    const activeUsers = Object.values(mockDatabase).filter(
      (u) => !u.deletedAt && u.id !== id
    );
    const emailExists = activeUsers.some((u) => u.email === userData.email);

    if (emailExists) {
      throw new Error("Email already exists");
    }
  }

  const now = new Date().toISOString();
  const updatedUser: User = {
    ...user,
    ...userData,
    id: user.id,
    createdAt: user.createdAt,
    updatedAt: now,
    deletedAt: user.deletedAt,
  };

  mockDatabase[id] = updatedUser;
  return updatedUser;
};

// Delete user (soft delete)
const deleteUserMock = async (id: string): Promise<void> => {
  await delay(400);

  const user = mockDatabase[id];

  if (!user || user.deletedAt) {
    throw new Error("User not found");
  }

  const now = new Date().toISOString();
  mockDatabase[id] = {
    ...user,
    deletedAt: now,
  };
};

export const getUsers = async (): Promise<User[]> => {
  if (USE_MOCK_DATA) {
    return getUsersMock();
  }

  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export const getUserById = async (id: string): Promise<User> => {
  if (USE_MOCK_DATA) {
    return getUserByIdMock(id);
  }

  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    throw new Error("User not found");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export const createUser = async (userData: CreateUserRequest): Promise<User> => {
  if (USE_MOCK_DATA) {
    return createUserMock(userData);
  }

  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 409) {
    throw new Error("Email already exists");
  }

  if (response.status === 400) {
    const error = await response.json();
    throw new Error(error.message || "Validation error");
  }

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

export const updateUser = async (
  id: string,
  userData: UpdateUserRequest
): Promise<User> => {
  if (USE_MOCK_DATA) {
    return updateUserMock(id, userData);
  }

  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 404) {
    throw new Error("User not found");
  }

  if (response.status === 409) {
    throw new Error("Email already exists");
  }

  if (response.status === 400) {
    const error = await response.json();
    throw new Error(error.message || "Validation error");
  }

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};

export const deleteUser = async (id: string): Promise<void> => {
  if (USE_MOCK_DATA) {
    return deleteUserMock(id);
  }

  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    throw new Error("User not found");
  }

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
};
