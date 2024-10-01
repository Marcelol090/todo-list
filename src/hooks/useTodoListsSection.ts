import { useMemo } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { useTodoList } from "@/src/modules/users/services/useUpdateList";
import { useParams, useSearchParams } from "next/navigation";


export type useTodoListsSectionProps = {
  listName?: string;
  priority?: "Todas" | "Alta" | "Media" | "Baixa";
  finished?: "Todas" | "F" | "NF";
};


export function useTodoListsSection({
  
}: useTodoListsSectionProps) {
  const { user } = useAuth();
  const searchParams = useSearchParams();

  // Acesse diretamente os parâmetros da URL como propriedades
  const listNameParam = searchParams.get("listName");
  const priorityParam = searchParams.get("priority");
  const finishedParam = searchParams.get("finished");
  const { data: todoLists = [], isFetching } = useTodoList({
    userId: user?.userId as number,
    options: {
      enabled: !!user,
      select: (data) => {
        const filteredData = data.filter((list) => {
          // Filtrando por listName (se fornecido)
          const matchesListName = !listNameParam || list.listName.toLowerCase().includes(listNameParam.toLowerCase());

          // Filtrando por priority (se fornecido, mas ignorando "Todas")
          const matchesPriority =
            priorityParam === "Todas" || list.priority === priorityParam;

          // Filtrando por finished ("F" = true, "NF" = false, "Todas" ignora)
          const matchesFinished =
            finishedParam === "Todas" ||
            (finishedParam === "F" && list.finished === true) ||
            (finishedParam === "NF" && list.finished === false);

          return matchesListName && matchesPriority && matchesFinished;
        });

        return filteredData.slice().reverse();
      },
    },
  });

  return { todoLists, isFetching };
}
