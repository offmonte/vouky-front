"use client";

import { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserSearch from "./components/UserSearch";
import { USE_MOCK_DATA } from "./config/mock";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleUserCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setShowCreateForm(false);
  };

  const handleUserUpdated = () => {
    setRefreshKey((prev) => prev + 1);
    setSelectedUser(null);
  };

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setShowCreateForm(false);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  return (
    <main className="main-page" role="main">
      {USE_MOCK_DATA && (
        <div className="mock-banner" role="alert">
          <span className="mock-badge">MODO MOCK</span>
          <p className="mock-text">
            Você está utilizando dados pré-estabelecidos. Para usar a API real, altere USE_MOCK_DATA para false em <code>app/config/mock.ts</code>
          </p>
        </div>
      )}

      <div className="page-header">
        <h1 className="page-title">👥 Sistema de Gerenciamento de Usuários</h1>
        <p className="page-subtitle">
          Gerencie usuários com operações CRUD completas
        </p>
      </div>

      <div className="main-content">
        {/* Search Section: Above everything */}
        <div className="search-section">
          {!selectedUser && (
            <UserSearch onUserUpdated={handleUserUpdated} onUserSelected={handleSelectUser} />
          )}
        </div>

        {/* Top Section: List and Create */}
        <div className="top-section">
          <div className="users-list-wrapper">
            <UserList refreshKey={refreshKey} onSelectUser={handleSelectUser} />
          </div>

          <div className="sidebar-section">
            {selectedUser ? (
              <div className="details-sidebar">
                <UserSearch
                  onUserUpdated={handleUserUpdated}
                  onUserSelected={handleSelectUser}
                  selectedUser={selectedUser}
                  onCloseDetails={handleCloseDetails}
                />
              </div>
            ) : !showCreateForm ? (
              <div className="create-button-wrapper">
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="create-user-button"
                  title="Criar um novo usuário"
                >
                  ➕ Novo Usuário
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
      </div>
    </main>
  );
}
