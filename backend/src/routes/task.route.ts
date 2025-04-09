// import { Router } from "express";
// import {
//   createTaskController,
//   deleteTaskController,
//   getAllTasksController,
//   getTaskByIdController,
//   updateTaskController,
// } from "../controllers/task.controller";

// const taskRoutes = Router();

// taskRoutes.post(
//   "/project/:projectId/workspace/:workspaceId/create",
//   createTaskController
// );

// taskRoutes.delete("/:id/workspace/:workspaceId/delete", deleteTaskController);

// taskRoutes.put(
//   "/:id/project/:projectId/workspace/:workspaceId/update",
//   updateTaskController
// );

// taskRoutes.get("/workspace/:workspaceId/all", getAllTasksController);

// taskRoutes.get(
//   "/:id/project/:projectId/workspace/:workspaceId",
//   getTaskByIdController
// );

// export default taskRoutes;



import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
  updateTaskStatusController, // Import this controller
} from "../controllers/task.controller";

const taskRoutes = Router();

// Route to create a task
taskRoutes.post(
  "/project/:projectId/workspace/:workspaceId/create",
  createTaskController
);

// Route to delete a task
taskRoutes.delete("/:id/workspace/:workspaceId/delete", deleteTaskController);

// Route to update all fields of a task (Admin only)
taskRoutes.put(
  "/:id/project/:projectId/workspace/:workspaceId/update",
  updateTaskController
);

// Route to update the status of a task (Member only)
taskRoutes.put("/:id/workspace/:workspaceId/update-status", updateTaskStatusController);

// Route to get all tasks in a workspace
taskRoutes.get("/workspace/:workspaceId/all", getAllTasksController);

// Route to get a single task by ID
taskRoutes.get(
  "/:id/project/:projectId/workspace/:workspaceId",
  getTaskByIdController
);

export default taskRoutes;