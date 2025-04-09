// import { Request, Response } from "express";
// import { asyncHandler } from "../middlewares/asyncHandler.middleware";
// import {
//   createTaskSchema,
//   taskIdSchema,
//   updateTaskSchema,
// } from "../validation/task.validation";
// import { projectIdSchema } from "../validation/project.validation";
// import { workspaceIdSchema } from "../validation/workspace.validation";
// import { Permissions } from "../enums/role.enum";
// import { getMemberRoleInWorkspace } from "../services/member.service";
// import { roleGuard } from "../utils/roleGuard";
// import {
//   createTaskService,
//   deleteTaskService,
//   getAllTasksService,
//   getTaskByIdService,
//   updateTaskService,
// } from "../services/task.service";
// import { HTTPSTATUS } from "../config/http.config";
// import { updateTaskStatusSchema } from "../validation/task.validation";
// import { updateTaskStatusService } from "../services/task.service";


// export const createTaskController = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user?._id;

//     const body = createTaskSchema.parse(req.body);
//     const projectId = projectIdSchema.parse(req.params.projectId);
//     const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

//     const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
//     roleGuard(role, [Permissions.CREATE_TASK]);

//     const { task } = await createTaskService(
//       workspaceId,
//       projectId,
//       userId,
//       body
//     );

//     return res.status(HTTPSTATUS.OK).json({
//       message: "Task created successfully",
//       task,
//     });
//   }
// );

// // export const updateTaskController = asyncHandler(
// //   async (req: Request, res: Response) => {
// //     const userId = req.user?._id;

// //     const body = updateTaskSchema.parse(req.body);

// //     const taskId = taskIdSchema.parse(req.params.id);
// //     const projectId = projectIdSchema.parse(req.params.projectId);
// //     const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

// //     const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
// //     roleGuard(role, [Permissions.EDIT_TASK]);

// //     const { updatedTask } = await updateTaskService(
// //       workspaceId,
// //       projectId,
// //       taskId,
// //       body
// //     );

// //     return res.status(HTTPSTATUS.OK).json({
// //       message: "Task updated successfully",
// //       task: updatedTask,
// //     });
// //   }
// // );

// export const getAllTasksController = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user?._id;

//     const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

//     const filters = {
//       projectId: req.query.projectId as string | undefined,
//       status: req.query.status
//         ? (req.query.status as string)?.split(",")
//         : undefined,
//       priority: req.query.priority
//         ? (req.query.priority as string)?.split(",")
//         : undefined,
//       assignedTo: req.query.assignedTo
//         ? (req.query.assignedTo as string)?.split(",")
//         : undefined,
//       keyword: req.query.keyword as string | undefined,
//       dueDate: req.query.dueDate as string | undefined,
//     };

//     const pagination = {
//       pageSize: parseInt(req.query.pageSize as string) || 10,
//       pageNumber: parseInt(req.query.pageNumber as string) || 1,
//     };

//     const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
//     roleGuard(role, [Permissions.VIEW_ONLY]);

//     const result = await getAllTasksService(workspaceId, filters, pagination);

//     return res.status(HTTPSTATUS.OK).json({
//       message: "All tasks fetched successfully",
//       ...result,
//     });
//   }
// );

// export const getTaskByIdController = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user?._id;

//     const taskId = taskIdSchema.parse(req.params.id);
//     const projectId = projectIdSchema.parse(req.params.projectId);
//     const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

//     const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
//     roleGuard(role, [Permissions.VIEW_ONLY]);

//     const task = await getTaskByIdService(workspaceId, projectId, taskId);

//     return res.status(HTTPSTATUS.OK).json({
//       message: "Task fetched successfully",
//       task,
//     });
//   }
// );

// export const deleteTaskController = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user?._id;

//     const taskId = taskIdSchema.parse(req.params.id);
//     const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

//     const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
//     roleGuard(role, [Permissions.DELETE_TASK]);

//     await deleteTaskService(workspaceId, taskId);

//     return res.status(HTTPSTATUS.OK).json({
//       message: "Task deleted successfully",
//     });
//   }
// );


// // Admin updates all fields
// export const updateTaskController = asyncHandler(async (req: Request, res: Response) => {
//   const role = req.user?.role; // Ensure role is properly typed
//   if (!role) {
//     return res.status(403).json({ message: "Access denied: user role not found" });
//   }

