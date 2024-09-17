
import { ListType } from "@/src/modules/todo-list/types/ListType";
import { getCookie } from "@/src/utils/getCookies";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const deleteListPath = "/api/todo-list/delete";

export type DeleteListProps = {
  listIds: number[];
  userId: number;
};

export const deleteList = async ({
  listIds,
  userId,
}: DeleteListProps): Promise<ListType> => {
  const token = getCookie("auth_token");

  const response = await fetch(deleteListPath, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      listIds,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete list");
  }

  return response.json();
};

type UseDeleteListOptions = MutationOptions<ListType, Error, DeleteListProps>;

export const useDeleteList = (options?: UseDeleteListOptions) => {
  return useMutation<ListType, Error, DeleteListProps>({
    ...options,
    mutationFn: (data: DeleteListProps) => deleteList(data),
  });
};