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
        error instanceof Error ? error.message : "Falha ao buscar usuários";
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
        <h2 className="section-title">Todos os Usuários</h2>
        <button
          onClick={handleRefresh}
          className="refresh-button"
          disabled={loading}
          title="Atualizar lista de usuários"
        >
          {loading ? "Carregando..." : "Atualizar"}
        </button>
      </div>

      {errorMessage && (
        <div className="error-message-container">
          <p className="error-message">{errorMessage}</p>
          <button onClick={handleRefresh} className="retry-button">
            Tentar Novamente
          </button>
        </div>
      )}

      {loading && users.length === 0 ? (
        <TableSkeleton />
      ) : users.length === 0 ? (
        <p className="no-data-text">Nenhum usuário encontrado. Crie seu primeiro usuário para começar!</p>
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
                      title="Ordenar por nome"
                    >
                      Nome <SortIcon field="name" />
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleSort("email")}
                      className="sort-header"
                      title="Ordenar por e-mail"
                    >
                      E-mail <SortIcon field="email" />
                    </button>
                  </th>
                  <th>Tipo de Usuário</th>
                  <th>
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="sort-header"
                      title="Ordenar por data de criação"
                    >
                      Criado em <SortIcon field="createdAt" />
                    </button>
                  </th>
                  <th>Ações</th>
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
                        title="Ver detalhes do usuário"
                      >
                        Ver
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
                title="Primeira página"
              >
                «
              </button>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
                title="Página anterior"
              >
                ‹
              </button>

              <div className="pagination-info">
                Página <span className="current-page">{currentPage}</span> de {totalPages}
              </div>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
                title="Próxima página"
              >
                ›
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="pagination-button"
                title="Última página"
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
