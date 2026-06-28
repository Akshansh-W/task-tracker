import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import FilterBar from "../components/FilterBar.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api.js";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [taskPendingDelete, setTaskPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadTasks = async (status) => {
    setLoading(true);
    setError("");
    try {
      const data = await getTasks(status);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong while fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleCreateOrUpdate = async (formData) => {
    setSubmitting(true);
    setError("");
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask._id, formData);
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
        setEditingTask(null);
      } else {
        const created = await createTask(formData);
        // Only show it immediately if it matches the active filter
        if (filter === "all" || filter === created.status) {
          setTasks((prev) => [created, ...prev]);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      const updated = await updateTask(task._id, { status: newStatus });
      if (filter !== "all" && filter !== updated.status) {
        setTasks((prev) => prev.filter((t) => t._id !== updated._id));
      } else {
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not update the task status.");
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!taskPendingDelete) return;
    setDeleting(true);
    try {
      await deleteTask(taskPendingDelete._id);
      setTasks((prev) => prev.filter((t) => t._id !== taskPendingDelete._id));
      setTaskPendingDelete(null);
      if (editingTask && editingTask._id === taskPendingDelete._id) {
        setEditingTask(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete the task.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="main">
      <div className="page-header">
        <h1>Your tasks</h1>
        <p>Create, track, and manage everything you need to get done.</p>
      </div>

      {error && <div className="alert">{error}</div>}

      <div className="layout">
        <TaskForm
          editingTask={editingTask}
          onSubmit={handleCreateOrUpdate}
          onCancelEdit={() => setEditingTask(null)}
          submitting={submitting}
        />

        <div>
          <FilterBar activeFilter={filter} onChange={setFilter} />
          <TaskList
            tasks={tasks}
            loading={loading}
            error={null}
            onEdit={setEditingTask}
            onDeleteRequest={setTaskPendingDelete}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>

      {taskPendingDelete && (
        <ConfirmModal
          title="Delete this task?"
          message={`"${taskPendingDelete.title}" will be permanently removed.`}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setTaskPendingDelete(null)}
          confirming={deleting}
        />
      )}
    </main>
  );
}

export default Home;
