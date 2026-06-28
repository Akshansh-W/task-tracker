import Loader from "./Loader.jsx";
import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, loading, error, onEdit, onDeleteRequest, onStatusChange }) {
  if (loading) {
    return <Loader label="Loading tasks..." />;
  }

  if (error) {
    return (
      <div className="state-box">
        <strong>Could not load tasks</strong>
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="state-box">
        <strong>No tasks here yet</strong>
        Add a task using the form to get started.
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDeleteRequest={onDeleteRequest}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;
