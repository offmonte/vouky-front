"use client";

import { useState } from "react";
import { CreateUserRequest } from "@/app/types/user";
import { createUser } from "@/app/services/userService";

interface UserFormProps {
  onSuccess: () => void;
}

export default function UserForm({ onSuccess }: UserFormProps) {
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: "",
    email: "",
    userType: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await createUser(formData);
      setSuccessMessage("User created successfully!");
      setFormData({ name: "", email: "", userType: "" });
      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create user";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create User</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter user name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter user email"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="userType" className="form-label">
            User Type (GUID)
          </label>
          <input
            type="text"
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
            placeholder="Enter user type as GUID"
            className="form-input"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>

      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
    </div>
  );
}
