
import { TodoItemType } from "@/src/modules/todo-item/types/TodoItemType";
import { getCookie } from "@/src/utils/getCookies";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const deleteTodoItemPath = "/api/todo-item/delete";

export type DeleteTodoItemsProps = {
  itemId: number[];
  userId: number;
};

export const deleteTodoItems = async ({
  itemId,
  userId,
}: DeleteTodoItemsProps): Promise<TodoItemType[]> => {
  const token = getCookie("auth_token");

  const response = await fetch(deleteTodoItemPath, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      itemId,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo items");
  }

  return response.json();
};

type UseDeleteTodoItemsOptions = MutationOptions<TodoItemType[], Error, DeleteTodoItemsProps>;

export const useDeleteTodoItems = (options?: UseDeleteTodoItemsOptions) => {
  return useMutation<TodoItemType[], Error, DeleteTodoItemsProps>({
    ...options,
    mutationFn: (data: DeleteTodoItemsProps) => deleteTodoItems(data),
  });
};
