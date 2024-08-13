import { ButtonRainbow } from "@/src/components/ItemList/ButtonRainbow/ButtonRainbow";

export const ItemList = () => {
  const items = Array(8).fill("Write Text"); // Gerando 8 itens com o texto "Write Text"

  return (
    <div className="shadow-lg gap-3 px-8 py-4 w-full flex items-center bg-[#352432] p-2 mb-2 rounded-lg">
        <ButtonRainbow checked={false} />
      <span className="text-[#e5e5e5] text-base">Write Text</span>
    </div>
  );
};
