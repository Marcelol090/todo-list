import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { useDeleteList } from "@/src/modules/todo-list/use-querys/useDeleteList";
import { useTodoListKey } from "@/src/modules/users/services/useUpdateList";


import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

export type DeleteListButtonProps = {
  listId: number;
  listName: string;
  listEmoji: string;
  userId: number;
};

export const DeleteListButton = ({
  listId,
  listName,
  listEmoji,
  userId,
}: DeleteListButtonProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteList({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${useTodoListKey}${userId}`],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({
      listIds: [listId],
      userId: userId,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <span className="text-[#FFFBFF] hover:text-[#FEEDE1]">
          <Trash2 />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete the todolist?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. It will permanently delete your todo
            list "{listEmoji} <b>{listName}</b>".
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-md transition duration-150 ease-in-out",
                "hover:bg-primary-600 focus:ring-primary-300 bg-red-400 px-4 py-2.5 text-sm text-black focus:ring-4 focus:ring-opacity-50"
              )}
              onClick={handleDelete}
            >
              Delete
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-md transition duration-150 ease-in-out",
                "border-primary-500 text-primary-500 hover:bg-primary-50 text-black hover:text-primary-600 focus:ring-primary-300 border px-4 py-2.5 text-sm focus:ring-4 focus:ring-opacity-50"
              )}
            >
              Cancel
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};