"use client";

import { cn } from "@/lib/utils";
import { AddNewItemButton } from "@/src/components/AddNewItemButton/AddNewItemButton";
import { Button } from "@/src/components/Button/Button";
import { ItemsList } from "@/src/components/ItemList/ItemsList";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { useAuth } from "@/src/hooks/useAuth";

import {
  useTodoListByListId,
  useTodoListByListIdKey,
} from "@/src/modules/todo-list/use-querys/useTodoListByListId";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTodoItems } from "@/src/modules/todo-item/use-querys/useGetTodoItem";
import { useDeleteList } from "@/src/modules/todo-list/use-querys/useDeleteList";
import EmptyToDoListSVG from "@/src/components/Icons/EmptyToDoListSVG";
import { FilterItems } from "@/src/components/FilterItems.tsx/FilterItems";

export default function Todo() {
  const { listId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemNameParam = searchParams.get("itemName");
  const priorityParam = searchParams.get("priority");
  const finishedParam = searchParams.get("finished");

  const { data: todoItems } = useTodoItems({
    listId: Number(listId),
    userId: user?.userId as number,
    options: {
      enabled: !!user,

      select: (data) => {
        const filteredData = data.filter((item) => {
          // Filtrando por listName (se fornecido)
          const matchesItemName =
            !itemNameParam ||
            item.itemName.toLowerCase().includes(itemNameParam.toLowerCase());

          // Filtrando por priority (se fornecido, mas ignorando "Todas")
          const matchesPriority =
            priorityParam === "Todas" || item.priority === priorityParam;

          // Filtrando por finished ("F" = true, "NF" = false, "Todas" ignora)
          const matchesFinished =
            finishedParam === "Todas" ||
            (finishedParam === "F" && item.finished === true) ||
            (finishedParam === "NF" && item.finished === false);

          return matchesItemName && matchesPriority && matchesFinished;
        });

        return filteredData
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
      },
    },
  });

  const { data: todoList, isLoading: isLoadingTodoList } = useTodoListByListId({
    listId: Number(listId),
    userId: user?.userId as number,
    options: {
      enabled: !!user && !!listId,
    },
  });

  const mutation = useDeleteList({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${useTodoListByListIdKey}${listId}`],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (!todoList) {
    return (
      <main className="flex h-full flex-1 flex-col">
        <header className="flex items-center justify-between border-b-2 border-[#54353ECC] pb-4">
          <h1 className="font-poppins flex max-w-xs items-center gap-6 text-lg font-bold text-[#FEEDE1]">
            <Link href="#" onClick={() => history.back()} className="w-max">
              <ArrowLeftIcon />
            </Link>
            <span className="max-w-full truncate">
              <b>List not found</b>
            </span>
          </h1>
        </header>
        <section className="relative flex w-full flex-1 flex-col items-center justify-center">
          {isLoadingTodoList ? (
            <h2 className="text-2xl text-[#FEEDE1]">
              <b>Loading...</b>
            </h2>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-[#FEEDE1]">
              <h2 className="text-2xl">
                <b>List not found</b>
              </h2>
              <Link href="/todo-lists" className="w-max underline">
                Click here to back to lists page
              </Link>
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="flex h-full flex-1 flex-col">
      <header className="flex flex-col gap-2 items-start justify-between border-b-2 border-[#54353ECC] pb-4 md:flex-row md:items-center">
        <h1 className="font-poppins flex max-w-xs items-center gap-6 text-lg font-bold text-[#FEEDE1]">
          <Link href="#" onClick={() => history.back()} className="w-max">
            <ArrowLeftIcon />
          </Link>
          <span className="max-w-full truncate">
            {todoList.listEmoji} <b>{todoList.listName}</b>
          </span>
        </h1>
        <div className="flex w-full justify-between gap-6 md:w-auto md:justify-normal">
          <Dialog>
            <DialogTrigger>
              <Button className="flex h-6 items-center gap-4 text-[#F25551] hover:text-[#a73a38]">
                <Trash2 />
                Delete List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete the todolist?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. It will permanently delete your
                  todo list "{todoList.listEmoji} <b>{todoList.listName}</b>".
                  After deleting you will be redirected to the list page
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <button
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-md transition duration-150 ease-in-out",
                      "hover:bg-primary-600 focus:ring-primary-300 bg-red-400 px-4 py-2.5 text-sm text-black focus:ring-4 focus:ring-opacity-50"
                    )}
                    onClick={() => {
                      mutation.mutate({
                        listIds: [Number(listId)],
                        userId: user?.userId as number,
                      });
                      router.push("/home");
                    }}
                  >
                    Delete
                  </button>
                </DialogClose>
                <DialogClose asChild>
                  <button
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-md transition duration-150 ease-in-out",
                      "border-primary-500 text-primary-500 hover:bg-primary-50 text-black hover:text-primary-600 focus:ring-primary-300 border px-4 py-2.5 text-sm focus:ring-4 focus:ring-opacity-50"
                    )}
                  >
                    Cancel
                  </button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AddNewItemButton listId={Number(listId)} />
        </div>
      </header>
      <FilterItems />
      {todoItems?.length ? (
        <section className="relative flex w-full flex-1 flex-col items-center justify-center">
          {todoItems.map((item) => (
            <ItemsList key={item.itemId} {...item} />
          ))}
        </section>
      ) : (
        <section className="relative flex w-full flex-1 items-center justify-center">
          <EmptyToDoListSVG />
        </section>
      )}
    </main>
  );
}
