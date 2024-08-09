import { Button } from "@/src/components/Button/Button";
import ButtonMore from "@/src/Icons/ButtonMore";
import PlusCircle from "@/src/Icons/PlusCircle";
import Rectangle from "@/src/Icons/Rectangle";

export default function Home() {
  return (
    <main className="flex-1 h-full">
      <header className="flex justify-between border-b-2 border-[#54353ECC] pb-4">
        <h1 className="text-2xl font-bold">TO DO | YOUR LISTS</h1>
        <Button className="flex gap-4 text-[#F25551] h-6">
          <PlusCircle />
          Add new list
        </Button>
      </header>
      <section className="flex justify-center items-center h-full">
        <Rectangle />
      </section>
    </main>
  );
}
