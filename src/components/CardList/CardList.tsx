import EmojiPicker from "emoji-picker-react";
import { ListType } from "@/src/modules/todo-list/types/ListType";

import { Check, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/src/components/ui/select";
import { useUpdateList } from "@/src/modules/todo-list/use-querys/useUpdateList";
import { useRouter } from "next/navigation";
import { useDeleteList } from "@/src/modules/todo-list/use-querys/useDeleteList";
import { useTodoListKey } from "@/src/modules/todo-list/use-querys/useGetTodoList";
import { useAuth } from "@/src/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

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
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emoji, setEmoji] = useState(listEmoji);
  const [listNameInput, setListNameInput] = useState(listName);
  const [selectedPriority, setSelectedPriority] = useState(priority);
  const [finished, setFinished] = useState(initialFinished);

  const updateMutation = useUpdateList({
    onError: (error) => {
      console.error(error);
    },
  });

  const userData = useAuth();
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteList({
    onMutate: () => {
      console.log("OnSucess");
      queryClient.invalidateQueries({
        queryKey: [`${useTodoListKey}${userData.user?.userId}`],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmoji(event.target.value);
  };

  const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListNameInput(event.target.value);
  };

  const handleDelete = () => {
    deleteMutation.mutate({
      listIds: [listId],
      userId: userId,
    });
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateMutation.mutate({
      listId: listId,
      userId: userId,
      finished: finished,
      listEmoji: emoji,
      listName: listNameInput,
      priority: selectedPriority,
    });
    setIsEditing(!isEditing);
  };

  if (!isEditing) {
    return (
      <div className="w-full p-4">
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
            <span role="img" aria-label="list" className="mr-2">
              {emoji}
            </span>
            <span>{listNameInput}</span>
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
            <span
              className="text-[#FFFBFF] hover:text-[#FEEDE1]"
              onClick={() => router.push(`/todo`)}
            >
              <ChevronRight />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
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
            className="mr-2 cursor-pointer"
            onClick={handleEmojiClick}
          >
            {emoji}
          </span>
          {showEmojiPicker && (
            <div className="relative">
              <div className="absolute left-0 top-0">
                <EmojiPicker
                  onEmojiClick={(emojiObject) => {
                    setEmoji(emojiObject.emoji);
                    setShowEmojiPicker(false);
                  }}
                />
              </div>
            </div>
          )}
          <input
            className="rounded border bg-transparent px-2"
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
              <span className="text-sm font-semibold">{selectedPriority}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Priority</SelectLabel>
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Baixa">Baixa</SelectItem>
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
          <span
            className="text-[#FFFBFF] hover:text-[#FEEDE1]"
            onClick={handleDelete}
          >
            <Trash2 />
          </span>

          <span
            className="text-[#FFFBFF] hover:text-[#FEEDE1]"
            onClick={handleSave}
          >
            <Check />
          </span>
        </div>
      </div>
    </div>
  );
}
