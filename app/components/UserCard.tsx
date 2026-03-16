"use client";

import { User } from "@/app/types/user";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="user-card">
      <div className="card-header">
        <h3 className="card-title">{user.name}</h3>
      </div>
      <div className="card-content">
        <div className="card-field">
          <span className="field-label">ID:</span>
          <span className="field-value">{user.id}</span>
        </div>
        <div className="card-field">
          <span className="field-label">Email:</span>
          <span className="field-value">{user.email}</span>
        </div>
        <div className="card-field">
          <span className="field-label">User Type:</span>
          <span className="field-value">{user.userType}</span>
        </div>
        <div className="card-field">
          <span className="field-label">Created At:</span>
          <span className="field-value">{formatDate(user.createdAt)}</span>
        </div>
        <div className="card-field">
          <span className="field-label">Updated At:</span>
          <span className="field-value">{formatDate(user.updatedAt)}</span>
        </div>
        {user.deletedAt && (
          <div className="card-field">
            <span className="field-label">Deleted At:</span>
            <span className="field-value">{formatDate(user.deletedAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
