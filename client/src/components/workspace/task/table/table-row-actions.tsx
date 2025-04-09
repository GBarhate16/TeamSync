// import { useState } from "react";
// import { Row } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ConfirmDialog } from "@/components/resuable/confirm-dialog";
// import { TaskType } from "@/types/api.type";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useWorkspaceId from "@/hooks/use-workspace-id";
// import { deleteTaskMutationFn } from "@/lib/api";
// import { toast } from "@/hooks/use-toast";

// interface DataTableRowActionsProps {
//   row: Row<TaskType>;
// }

// export function DataTableRowActions({ row }: DataTableRowActionsProps) {
//   const [openDeleteDialog, setOpenDialog] = useState(false);
//   const queryClient = useQueryClient();
//   const workspaceId = useWorkspaceId();

//   const { mutate, isPending } = useMutation({
//     mutationFn: deleteTaskMutationFn,
//   });

//   const taskId = row.original._id as string;
//   const taskCode = row.original.taskCode;

//   const handleConfirm = () => {
//     mutate(
//       {
//         workspaceId,
//         taskId,
//       },
//       {
//         onSuccess: (data) => {
//           queryClient.invalidateQueries({
//             queryKey: ["all-tasks", workspaceId],
//           });
//           toast({
//             title: "Success",
//             description: data.message,
//             variant: "success",
//           });
//           setTimeout(() => setOpenDialog(false), 100);
//         },
//         onError: (error) => {
//           toast({
//             title: "Error",
//             description: error.message,
//             variant: "destructive",
//           });
//         },
//       }
//     );
//   };

//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
//           >
//             <MoreHorizontal />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-[160px]">
//           <DropdownMenuItem className="cursor-pointer">
//             Edit Task
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             className={`!text-destructive cursor-pointer ${taskId}`}
//             onClick={() => setOpenDialog(true)}
//           >
//             Delete Task
//             <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <ConfirmDialog
//         isOpen={openDeleteDialog}
//         isLoading={isPending}
//         onClose={() => setOpenDialog(false)}
//         onConfirm={handleConfirm}
//         title="Delete Task"
//         description={`Are you sure you want to delete ${taskCode}`}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </>
//   );
// }

import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/resuable/confirm-dialog";
import { TaskType } from "@/types/api.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { deleteTaskMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import TaskEditForm from "../TaskEditForm"; // Import the TaskEditForm component

interface DataTableRowActionsProps {
  row: Row<TaskType>;
  role: "ADMIN" | "MEMBER"; // Pass the role as a prop
}

export function DataTableRowActions({ row, role }: DataTableRowActionsProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false); // State for edit dialog
  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTaskMutationFn,
  });

  const taskId = row.original._id as string;
  const taskCode = row.original.taskCode;

  const handleConfirmDelete = () => {
    mutate(
      { workspaceId, taskId },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["all-tasks", workspaceId],
          });
          toast({
            title: "Success",
            description: data.message,
            variant: "success",
          });
          setTimeout(() => setOpenDeleteDialog(false), 100);
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleEditSubmit = async (data: any) => {
    const endpoint = `/api/tasks/${taskId}/workspace/${workspaceId}/update-status`;
  
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.statusText}`);
      }
  
      const result = await response.json();
      toast({
        title: "Success",
        description: result.message,
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["all-tasks", workspaceId] });
      setOpenEditDialog(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenEditDialog(true)} // Open edit dialog
          >
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`!text-destructive cursor-pointer ${taskId}`}
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete Task
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={openDeleteDialog}
        isLoading={isPending}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        description={`Are you sure you want to delete ${taskCode}`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {openEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <TaskEditForm
              task={row.original}
              role={role} // Pass role to the form
              onSubmit={handleEditSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
}
