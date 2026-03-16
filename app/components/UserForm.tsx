"use client";

import { useState, useEffect } from "react";
import { User, CreateUserRequest, UpdateUserRequest } from "@/app/types/user";
import { createUser, updateUser } from "@/app/services/userService";
import { FormSkeleton } from "./LoadingSkeleton";

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
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    name: false,
    email: false,
    userType: false,
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getFieldError = (field: string) => {
    if (!touched[field]) return null;

    const value = formData[field as keyof typeof formData];
    if (!value) return "This field is required";
    if (field === "email" && !validateEmail(value as string))
      return "Please enter a valid email address";
    return null;
  };

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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.userType &&
      validateEmail(formData.email as string)
    );
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
    <div className="form-container" role="region" aria-label={isEditMode ? "Edit user form" : "Create user form"}>
      <h2 className="form-title">
        {isEditMode ? "✏️ Edit User" : "➕ Create User"}
      </h2>
      <form onSubmit={handleSubmit} className="form-content" noValidate>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name <span className="required-indicator">*</span>
          </label>
          <div className="form-input-wrapper">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Enter user name"
              className={`form-input ${
                getFieldError("name") ? "input-error" : ""
              }`}
              aria-invalid={!!getFieldError("name")}
              aria-describedby={getFieldError("name") ? "name-error" : undefined}
            />
            {getFieldError("name") && (
              <span className="field-error" id="name-error">
                {getFieldError("name")}
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="required-indicator">*</span>
          </label>
          <div className="form-input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Enter user email"
              className={`form-input ${
                getFieldError("email") ? "input-error" : ""
              }`}
              aria-invalid={!!getFieldError("email")}
              aria-describedby={getFieldError("email") ? "email-error" : undefined}
            />
            {getFieldError("email") && (
              <span className="field-error" id="email-error">
                {getFieldError("email")}
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="userType" className="form-label">
            User Type (GUID) <span className="required-indicator">*</span>
          </label>
          <div className="form-input-wrapper">
            <input
              type="text"
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Enter user type as GUID"
              className={`form-input ${
                getFieldError("userType") ? "input-error" : ""
              }`}
              aria-invalid={!!getFieldError("userType")}
              aria-describedby={getFieldError("userType") ? "usertype-error" : undefined}
            />
            {getFieldError("userType") && (
              <span className="field-error" id="usertype-error">
                {getFieldError("userType")}
              </span>
            )}
          </div>
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            disabled={loading || !isFormValid()}
            className="submit-button"
            title={isEditMode ? "Save user changes" : "Create new user"}
          >
            {loading
              ? isEditMode
                ? "💾 Saving..."
                : "✨ Creating..."
              : isEditMode
              ? "💾 Save Changes"
              : "✨ Create User"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="cancel-button"
              title="Cancel form"
            >
              ✕ Cancel
            </button>
          )}
        </div>
      </form>

      {successMessage && (
        <div className="message-container">
          <p className="success-message">✓ {successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="message-container">
          <p className="error-message">⚠ {errorMessage}</p>
        </div>
      )}
    </div>
  );
}
