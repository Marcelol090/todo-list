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
  
  type FetchTodoListProps = {
    userId: number;
  };
  
  export const fetchTodoList = async ({
    userId,
  }: FetchTodoListProps): Promise<TodoList[]> => {
    const token = getCookie("auth_token");
  
    if (!token) {
      throw new Error("No auth token found in cookies");
    }
  
    const response = await fetch(todoListPath, {
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
      throw new Error("Failed to fetch todo list");
    }
  
    return response.json();
  };
  
  async function handleFetchTodoList({ userId }: FetchTodoListProps) {
    try {
      const todoLists = await fetchTodoList({ userId });
  
      return todoLists;
    } catch (error) {
      console.error("Error fetching todo list", error);
  
      throw error;
    }
  }
  
  export type UseTodoListOptions<TData = TodoList[]> = {
    userId: number;
    options?: QueryFnOptions<TodoList[], TData>;
  };
  
  export const useTodoListKey = "todoList";
  
  export const useTodoList = <TData = TodoList[]>({
    userId,
    options = {},
  }: UseTodoListOptions<TData>): UseQueryResult<TData, Error> => {
    const queryKey = `${useTodoListKey}${userId}`;
  
    const { enabled, ...restOptions } = options as UseQueryOptions<
      TodoList[],
      Error,
      TData,
      QueryKey
    >;
  
    return useQuery<TodoList[], Error, TData>({
      ...restOptions,
      queryKey: [queryKey],
      queryFn: () => handleFetchTodoList({ userId }),
      enabled,
    });
  };