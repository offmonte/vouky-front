"use client";

import { useState } from "react";
import UserForm from "./components/UserForm";
import UserSearch from "./components/UserSearch";
import { USE_MOCK_DATA } from "./config/mock";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserCreated = () => {
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
        <h1 className="page-title">User Management</h1>
        <p className="page-subtitle">
          Create new users and search for existing users
        </p>
      </div>

      <div className="content-grid">
        <section className="section">
          <UserForm onSuccess={handleUserCreated} />
        </section>

        <section className="section">
          <UserSearch key={refreshKey} />
        </section>
      </div>
    </main>
  );
}
