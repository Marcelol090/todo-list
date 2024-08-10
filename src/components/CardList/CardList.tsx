import Setinha from '@/src/Icons/Setinha';

type CardListProps = {
    title: string
    emoji: string;
}
export default function CardList({ title, emoji }: CardListProps) {

  return (
    <div className="w-full p-4 bg-[#241722]">
        <div
          className="flex items-center justify-between bg-[#2D1B30] border-l-4 border-[#F25551] text-white p-4 rounded-md shadow-lg cursor-pointer mb-2 hover:border-[#50F283] transition-all duration-200"
        >
          <div className="flex items-center">
            <span role="img" aria-label="list" className="mr-2">{emoji}</span>
            <span>{title}</span>
          </div>
          <span className="text-[#9150FC]"><Setinha /></span>
        </div>
    </div>
  );
}
