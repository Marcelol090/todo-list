"use client";

import { Button } from "@/src/components/Button/Button";
import { useAuth } from "@/src/hooks/useAuth";
import { useCreateTodoItem } from "@/src/modules/todo-item/use-querys/useCreateTodoItem";
import { useTodoItemsKey } from "@/src/modules/todo-item/use-querys/useGetTodoItem";

import { useQueryClient } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";

export type AddNewItemButton = {
  listId: number;
};

export const AddNewItemButton = ({ listId }: AddNewItemButton) => {
  const queryClient = useQueryClient();
  const userData = useAuth();

  const mutation = useCreateTodoItem({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${useTodoItemsKey}${listId}`],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleClick = () => {
    if (userData.user && userData.user.userId) {
      mutation.mutate({
        userId: userData.user.userId,
        listId,
      });
    } else {
      console.error("User not found");
    }
  };

  return (
    <Button
      className="flex h-6 gap-4 text-[#F25551] hover:text-[#a73a38]"
      onClick={handleClick}
    >
      <CirclePlus />
      Add new item
    </Button>
  );
};