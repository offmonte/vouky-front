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
        error instanceof Error ? error.message : "Failed to fetch user";
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
    <div className="search-container" role="region" aria-label="User search">
      <h2 className="search-title">🔍 Search User by ID</h2>
      <form onSubmit={handleSearch} className="search-form" noValidate>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter user ID (GUID)"
            className="search-input"
            aria-label="Search user by ID"
          />
          <button
            type="submit"
            disabled={loading || !searchId.trim()}
            className="search-button"
            aria-label={loading ? "Searching..." : "Search for user"}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="error-state">
          <p className="error-message">❌ {errorMessage}</p>
          <p className="error-hint">Try using a different ID or create a new user</p>
        </div>
      )}
    </div>
  );
}
