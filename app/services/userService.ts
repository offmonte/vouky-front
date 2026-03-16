import { User, CreateUserRequest } from "@/app/types/user";
import { USE_MOCK_DATA, mockUsers } from "@/app/config/mock";

const API_BASE_URL = "https://localhost:7082";

// Store created mock users in memory
const createdMockUsers: Record<string, User> = {};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate a simple GUID-like string for mock
const generateMockId = () => {
  return "550e8400-e29b-41d4-" + Math.random().toString(16).slice(2, 18);
};

// Mock implementation for creating user
const createUserMock = async (userData: CreateUserRequest): Promise<User> => {
  await delay(500); // Simulate network delay

  // Check if email already exists in mock users
  const allUsers = { ...mockUsers, ...createdMockUsers };
  const emailExists = Object.values(allUsers).some(
    (user) => user.email === userData.email
  );

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

  createdMockUsers[newUser.id] = newUser;
  return newUser;
};

// Mock implementation for getting user by ID
const getUserByIdMock = async (id: string): Promise<User> => {
  await delay(300); // Simulate network delay

  const allUsers = { ...mockUsers, ...createdMockUsers };
  const user = allUsers[id];

  if (!user) {
    throw new Error("User not found");
  }

  return user;
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
