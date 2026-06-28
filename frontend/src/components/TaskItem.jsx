const STATUS_DOT_COLOR = {
  pending: "#b8860b",
  "in-progress": "#2356c9",
  completed: "#1f9d55",
};

function formatDueDate(dueDate) {
  if (!dueDate) return null;
  const date = new Date(dueDate);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function TaskItem({ task, onEdit, onDeleteRequest, onStatusChange }) {
  return (
    <div className="task-card">
      <span
        className="task-card__status-dot"
        style={{ backgroundColor: STATUS_DOT_COLOR[task.status] }}
        aria-hidden="true"
      />

      <div className="task-card__body">
        <p className={`task-card__title ${task.status === "completed" ? "is-completed" : ""}`}>
          {task.title}
        </p>

        {task.description && <p className="task-card__description">{task.description}</p>}

        <div className="task-card__meta">
          <select
            className="status-select"
            value={task.status}
            onChange={(e) => onStatusChange(task, e.target.value)}
            aria-label="Update status"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>

          <span className={`badge badge--priority-${task.priority}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} priority
          </span>

          {task.dueDate && <span className="task-card__due">Due {formatDueDate(task.dueDate)}</span>}
        </div>
      </div>

      <div className="task-card__actions">
        <button className="btn-icon" onClick={() => onEdit(task)} aria-label="Edit task" title="Edit">
          ✎
        </button>
        <button
          className="btn-icon btn-icon--danger"
          onClick={() => onDeleteRequest(task)}
          aria-label="Delete task"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
