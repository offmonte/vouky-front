"use client";

import { useState } from "react";
import { User } from "@/app/types/user";
import { deleteUser } from "@/app/services/userService";
import UserForm from "./UserForm";

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
    <div className="details-container">
      <div className="details-header">
        <h2 className="details-title">User Details</h2>
        <button onClick={onClose} className="close-button">
          ✕
        </button>
      </div>

      <div className="details-card">
        <div className="card-section">
          <h3 className="card-section-title">{user.name}</h3>
          <div className="details-fields">
            <div className="detail-field">
              <span className="detail-label">ID:</span>
              <span className="detail-value" title={user.id}>
                {user.id}
              </span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user.email}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">User Type:</span>
              <span className="detail-value" title={user.userType}>
                {user.userType}
              </span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Created At:</span>
              <span className="detail-value">{formatDate(user.createdAt)}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Updated At:</span>
              <span className="detail-value">{formatDate(user.updatedAt)}</span>
            </div>
          </div>
        </div>

        {!deleteConfirm && (
          <div className="action-buttons">
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        )}

        {deleteConfirm && (
          <div className="delete-confirm-section">
            <p className="delete-warning">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            {deleteError && (
              <p className="error-message">{deleteError}</p>
            )}
            <div className="confirm-buttons">
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="confirm-delete-button"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="cancel-delete-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
