"use client";

import { useState, useEffect } from "react";
import { User, CreateUserRequest, UpdateUserRequest } from "@/app/types/user";
import { createUser, updateUser } from "@/app/services/userService";
import { FormSkeleton } from "./LoadingSkeleton";
import { validateEmail } from "@/app/utils/validation";
import { SUCCESS_MESSAGES } from "@/app/utils/constants";

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

  const getFieldError = (field: string) => {
    if (!touched[field]) return null;

    const value = formData[field as keyof typeof formData];
    if (!value) return "Este campo é obrigatório";
    if (field === "email" && !validateEmail(value as string))
      return "Digite um endereço de e-mail válido";
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
        setSuccessMessage(SUCCESS_MESSAGES.USER_UPDATED);
      } else {
        await createUser(formData as CreateUserRequest);
        setSuccessMessage(SUCCESS_MESSAGES.USER_CREATED);
        setFormData({ name: "", email: "", userType: "" });
      }
      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao salvar usuário";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" role="region" aria-label={isEditMode ? "Formulário de edição de usuário" : "Formulário de criação de usuário"}>
      <h2 className="form-title">
        {isEditMode ? "Editar Usuário" : "Criar Usuário"}
      </h2>
      <form onSubmit={handleSubmit} className="form-content" noValidate>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Nome <span className="required-indicator">*</span>
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
              placeholder="Digite o nome do usuário"
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
            E-mail <span className="required-indicator">*</span>
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
              placeholder="Digite o e-mail do usuário"
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
            Tipo de Usuário (GUID) <span className="required-indicator">*</span>
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
              placeholder="Digite o tipo de usuário como GUID"
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
            title={isEditMode ? "Salvar alterações do usuário" : "Criar novo usuário"}
          >
            {loading
              ? isEditMode
                ? "Salvando..."
                : "Criando..."
              : isEditMode
              ? "Salvar Alterações"
              : "Criar Usuário"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="cancel-button"
              title="Cancelar formulário"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {successMessage && (
        <div className="message-container">
          <p className="success-message">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="message-container">
          <p className="error-message">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
