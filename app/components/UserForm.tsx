"use client";

import { useState, useEffect } from "react";
import { User, CreateUserRequest, UpdateUserRequest } from "@/app/types/user";
import { createUser, updateUser } from "@/app/services/userService";

interface UserFormProps {
  user?: User | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const isEditMode = !!user;
  const [formData, setFormData] = useState<CreateUserRequest | UpdateUserRequest>(
    {
      name: "",
      email: "",
      userType: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        userType: user.userType,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        userType: "",
      });
    }
    setErrorMessage("");
    setSuccessMessage("");
  }, [user]);

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
      if (isEditMode && user) {
        await updateUser(user.id, formData as UpdateUserRequest);
        setSuccessMessage("User updated successfully!");
      } else {
        await createUser(formData as CreateUserRequest);
        setSuccessMessage("User created successfully!");
        setFormData({ name: "", email: "", userType: "" });
      }
      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save user";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {isEditMode ? "Edit User" : "Create User"}
      </h2>
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

        <div className="form-buttons">
          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading
              ? isEditMode
                ? "Saving..."
                : "Creating..."
              : isEditMode
              ? "Save Changes"
              : "Create User"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="cancel-button"
            >
              Cancel
            </button>
          )}
        </div>
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
