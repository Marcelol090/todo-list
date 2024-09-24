import { AddNewListButton } from "@/src/components/AddNewListButton/AddNewListButton";
import { TodoListsSection } from "@/src/components/TodoListSection/TodoListSection";


export default function TodoListsPage() {
  return (
    <main className="flex h-full flex-1 flex-col">
      <header className="flex flex-col justify-between gap-2 border-b-2 border-[#54353ECC] pb-4 md:flex-row">
        <h1 className="font-poppins text-2xl font-bold text-[#FEEDE1]">
          TO DO | YOUR LISTS
        </h1>
        <AddNewListButton />
      </header>
      <TodoListsSection />
    </main>
  );
}