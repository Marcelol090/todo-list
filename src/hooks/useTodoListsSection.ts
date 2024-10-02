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
        // Providing default values if the parameters are null
        const listNameParamNormalized = listNameParam ?? "";
        const priorityParamNormalized = priorityParam ?? "Todas";
        const finishedParamNormalized = finishedParam ?? "Todas";
  
        const filteredData = data.filter((list) => {
          // Filtrando por listName (se fornecido)
          const matchesListName = !listNameParamNormalized || list.listName.toLowerCase().includes(listNameParamNormalized.toLowerCase());
  
          // Filtrando por priority (se fornecido, mas ignorando "Todas")
          const matchesPriority =
            priorityParamNormalized === "Todas" || list.priority === priorityParamNormalized;
  
          // Filtrando por finished ("F" = true, "NF" = false, "Todas" ignora)
          const matchesFinished =
            finishedParamNormalized === "Todas" ||
            (finishedParamNormalized === "F" && list.finished === true) ||
            (finishedParamNormalized === "NF" && list.finished === false);
  
          return matchesListName && matchesPriority && matchesFinished;
        });
  
        return filteredData.slice().reverse();
      },
    },
  });
  

  return { todoLists, isFetching };
}
