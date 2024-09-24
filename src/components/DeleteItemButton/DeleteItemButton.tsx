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
import { useDeleteItem } from "@/src/modules/todo-item/use-querys/useDeleteTodoItems";
import { useTodoItemsKey } from "@/src/modules/todo-item/use-querys/useGetTodoItem";

import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

export type DeleteItemButtonProps = {
  itemId: number;
  itemName: string;
  listId: number;
  userId: number;
};

export const DeleteItemButton = ({
  itemId,
  itemName,
  listId,
  userId,
}: DeleteItemButtonProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteItem({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${useTodoItemsKey}${listId}`],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({
      itemIds: [itemId],
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
            Are you sure you want to delete the todo item?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. It will permanently delete your todo
            item "<b>{itemName}</b>".
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
                "border-primary-500 text-primary-500 hover:bg-primary-50 hover:text-primary-600 focus:ring-primary-300 border px-4 py-2.5 text-sm focus:ring-4 focus:ring-opacity-50"
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