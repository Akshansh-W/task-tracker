const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { validateCreateTask, validateUpdateTask } = require("../middleware/validateTask");

router.route("/").get(getTasks).post(validateCreateTask, createTask);

router
  .route("/:id")
  .get(getTask)
  .put(validateUpdateTask, updateTask)
  .delete(deleteTask);

module.exports = router;
