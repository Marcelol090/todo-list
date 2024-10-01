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
  SelectValue,
} from "@/src/components/ui/select";
import { Filter, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function FilterList({}) {
  const router = useRouter();
  const [priority, setPriority] = useState("Todas");
  const [finished, setFinished] = useState("Todas");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Casting e.target to HTMLFormElement
    const form = e.target as HTMLFormElement;

    // Crie uma nova instância de URLSearchParams
    const currentParams = new URLSearchParams(window.location.search);

    // Atualize os parâmetros com os novos valores
    currentParams.set("listName", form.listName.value);
    currentParams.set("priority", priority);
    currentParams.set("finished", finished);

    // Use router.push para atualizar a URL com os novos parâmetros
    router.push(`?${currentParams.toString()}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-4 p-4 items-center">
        <Filter size={48} />
        <Input type="text" placeholder="Nome da Lista" id="listName" />
        <Select onValueChange={setPriority} defaultValue={priority}>
          <SelectTrigger className="min-w-20 rounded border bg-transparent px-2">
            <SelectValue placeholder="Selecione a prioridade" />
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
        <Select onValueChange={setFinished} defaultValue={finished}>
          <SelectTrigger className="min-w-20 rounded border bg-transparent px-2">
            <SelectValue placeholder="Selecione o finalizado" />
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
