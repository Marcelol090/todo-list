import { Button } from "@/src/components/Button/Button";
import CardList from "@/src/components/CardList/CardList";
import ButtonMore from "@/src/Icons/ButtonMore";
import PlusCircle from "@/src/Icons/PlusCircle";
import Rectangle from "@/src/Icons/Rectangle";

export default function Home() {
  return (
    <main className="flex-1 h-full flex flex-col">
      <header className="flex justify-between border-b-2 border-[#54353ECC] pb-4 mt-16">
        <h1 className="text-2xl font-bold text-[#FEEDE1] font-poppins">TO DO | YOUR LISTS</h1>
        <Button className="flex gap-4 text-[#F25551] h-6">
          <PlusCircle />
          Add new list
        </Button>
      </header>
      <section className="flex justify-center items-center flex-1 relative w-full">
        {/* <h1 className="absolute text-[#FEEDE1] lg:text-9xl md:text-8xl text-6xl font-bold font-poppins">TO-DO LIST</h1>
        <Rectangle /> */}
        <CardList title={"New list"} emoji={"😎"}/>
      </section>
    </main>
  );
}
