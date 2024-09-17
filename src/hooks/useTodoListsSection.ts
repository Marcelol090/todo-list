import { useAuth } from "@/src/hooks/useAuth";
import { useTodoList } from "@/src/modules/todo-list/use-querys/useGetTodoList";


export function useTodoListsSection() {
  const { user } = useAuth();

  const { data: todoLists = [], isFetching } = useTodoList({
    userId: user?.userId as number,
    options: {
      enabled: !!user,
      select: (data) => data.slice().reverse(),
    },
  });

  return { todoLists, isFetching };
}