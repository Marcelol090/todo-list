import EmojiPicker from "emoji-picker-react";


import { Pencil } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { InputLabel } from "@/src/components/InputLabel/InputLabel";
import { useRouter } from "next/navigation";
import { ListType } from "@/src/modules/todo-list/types/ListType";
import { useUpdateList } from "@/src/modules/todo-list/use-querys/useUpdateList";

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

  const [finished, setFinished] = useState(initialFinished);

  const mutation = useUpdateList({
    onMutate: async () => {
      setFinished(!finished);
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  return (
    <div className="w-full p-4">
      <div
        className={`mb-2 flex cursor-pointer items-center justify-between rounded-md border-l-4 ${priority === "Alta" ? "border-red-600" : priority === "Media" ? "border-yellow-500" : "border-green-500"} bg-[#2D1B30] p-4 text-white shadow-lg transition-all duration-200`}
      >
        <div className="flex items-center">
          <span role="img" aria-label="list" className="mr-2">
            {listEmoji}
          </span>
          <span>{listName}</span>
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
                mutation.mutate({
                  listId: listId,
                  userId: userId,
                  finished: finished ? false : true,
                });
              }}
            />
            <label
              htmlFor={`list-finished${listId}`}
              className={`flex h-6 cursor-pointer items-center overflow-hidden rounded-full ${finished ? "justify-end" : "justify-start"} ${finished ? "bg-[#50F283]" : "bg-[#F25551]"} border shadow-xl transition ${finished ? "border-[#50F283]" : "border-[#F25551]"} `}
            >
              <span
                className={`flex h-6 font-semibold ${finished ? "text-black" : "text-white"} w-6 items-center justify-center overflow-hidden rounded-full text-center text-xs ${finished ? "bg-white" : "bg-[#462730]"} transition`}
              >
                {finished ? "F" : "NF"}
              </span>
            </label>
          </div>

          <span
            className="text-[#FFFBFF] hover:text-[#FEEDE1]"
            onClick={() => router.push(`/list/${listId}`)}
          >
            <Pencil />
          </span>
        </div>
      </div>
    </div>
  );
}