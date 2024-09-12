import { useAuth } from "@/src/hooks/useAuth";
import { useTodoList } from "@/src/modules/todo-list/use-querys/useGetTodoList";


export function useTodoListsSection() {
  const { user } = useAuth();

  const { data: todoLists } = useTodoList({
    userId: user?.userId as number,
    options: {
      enabled: !!user,
    },
  });

  return { todoLists };
}