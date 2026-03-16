"use client";

import { useState } from "react";
import { User } from "@/app/types/user";
import { getUserById } from "@/app/services/userService";
import UserCard from "./UserCard";

export default function UserSearch() {
  const [searchId, setSearchId] = useState("");
  const [user, setUser] = useState<User | null>(null);
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
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Search User</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter user ID (GUID)"
            className="search-input"
          />
          <button
            type="submit"
            disabled={loading || !searchId.trim()}
            className="search-button"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      {user && (
        <div className="user-result">
          <UserCard user={user} />
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
