"use client";

import { useState } from "react";
import { User } from "@/app/types/user";
import { getUserById } from "@/app/services/userService";
import UserDetails from "./UserDetails";

interface UserSearchProps {
  onUserUpdated: () => void;
  onUserSelected?: (user: User) => void;
  selectedUser?: User | null;
  onCloseDetails?: () => void;
}

export default function UserSearch({
  onUserUpdated,
  onUserSelected,
  selectedUser,
  onCloseDetails
}: UserSearchProps) {
  const [searchId, setSearchId] = useState("");
  const [user, setUser] = useState<User | null>(selectedUser || null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setUser(null);

    try {
      const foundUser = await getUserById(searchId);
      setUser(foundUser);
      if (onUserSelected) {
        onUserSelected(foundUser);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao buscar usuário";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchId("");
    setUser(null);
    setErrorMessage("");
    if (onCloseDetails) {
      onCloseDetails();
    }
  };

  const handleUserUpdated = () => {
    handleClear();
    onUserUpdated();
  };

  if (user || selectedUser) {
    return (
      <UserDetails
        user={user || selectedUser!}
        onClose={handleClear}
        onUpdate={handleUserUpdated}
      />
    );
  }

  return (
    <div className="search-container" role="region" aria-label="Busca de usuário">
      <h2 className="search-title">🔍 Buscar Usuário por ID</h2>
      <form onSubmit={handleSearch} className="search-form" noValidate>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Digite o ID do usuário (GUID)"
            className="search-input"
            aria-label="Buscar usuário por ID"
          />
          <button
            type="submit"
            disabled={loading || !searchId.trim()}
            className="search-button"
            aria-label={loading ? "Buscando..." : "Buscar usuário"}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="error-state">
          <p className="error-message">❌ {errorMessage}</p>
          <p className="error-hint">Tente usar um ID diferente ou crie um novo usuário</p>
        </div>
      )}
    </div>
  );
}
