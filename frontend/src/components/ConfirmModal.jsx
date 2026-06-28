function ConfirmModal({ title, message, onConfirm, onCancel, confirming }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel} disabled={confirming}>
            Cancel
          </button>
          <button className="btn" style={{ backgroundColor: "#c43d3d", color: "#fff" }} onClick={onConfirm} disabled={confirming}>
            {confirming ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
