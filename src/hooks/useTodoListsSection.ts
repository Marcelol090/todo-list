import { useMemo } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { useTodoList } from "@/src/modules/users/services/useUpdateList";
import { useParams } from "next/navigation";


export type useTodoListsSectionProps = {
  listName?: string;
  priority?: "Todas" | "Alta" | "Media" | "Baixa";
  finished?: "Todas" | "F" | "NF";
};


export function useTodoListsSection({
  finished,
  listName,
  priority,
}: useTodoListsSectionProps) {
  const { user } = useAuth();

  const { data: todoLists = [], isFetching } = useTodoList({
    userId: user?.userId as number,
    options: {
      enabled: !!user,
      select: (data) => {
        const filteredData = data.filter((list) => {
          // Filtrando por listName (se fornecido)
          const matchesListName = !listName || list.listName.toLowerCase().includes(listName.toLowerCase());

          // Filtrando por priority (se fornecido, mas ignorando "Todas")
          const matchesPriority =
            priority === "Todas" || list.priority === priority;

          // Filtrando por finished ("F" = true, "NF" = false, "Todas" ignora)
          const matchesFinished =
            finished === "Todas" ||
            (finished === "F" && list.finished === true) ||
            (finished === "NF" && list.finished === false);

          return matchesListName && matchesPriority && matchesFinished;
        });

        return filteredData.slice().reverse();
      },
    },
  });

  return { todoLists, isFetching };
}
