"use client";

import { Button } from "@/src/components/Button/Button";
import { ItemList } from "@/src/components/ItemList/ItemsList";
import ArrowLeftIcon from "@/src/components/Icons/ArrowLeftIcon";
import ButtonMore from "@/src/components/Icons/ButtonMore";
import Trash from "@/src/components/Icons/Trash";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CircleArrowLeft, Pencil, SquarePlus, Trash2 } from "lucide-react";

export default function Todo() {
  return (
    <main className="flex-1 h-full flex flex-col">
      <header className="items-center flex justify-between border-b-2 border-[#54353ECC] pb-4 mt-16">
        <h1 className="text-lg items-center max-w-xs gap-6 flex  font-bold text-[#FEEDE1] font-poppins">
          <Link href={"/"} className="w-8 h-8 text-[#462730] hover:text-[#F25551]">
          <CircleArrowLeft />
          </Link>

          <span className="truncate max-w-full">
            😎 Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
            voluptatem.
          </span>
        </h1>

        <div className="flex gap-6 ">
          <Button className="flex gap-4 text-[#F25551] hover:text-[#9d3836]">
            <Pencil />
            Edit
          </Button>

          <Button className="flex gap-4 text-[#F25551] hover:text-[#9d3836] h-6 items-center">
            <Trash2 />
            Delete List
          </Button>
          <Button className="flex gap-4 text-[#F25551] hover:text-[#9d3836] h-6 items-center">
            <SquarePlus />
            Add to-do
          </Button>
        </div>
      </header>
      <section className="flex justify-center items-center flex-1 relative w-full">
        <ItemList />
      </section>
    </main>
  );
}
