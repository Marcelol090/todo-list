"use client";

import { Button } from "@/src/components/Button/Button";
import CardList from "@/src/components/CardList/CardList";
import { ItemList } from "@/src/components/ItemList/ItemsList";
import ButtonMore from "@/src/components/Icons/ButtonMore";
import PlusCircle from "@/src/components/Icons/PlusCircle";
import Rectangle from "@/src/components/Icons/Rectangle";
import { TodoListsSection } from "@/src/components/TodoListSection/TodoListSection";
import { useCreateList } from "@/src/modules/todo-list/use-querys/useCreateList";
import { useAuth } from "@/src/hooks/useAuth";
import { AddNewListButton } from "@/src/components/AddNewListButton/AddNewListButton";

export default function TodoListsPage() {
  const userData = useAuth();
  const userId = userData?.user?.userId;
  const mutation = useCreateList({
    onError: (error) => {
      console.error(error);
    },
  });
  return (
    <main className="flex h-full flex-1 flex-col">
      <header className="flex justify-between border-b-2 border-[#54353ECC] pb-4">
        <h1 className="font-poppins text-2xl font-bold text-[#FEEDE1]">
          TO DO | YOUR LISTS
        </h1>
        <AddNewListButton />
      </header>
      <TodoListsSection />
    </main>
  );
}
