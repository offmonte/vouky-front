"use client";

import { useEffect, useState } from "react";
import { User } from "@/app/types/user";
import { getUsers } from "@/app/services/userService";
import { TableSkeleton } from "./LoadingSkeleton";
import { ITEMS_PER_PAGE } from "@/app/utils/constants";
import { formatDate } from "@/app/utils/formatting";

interface UserListProps {
  refreshKey: number;
  onSelectUser: (user: User) => void;
}

type SortField = "name" | "email" | "createdAt";
type SortOrder = "asc" | "desc";

export default function UserList({ refreshKey, onSelectUser }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1);
    fetchUsers();
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const getSortedUsers = () => {
    const sorted = [...users].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "createdAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        aValue = (aValue as string).toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return sorted;
  };

  const sortedUsers = getSortedUsers();
  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="sort-icon">⇅</span>;
    return <span className={`sort-icon ${sortOrder}`}>{sortOrder === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className="users-section">
      <div className="section-header">
        <h2 className="section-title">📋 All Users</h2>
        <button
          onClick={handleRefresh}
          className="refresh-button"
          disabled={loading}
          title="Refresh user list"
        >
          {loading ? "⏳ Loading..." : "🔄 Refresh"}
        </button>
      </div>

      {errorMessage && (
        <div className="error-message-container">
          <p className="error-message">{errorMessage}</p>
          <button onClick={handleRefresh} className="retry-button">
            Retry
          </button>
        </div>
      )}

      {loading && users.length === 0 ? (
        <TableSkeleton />
      ) : users.length === 0 ? (
        <p className="no-data-text">📭 No users found. Create your first user to get started!</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>
                    <button
                      onClick={() => handleSort("name")}
                      className="sort-header"
                      title="Sort by name"
                    >
                      Name <SortIcon field="name" />
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleSort("email")}
                      className="sort-header"
                      title="Sort by email"
                    >
                      Email <SortIcon field="email" />
                    </button>
                  </th>
                  <th>User Type</th>
                  <th>
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="sort-header"
                      title="Sort by created date"
                    >
                      Created At <SortIcon field="createdAt" />
                    </button>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="table-row">
                    <td className="cell-name">{user.name}</td>
                    <td className="cell-email">{user.email}</td>
                    <td className="cell-usertype">{user.userType}</td>
                    <td className="cell-date">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="cell-actions">
                      <button
                        onClick={() => onSelectUser(user)}
                        className="action-button"
                        title="View user details"
                      >
                        👁️ View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="pagination-button"
                title="First page"
              >
                «
              </button>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
                title="Previous page"
              >
                ‹
              </button>

              <div className="pagination-info">
                Page <span className="current-page">{currentPage}</span> of {totalPages}
              </div>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
                title="Next page"
              >
                ›
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="pagination-button"
                title="Last page"
              >
                »
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
