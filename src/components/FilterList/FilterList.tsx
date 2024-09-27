"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/src/components/ui/select";
import { Filter, Search } from "lucide-react";
import { FormEvent, useState } from "react";

export type FilterListProps = {
  listName: string;
  selectedPriority: "Todas" | "Alta" | "Media" | "Baixa";
  selectedFinished: "Todas" | "F" | "NF";
  setSelectedPriority: (value: "Todas" | "Alta" | "Media" | "Baixa") => void;
  setSelectedFinished: (value: "Todas" | "F" | "NF") => void;
  setListName: (value: string) => void;
};

export function FilterList({
  listName,
  selectedPriority,
  selectedFinished,
  setSelectedPriority,
  setSelectedFinished,
  setListName,
}: FilterListProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Casting e.target to HTMLFormElement
    const form = e.target as HTMLFormElement;

    // Accessing the value of listName
    setListName(form.listName.value);
    setSelectedFinished(form.selectedFinished.value);   
    setSelectedPriority(form.selectedPriority.value);
    
    console.log(listName, selectedPriority, selectedFinished);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-4 p-4 items-center">
        <Filter size={48} />
        <Input type="listName" placeholder="Nome da Lista" />
        <Select
          value={selectedPriority}
        
        >
          <SelectTrigger className="min-w-20 rounded border bg-transparent px-2">
            <span className="text-sm font-semibold">{selectedPriority}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Priority</SelectLabel>
              <SelectItem value="Todas">Todas</SelectItem>
              <SelectItem value="Baixa">Baixa</SelectItem>
              <SelectItem value="Media">Media</SelectItem>
              <SelectItem value="Alta">Alta</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={selectedFinished}>
          <SelectTrigger className="min-w-20 rounded border bg-transparent px-2">
            <span className="text-sm font-semibold">{selectedFinished}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Finalizado</SelectLabel>
              <SelectItem value="Todas">Todos</SelectItem>
              <SelectItem value="F">Finalizado</SelectItem>
              <SelectItem value="NF">Não Finalizado</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="flex gap-2">
          <Search size={16} />
          Filtrar
        </Button>
      </div>
    </form>
  );
}
