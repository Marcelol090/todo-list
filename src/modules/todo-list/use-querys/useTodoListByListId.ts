import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { getCookie } from "@/src/utils/getCookies";
import { QueryFnOptions } from "@/src/lib/react.query";

export type TodoList = {
  listId: number;
  listName: string;
  priority: "Alta" | "Media" | "Baixa";
  listEmoji: string;
  userId: number;
  finished: boolean;
};

export const todoListPath = "/api/todo-list";

type FetchTodoListByListIdProps = {
  listId: number;
  userId: number;
};

export const fetchTodoListByListId = async ({
  listId,
  userId,
}: FetchTodoListByListIdProps): Promise<TodoList | null> => {
  const token = getCookie("auth_token");

  if (!token) {
    throw new Error("No auth token found in cookies");
  }

  const response = await fetch(`${todoListPath}/${listId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
    }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error("Failed to fetch todo list");
  }

  return response.json();
};

async function handleFetchTodoListByListId({
  listId,
  userId,
}: FetchTodoListByListIdProps) {
  try {
    const todoList = await fetchTodoListByListId({ listId, userId });

    return todoList;
  } catch (error) {
    console.error("Error fetching todo list", error);

    throw error;
  }
}

export type UseTodoListByListIdOptions<TData = TodoList | null> = {
  listId: number;
  userId: number;
  options?: QueryFnOptions<TodoList | null, TData>;
};

export const useTodoListByListIdKey = "todoListByListId";

export const useTodoListByListId = <TData = TodoList | null>({
  listId,
  userId,
  options = {},
}: UseTodoListByListIdOptions<TData>): UseQueryResult<TData, Error> => {
  const queryKey = `${useTodoListByListIdKey}${listId}`;

  const { enabled, ...restOptions } = options as UseQueryOptions<
    TodoList | null,
    Error,
    TData,
    QueryKey
  >;

  return useQuery<TodoList | null, Error, TData>({
    ...restOptions,
    queryKey: [queryKey],
    queryFn: () => handleFetchTodoListByListId({ listId, userId }),
    enabled,
  });
};