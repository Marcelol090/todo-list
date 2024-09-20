import { TodoItemType } from "@/src/modules/todo-item/types/TodoItemType";
import { getCookie } from "@/src/utils/getCookies";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const createTodoItemPath = "/api/todo-item/create";

export type CreateTodoItemProps = {
  listId: number;
  userId: number;
};

export const createTodoItem = async ({
  listId,
  userId,
}: CreateTodoItemProps): Promise<TodoItemType> => {
  const token = getCookie("auth_token");

  const response = await fetch(createTodoItemPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      listId,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo item");
  }

  return response.json();
};

type UseCreateTodoItemOptions = MutationOptions<
  TodoItemType,
  Error,
  CreateTodoItemProps
>;

export const useCreateTodoItem = (options?: UseCreateTodoItemOptions) => {
  return useMutation<TodoItemType, Error, CreateTodoItemProps>({
    ...options,
    mutationFn: (data: CreateTodoItemProps) => createTodoItem(data),
  });
};