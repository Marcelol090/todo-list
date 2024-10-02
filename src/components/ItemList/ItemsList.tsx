"use client";

import { cn } from "@/lib/utils";
import { DeleteItemButton } from "@/src/components/DeleteItemButton/DeleteItemButton";
import { ButtonRainbow } from "@/src/components/ItemList/ButtonRainbow/ButtonRainbow";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/src/components/ui/select";
import { TodoItem } from "@/src/modules/todo-item/use-querys/useGetTodoItem";
import { useUpdateTodoItem } from "@/src/modules/todo-item/use-querys/useUpdateTodoItems";

import { Check, Pencil } from "lucide-react";
import { useState } from "react";

export type ItemListProps = TodoItem & {
  userId: number;
};


export const ItemsList = ({
  itemName,
  itemId,
  finished: initialFinished,
  listId,
  priority,
  userId,
  createdAt,
  editedAt,
}: ItemListProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const createdDate = `${new Date(createdAt).toLocaleDateString("en-us", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })}`;

  const [itemNameInput, setItemNameInput] = useState(itemName);

  const [selectedPriority, setSelectedPriority] = useState<
    "Alta" | "Media" | "Baixa"
  >(priority as "Alta" | "Media" | "Baixa");

  const [finished, setFinished] = useState(initialFinished);

  const updateMutation = useUpdateTodoItem({
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      itemId,
      userId,
      finished: finished,
      itemName: itemNameInput,
      priority: selectedPriority,
    });
    setIsEditing(false);
  };

  if (!isEditing)
    return (
      <div
        className={`mb-2 flex w-full items-center justify-between border-l-4 ${selectedPriority === "Alta" ? "border-red-600" : selectedPriority === "Media" ? "border-yellow-500" : "border-green-500"} rounded-lg bg-[#352432] p-2 px-8 py-4 shadow-lg`}
      >
        <div className="flex max-w-[50%] items-center justify-center gap-3">
          <span
            className="h-6 w-6"
            onClick={() => {
              setFinished(!finished);
              updateMutation.mutate({
                itemId,
                userId,
                finished: finished,
              });
            }}
          >
            <ButtonRainbow checked={finished} />
          </span>
          <span className="line-clamp-1 text-base text-[#e5e5e5]">
            {itemNameInput}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 text-[#FFFBFF]">
          <span className="line-clamp-1 flex gap-1">
            <span className="hidden md:block">Created:</span> {createdDate}
          </span>
          <span
            className="hover:cursor-pointer hover:text-[#FEEDE1]"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil />
          </span>
        </div>
      </div>
    );

  return (
    <>
      <div
        className={cn(
          "absolute z-10 h-full w-full",
          "bg-gradient-to-r from-[#352432] to-[#241722] opacity-90"
        )}
      />
      <div
        className={`z-20 mb-2 flex w-full items-center justify-between border-l-4 ${selectedPriority === "Alta" ? "border-red-600" : selectedPriority === "Media" ? "border-yellow-500" : "border-green-500"} rounded-lg bg-[#352432] p-2 px-8 py-4 shadow-lg`}
      >
        <div className="flex w-max items-center justify-center gap-3">
          <span
            className="h-6 w-6"
            onClick={() => {
              setFinished(!finished);
              updateMutation.mutate({
                itemId,
                userId,
                finished: finished,
              });
            }}
          >
            <ButtonRainbow checked={finished} />
          </span>

          <input
            type="text"
            className="text w-full rounded border bg-[#352432] bg-transparent p-2 px-4 py-2 text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
            value={itemNameInput}
            onChange={(e) => setItemNameInput(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-3 text-[#FFFBFF]">
          <Select
            value={selectedPriority}
            onValueChange={(value) => {
              setSelectedPriority(value as "Alta" | "Media" | "Baixa");
            }}
          >
            <SelectTrigger className="min-w-20 rounded border bg-transparent px-2">
              <span className="text-sm font-semibold">{selectedPriority}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Priority</SelectLabel>
                <SelectItem value="Baixa">Baixa</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DeleteItemButton
            listId={listId}
            itemName={itemName}
            itemId={itemId}
            userId={userId}
          />

          <span className="hover:text-[#FEEDE1]" onClick={handleSave}>
            <Check />
          </span>
        </div>
      </div>
    </>
  );
};