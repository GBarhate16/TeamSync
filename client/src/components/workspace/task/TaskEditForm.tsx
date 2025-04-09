import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

// Define the props for TaskEditForm
interface TaskEditFormProps {
  task: any; // Replace `any` with the appropriate Task type
  role: "ADMIN" | "MEMBER";
  onSubmit: (data: any) => void;
}

const TaskEditForm = ({ task, role, onSubmit }: TaskEditFormProps) => {
  const schema =
    role === "ADMIN"
      ? z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          priority: z.string().optional(),
          status: z.string().optional(),
          assignedTo: z.string().optional(),
        })
      : z.object({
          status: z.string().min(1, "Status is required"),
        });

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: task,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {role === "ADMIN" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          {...register("status")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
      </div>

      <div className="text-right">
        <Button type="submit" className="bg-indigo-600 text-white">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default TaskEditForm;