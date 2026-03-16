"use client";

export function TableSkeleton() {
  return (
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
          {[...Array(3)].map((_, i) => (
            <tr key={i} className="skeleton-row">
              <td className="cell-name">
                <div className="skeleton skeleton-text" />
              </td>
              <td className="cell-email">
                <div className="skeleton skeleton-text" />
              </td>
              <td className="cell-usertype">
                <div className="skeleton skeleton-text" />
              </td>
              <td className="cell-date">
                <div className="skeleton skeleton-text" />
              </td>
              <td className="cell-actions">
                <div className="skeleton skeleton-button" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="form-container">
      <div className="skeleton skeleton-title" style={{ height: "1.875rem" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="form-group">
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-input" />
          </div>
        ))}
      </div>
      <div className="form-buttons">
        <div className="skeleton skeleton-button-large" />
        <div className="skeleton skeleton-button-large" />
      </div>
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="details-container">
      <div className="details-header">
        <div className="skeleton skeleton-title" style={{ height: "1.875rem", width: "40%" }} />
        <div className="skeleton skeleton-button" />
      </div>
      <div className="details-card">
        <div className="card-section">
          <div className="skeleton skeleton-title" style={{ height: "1.5rem", width: "50%" }} />
          <div className="details-fields">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="detail-field">
                <div className="skeleton skeleton-label" style={{ width: "100px" }} />
                <div className="skeleton skeleton-text" />
              </div>
            ))}
          </div>
        </div>
        <div className="action-buttons">
          <div className="skeleton skeleton-button-large" />
          <div className="skeleton skeleton-button-large" />
        </div>
      </div>
    </div>
  );
}
