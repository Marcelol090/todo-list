import { ListType } from "@/src/modules/todo-list/types/ListType";
import { getCookie } from "@/src/utils/getCookies";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const createListPath = "/api/todo-list/create";

export type CreateListProps = {
  listName?: string;
  userId: number;
  listEmoji?: string;
  priority?: "Alta" | "Media" | "Baixa";
};

export const createList = async ({
  listName = "New List",
  userId,
  listEmoji = "🔥",
  priority = "Alta",
}: CreateListProps): Promise<ListType> => {
  const token = getCookie("auth_token");

  const response = await fetch(createListPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:  JSON.stringify({
      listName,
      userId,
      listEmoji,
      priority,
    },)
  });

  if (!response.ok) {
    throw new Error("Failed to create list");
  }

  return response.json();
};

type UseCreateListOptions = MutationOptions<ListType, Error, CreateListProps>;

export const useCreateList = (options?: UseCreateListOptions) => {
  return useMutation<ListType, Error, CreateListProps>({
    ...options,
    mutationFn: (data: CreateListProps) => createList(data),
  });
};
