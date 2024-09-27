import EmojiPicker from "emoji-picker-react";

import { Check, ChevronRight, Pencil } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/src/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DeleteListButton } from "@/src/components/DeleteListButton/DeleteListButton";
import { useUpdateList } from "@/src/modules/todo-list/use-querys/useUpdateList";
import { ListType } from "@/src/modules/todo-list/types/ListType";
import { queryClient } from "@/src/lib/react.query";
import { useTodoListKey } from "@/src/modules/todo-list/use-querys/useGetTodoList";
import { useAuth } from "@/src/hooks/useAuth";

type CardListProps = {
  finished: boolean;
  priority: "Alta" | "Media" | "Baixa";
} & ListType;

export default function CardList({
  finished: initialFinished,
  priority,
  listEmoji,
  listId,
  listName,
  userId,
}: CardListProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emoji, setEmoji] = useState(listEmoji);
  const [listNameInput, setListNameInput] = useState(listName);
  const [selectedPriority, setSelectedPriority] = useState(priority);
  const [finished, setFinished] = useState(initialFinished);

  const userData = useAuth();
  
  const updateMutation = useUpdateList({
    onError: (error) => {
      console.error(error);
    },
  });

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiChange = (emoji: string) => {
    setEmoji(emoji);
    setShowEmojiPicker(false);
  };

  const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListNameInput(event.target.value);
  };

  const handleSave = () => {
    updateMutation.mutate(
      {
        listId: listId,
        userId: userId,
        finished: finished,
        listEmoji: emoji,
        listName: listNameInput,
        priority: selectedPriority,
      },

      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`${useTodoListKey}${userData.user?.userId}`],
          });
        },
      }
    );
    setIsEditing(!isEditing);
  };

  if (!isEditing) {
    return (
      <div className="w-full p-4">
        <div
          className={`mb-2 flex items-center justify-between rounded-md border-l-4 ${
            selectedPriority === "Alta"
              ? "border-red-600"
              : selectedPriority === "Media"
              ? "border-yellow-500"
              : "border-green-500"
          } bg-[#2D1B30] p-4 text-white shadow-lg transition-all duration-200`}
        >
          <div className="flex items-center">
            <span role="img" aria-label="list" className="mr-2">
              {emoji}
            </span>
            <span className="line-clamp-1">{listNameInput}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="relative mr-2 inline-block w-10 select-none align-middle">
              <input
                type="checkbox"
                className="hidden"
                id={`list-finished${listId}`}
                readOnly
                checked={finished}
                onClick={() => {
                  updateMutation.mutate({
                    listId: listId,
                    userId: userId,
                    finished: finished ? false : true,
                  });
                  setFinished(!finished);
                }}
              />
              <label
                htmlFor={`list-finished${listId}`}
                className={`flex h-6 cursor-pointer items-center overflow-hidden rounded-full ${
                  finished ? "justify-end" : "justify-start"
                } ${
                  finished ? "bg-[#50F283]" : "bg-[#F25551]"
                } border shadow-xl transition ${
                  finished ? "border-[#50F283]" : "border-[#F25551]"
                } `}
              >
                <span
                  className={`flex h-6 font-semibold ${
                    finished ? "text-black" : "text-white"
                  } w-6 items-center justify-center overflow-hidden rounded-full text-center text-xs ${
                    finished ? "bg-white" : "bg-[#462730]"
                  } transition`}
                >
                  {finished ? "F" : "NF"}
                </span>
              </label>
            </div>

            <span
              className="text-[#FFFBFF] hover:text-[#FEEDE1]"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Pencil />
            </span>
            <Link
              className="text-[#FFFBFF] hover:text-[#FEEDE1]"
              href={`/todo/${listId}`}
            >
              <ChevronRight />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "absolute z-10 h-full w-full",
          "bg-gradient-to-r from-[#352432] to-[#241722] opacity-90"
        )}
      />
      <div className="z-20 w-full p-4">
        <div
          className={`mb-2 flex cursor-pointer items-center justify-between rounded-md border-l-4 ${
            selectedPriority === "Alta"
              ? "border-red-600"
              : selectedPriority === "Media"
              ? "border-yellow-500"
              : "border-green-500"
          } bg-[#2D1B30] p-4 text-white shadow-lg transition-all duration-200`}
        >
          <div className="flex items-center">
            <span
              role="img"
              aria-label="list"
              className="mr-2 cursor-pointer rounded-sm border p-2"
              onClick={handleEmojiClick}
            >
              {emoji}
            </span>
            {showEmojiPicker && (
              <div className="relative">
                <div className="absolute left-0 top-0">
                  <EmojiPicker
                    onEmojiClick={(emojiObject) =>
                      handleEmojiChange(emojiObject.emoji)
                    }
                  />
                </div>
              </div>
            )}
            <input
              className="rounded border bg-transparent p-2"
              type="text"
              value={listNameInput}
              onChange={handleListNameChange}
            />
          </div>

          <div className="flex w-max items-center justify-center gap-2">
            <Select
              value={selectedPriority}
              onValueChange={(value) => {
                setSelectedPriority(value as "Alta" | "Media" | "Baixa");
              }}
            >
              <SelectTrigger className="min-w-20 rounded border bg-transparent px-2">
                <span className="text-sm font-semibold">
                  {selectedPriority}
                </span>
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
            <div className="relative mr-2 inline-block w-10 min-w-max select-none align-middle">
              <input
                type="checkbox"
                className="hidden"
                id={`list-finished${listId}`}
                readOnly
                checked={finished}
                onClick={() => {
                  setFinished(!finished);
                }}
              />
              <label
                htmlFor={`list-finished${listId}`}
                className={`flex h-6 min-w-10 cursor-pointer items-center overflow-hidden rounded-full ${
                  finished ? "justify-end" : "justify-start"
                } ${
                  finished ? "bg-[#50F283]" : "bg-[#F25551]"
                } border shadow-xl transition ${
                  finished ? "border-[#50F283]" : "border-[#F25551]"
                } `}
              >
                <span
                  className={`flex h-6 font-semibold ${
                    finished ? "text-black" : "text-white"
                  } w-6 items-center justify-center overflow-hidden rounded-full text-center text-xs ${
                    finished ? "bg-white" : "bg-[#462730]"
                  } transition`}
                >
                  {finished ? "F" : "NF"}
                </span>
              </label>
            </div>

            <DeleteListButton
              listId={listId}
              listName={listName}
              listEmoji={emoji}
              userId={userId}
            />

            <span
              className="text-[#FFFBFF] hover:text-[#FEEDE1]"
              onClick={handleSave}
            >
              <Check />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
