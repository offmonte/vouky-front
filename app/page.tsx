"use client";

import { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserSearch from "./components/UserSearch";
import { USE_MOCK_DATA } from "./config/mock";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleUserCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setShowCreateForm(false);
  };

  const handleUserUpdated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="main-page">
      {USE_MOCK_DATA && (
        <div className="mock-banner">
          <span className="mock-badge">MODO MOCK</span>
          <p className="mock-text">
            Você está utilizando dados pré-estabelecidos. Para usar a API real, altere USE_MOCK_DATA para false em <code>app/config/mock.ts</code>
          </p>
        </div>
      )}

      <div className="page-header">
        <h1 className="page-title">User Management System</h1>
        <p className="page-subtitle">
          Manage users with complete CRUD operations
        </p>
      </div>

      <div className="main-content">
        {/* Top Section: List and Create */}
        <div className="top-section">
          <div className="users-list-wrapper">
            <UserList refreshKey={refreshKey} onSelectUser={() => {}} />
          </div>

          <div className="sidebar-section">
            {!showCreateForm ? (
              <div className="create-button-wrapper">
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="create-user-button"
                >
                  + New User
                </button>
              </div>
            ) : (
              <div className="form-wrapper">
                <UserForm
                  onSuccess={handleUserCreated}
                  onCancel={() => setShowCreateForm(false)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Search */}
        <div className="bottom-section">
          <UserSearch onUserUpdated={handleUserUpdated} />
        </div>
      </div>
    </main>
  );
}
