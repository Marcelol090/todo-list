
import { ListType } from "@/src/modules/todo-list/types/ListType";
import { getCookie } from "@/src/utils/getCookies";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const updateListPath = "/api/todo-list/update";

export type UpdateListProps = {
  listId: number;
  userId: number;
  listName?: string;
  finished?: boolean;
  listEmoji?: string;
  priority?: "Alta" | "Media" | "Baixa";
};

export const updateList = async ({
  listId,
  userId,
  finished,
  listEmoji,
  listName,
  priority,
}: UpdateListProps): Promise<ListType> => {
  const token = getCookie("auth_token");

  const response = await fetch(updateListPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      listId,
      userId,
      finished,
      listEmoji,
      listName,
      priority,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update list");
  }

  return response.json();
};

type UseUpdateListOptions = MutationOptions<ListType, Error, UpdateListProps>;

export const useUpdateList = (options?: UseUpdateListOptions) => {
  return useMutation<ListType, Error, UpdateListProps>({
    ...options,
    mutationFn: (data: UpdateListProps) => updateList(data),
  });
};