//   roleGuard(role, [Permissions.ADMIN]); // Check for ADMIN role

//   const body = updateTaskSchema.parse(req.body);
//   const taskId = req.params.id;

//   const updatedTask = await updateTaskService(taskId, body);

//   return res.status(200).json({
//     message: "Task updated successfully",
//     task: updatedTask,
//   });
// });

// // Member updates only status
// export const updateTaskStatusController = asyncHandler(async (req: Request, res: Response) => {
//   const role = req.user?.role; // Ensure role is properly typed
//   if (!role) {
//     return res.status(403).json({ message: "Access denied: user role not found" });
//   }

//   roleGuard(role, [Permissions.MEMBER]); // Check for MEMBER role

//   const body = updateTaskStatusSchema.parse(req.body);
//   const taskId = req.params.id;

//   const updatedTask = await updateTaskStatusService(taskId, body);

//   return res.status(200).json({
//     message: "Task status updated successfully",
//     task: updatedTask,
//   });
// });


import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createTaskSchema,
  taskIdSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
} from "../validation/task.validation";
import { projectIdSchema } from "../validation/project.validation";
import { workspaceIdSchema } from "../validation/workspace.validation";
import { Permissions } from "../enums/role.enum";
import { getMemberRoleInWorkspace } from "../services/member.service";
import { roleGuard } from "../utils/roleGuard";
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
  updateTaskStatusService,
} from "../services/task.service";
import { HTTPSTATUS } from "../config/http.config";

// Controller: Create a task
export const createTaskController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const body = createTaskSchema.parse(req.body);
  const projectId = projectIdSchema.parse(req.params.projectId);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
  roleGuard(role, [Permissions.CREATE_TASK]);

  const { task } = await createTaskService(workspaceId, projectId, userId, body);

  return res.status(HTTPSTATUS.OK).json({
    message: "Task created successfully",
    task,
  });
});

// Controller: Admin updates all fields
export const updateTaskController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  const body: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    assignedTo?: string;
  } = updateTaskSchema.parse(req.body);

  const taskId = taskIdSchema.parse(req.params.id);

  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
  roleGuard(role, [Permissions.ADMIN]);

  const updatedTask = await updateTaskService(workspaceId, taskId, body);

  return res.status(HTTPSTATUS.OK).json({
    message: "Task updated successfully",
    task: updatedTask,
  });
});

// Member updates only status
export const updateTaskStatusController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  const body: { status: string } = updateTaskStatusSchema.parse(req.body);

  const taskId = taskIdSchema.parse(req.params.id);

  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
  roleGuard(role, [Permissions.MEMBER]);

  const updatedTask = await updateTaskStatusService(workspaceId, taskId, body);

  return res.status(HTTPSTATUS.OK).json({
    message: "Task status updated successfully",
    task: updatedTask,
  });
});

// Controller: Get all tasks
export const getAllTasksController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  const filters = {
    projectId: req.query.projectId as string | undefined,
    status: req.query.status ? (req.query.status as string).split(",") : undefined,
    priority: req.query.priority ? (req.query.priority as string).split(",") : undefined,
    assignedTo: req.query.assignedTo ? (req.query.assignedTo as string).split(",") : undefined,
    keyword: req.query.keyword as string | undefined,
    dueDate: req.query.dueDate as string | undefined,
  };

  const pagination = {
    pageSize: parseInt(req.query.pageSize as string) || 10,
    pageNumber: parseInt(req.query.pageNumber as string) || 1,
  };

  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
  roleGuard(role, [Permissions.VIEW_ONLY]);

  const result = await getAllTasksService(workspaceId, filters, pagination);

  return res.status(HTTPSTATUS.OK).json({
    message: "All tasks fetched successfully",
    ...result,
  });
});

// Controller: Get a task by ID
export const getTaskByIdController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const taskId = taskIdSchema.parse(req.params.id);
  const projectId = projectIdSchema.parse(req.params.projectId);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
  roleGuard(role, [Permissions.VIEW_ONLY]);

  const task = await getTaskByIdService(workspaceId, projectId, taskId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Task fetched successfully",
    task,
  });
});

// Controller: Delete a task
export const deleteTaskController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const taskId = taskIdSchema.parse(req.params.id);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
  roleGuard(role, [Permissions.DELETE_TASK]);

  await deleteTaskService(workspaceId, taskId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Task deleted successfully",
  });
});