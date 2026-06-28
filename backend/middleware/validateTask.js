const VALID_STATUSES = ["pending", "in-progress", "completed"];
const VALID_PRIORITIES = ["low", "medium", "high"];

/**
 * Validates the request body when creating a new task.
 * Title is mandatory; everything else is optional but must be valid if present.
 */
const validateCreateTask = (req, res, next) => {
  const errors = {};
  const { title, description, status, priority, dueDate } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    errors.title = "Title is required";
  } else if (title.trim().length > 100) {
    errors.title = "Title cannot exceed 100 characters";
  }

  if (description && description.length > 500) {
    errors.description = "Description cannot exceed 500 characters";
  }

  if (status && !VALID_STATUSES.includes(status)) {
    errors.status = `Status must be one of: ${VALID_STATUSES.join(", ")}`;
  }

  if (priority && !VALID_PRIORITIES.includes(priority)) {
    errors.priority = `Priority must be one of: ${VALID_PRIORITIES.join(", ")}`;
  }

  if (dueDate && isNaN(new Date(dueDate).getTime())) {
    errors.dueDate = "Due date must be a valid date";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

/**
 * Validates the request body when updating a task.
 * All fields are optional, but if present they must be valid.
 */
const validateUpdateTask = (req, res, next) => {
  const errors = {};
  const { title, description, status, priority, dueDate } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      errors.title = "Title cannot be empty";
    } else if (title.trim().length > 100) {
      errors.title = "Title cannot exceed 100 characters";
    }
  }

  if (description !== undefined && description.length > 500) {
    errors.description = "Description cannot exceed 500 characters";
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.status = `Status must be one of: ${VALID_STATUSES.join(", ")}`;
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    errors.priority = `Priority must be one of: ${VALID_PRIORITIES.join(", ")}`;
  }

  if (dueDate !== undefined && dueDate !== null && isNaN(new Date(dueDate).getTime())) {
    errors.dueDate = "Due date must be a valid date";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

module.exports = { validateCreateTask, validateUpdateTask };
