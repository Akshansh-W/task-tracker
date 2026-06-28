import { useEffect, useState } from "react";

const EMPTY_FORM = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

function toDateInputValue(dueDate) {
  if (!dueDate) return "";
  return new Date(dueDate).toISOString().slice(0, 10);
}

function TaskForm({ editingTask, onSubmit, onCancelEdit, submitting }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "pending",
        priority: editingTask.priority || "medium",
        dueDate: toDateInputValue(editingTask.dueDate),
      });
      setErrors({});
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) {
      next.title = "Title is required";
    } else if (form.title.trim().length > 100) {
      next.title = "Title cannot exceed 100 characters";
    }

    if (form.description.length > 500) {
      next.description = "Description cannot exceed 500 characters";
    }

    if (form.dueDate && isNaN(new Date(form.dueDate).getTime())) {
      next.dueDate = "Enter a valid date";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate || null,
    });

    if (!editingTask) {
      setForm(EMPTY_FORM);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit task" : "New task"}</h2>

      <div className={`field ${errors.title ? "field--error" : ""}`}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Prepare project report"
          maxLength={100}
        />
        {errors.title && <div className="field__error">{errors.title}</div>}
      </div>

      <div className={`field ${errors.description ? "field--error" : ""}`}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional details about this task"
          maxLength={500}
        />
        {errors.description && <div className="field__error">{errors.description}</div>}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className={`field ${errors.dueDate ? "field--error" : ""}`}>
        <label htmlFor="dueDate">Due date</label>
        <input id="dueDate" name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
        {errors.dueDate && <div className="field__error">{errors.dueDate}</div>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : editingTask ? "Save changes" : "Add task"}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit} disabled={submitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
