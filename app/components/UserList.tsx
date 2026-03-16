"use client";

import { useEffect, useState } from "react";
import { User } from "@/app/types/user";
import { getUsers } from "@/app/services/userService";

interface UserListProps {
  refreshKey: number;
  onSelectUser: (user: User) => void;
}

export default function UserList({ refreshKey, onSelectUser }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [refreshKey]);

  const fetchUsers = async () => {
    setLoading(true);
    setErrorMessage("");
    setUsers([]);

    try {
      const userList = await getUsers();
      setUsers(userList);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch users";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  if (loading && users.length === 0) {
    return (
      <div className="users-section">
        <div className="section-header">
          <h2 className="section-title">All Users</h2>
        </div>
        <p className="loading-text">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="users-section">
      <div className="section-header">
        <h2 className="section-title">All Users</h2>
        <button onClick={handleRefresh} className="refresh-button">
          Refresh
        </button>
      </div>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      {users.length === 0 ? (
        <p className="no-data-text">No users found</p>
      ) : (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="table-row">
                  <td className="cell-name">{user.name}</td>
                  <td className="cell-email">{user.email}</td>
                  <td className="cell-usertype">{user.userType}</td>
                  <td className="cell-date">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="cell-actions">
                    <button
                      onClick={() => onSelectUser(user)}
                      className="action-button"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
