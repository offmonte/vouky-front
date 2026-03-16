import { User, CreateUserRequest } from "@/app/types/user";

const API_BASE_URL = "https://localhost:7082";

export const createUser = async (userData: CreateUserRequest): Promise<User> => {
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
