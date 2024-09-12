"use client";

import CardList from "@/src/components/CardList/CardList";
import { useTodoListsSection } from "@/src/hooks/useTodoListsSection";
import Rectangle from "@/src/components/Icons/Rectangle";

export const TodoListsSection = () => {
  const { todoLists } = useTodoListsSection();

  return (
    <>
      {todoLists && todoLists.length > 0 ? (
        <section className="relative flex w-full flex-1 flex-col items-center justify-center">
          {todoLists.map((todoList) => (
            <CardList
              key={`${todoList.listName}${todoList.listId}`}
              listName={todoList.listName}
              finished={todoList.finished}
              priority={todoList.priority}
              listEmoji={todoList.listEmoji}
              listId={todoList.listId}
              userId={todoList.userId}
            />
          ))}
        </section>
      ) : (
        <section className="relative flex w-full flex-1 items-center justify-center">
          <h1 className="font-poppins absolute text-center text-6xl font-bold text-[#FEEDE1] md:text-8xl lg:text-9xl">
            TO-DO LIST
          </h1>
          <Rectangle />
        </section>
      )}
    </>
  );
};