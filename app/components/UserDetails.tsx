"use client";

import { useState, useEffect } from "react";
import { User } from "@/app/types/user";
import { deleteUser } from "@/app/services/userService";
import UserForm from "./UserForm";
import { formatDate } from "@/app/utils/formatting";

interface UserDetailsProps {
  user: User;
  onClose: () => void;
  onUpdate: () => void;
}

export default function UserDetails({
  user,
  onClose,
  onUpdate,
}: UserDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleDeleteClick = () => {
    setDeleteConfirm(true);
    setDeleteError("");
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteUser(user.id);
      onUpdate();
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete user";
      setDeleteError(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(false);
    setDeleteError("");
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    onUpdate();
  };

  if (isEditing) {
    return (
      <div className="details-container">
        <UserForm
          user={user}
          onSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div
      className="details-container"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-details-title"
    >
      <div className="details-header">
        <h2 className="details-title" id="user-details-title">👤 User Details</h2>
        <button
          onClick={onClose}
          className="close-button"
          aria-label="Close user details (press Esc)"
          title="Close (Esc)"
        >
          ✕
        </button>
      </div>

      <div className="details-card">
        <div className="card-section">
          <h3 className="card-section-title">{user.name}</h3>
          <div className="details-fields">
            <div className="detail-field">
              <span className="detail-label">ID:</span>
              <span className="detail-value" title={user.id} role="text">
                {user.id}
              </span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Email:</span>
              <span className="detail-value" role="text">{user.email}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">User Type:</span>
              <span className="detail-value" title={user.userType} role="text">
                {user.userType}
              </span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Created At:</span>
              <span className="detail-value" role="text">{formatDate(user.createdAt)}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Updated At:</span>
              <span className="detail-value" role="text">{formatDate(user.updatedAt)}</span>
            </div>
          </div>
        </div>

        {!deleteConfirm && (
          <div className="action-buttons">
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
              title="Edit this user"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="delete-button"
              title="Delete this user"
            >
              🗑️ Delete
            </button>
          </div>
        )}

        {deleteConfirm && (
          <div className="delete-confirm-section">
            <p className="delete-warning">
              ⚠️ Are you sure you want to delete <strong>{user.name}</strong>? This action cannot be undone.
            </p>
            {deleteError && (
              <div className="error-message-with-retry">
                <p className="error-message">{deleteError}</p>
              </div>
            )}
            <div className="confirm-buttons">
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="confirm-delete-button"
                title="Confirm deletion"
              >
                {isDeleting ? "🗑️ Deleting..." : "🗑️ Yes, Delete"}
              </button>
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="cancel-delete-button"
                title="Cancel deletion"
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
