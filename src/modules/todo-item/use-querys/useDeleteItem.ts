import { TodoItemType } from "@/src/modules/todo-item/types/TodoItemType";
import { getCookie } from "@/src/utils/getCookies";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const deleteItemPath = "/api/todo-item/delete";

export type DeleteItemProps = {
  itemIds: number[];
  userId: number;
};

export const deleteItem = async ({
  itemIds,
  userId,
}: DeleteItemProps): Promise<TodoItemType> => {
  const token = getCookie("auth_token");

  const response = await fetch(deleteItemPath, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      itemIds,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }

  return response.json();
};

type UseDeleteItemOptions = MutationOptions<
  TodoItemType,
  Error,
  DeleteItemProps
>;

export const useDeleteItem = (options?: UseDeleteItemOptions) => {
  return useMutation<TodoItemType, Error, DeleteItemProps>({
    ...options,
    mutationFn: (data: DeleteItemProps) => deleteItem(data),
  });
};