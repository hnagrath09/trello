import React from "react";
import HorizontalDotsIcon from "./icons/HorizontalDotsIcon";
import useLocalStorage from "../hooks/useLocalStorage";
import Card from "./Card";
import CreateCard from "./CreateCard";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  list: { id: number; order: number; title: string };
}

interface Card {
  id: number;
  parentId: number;
  order: number;
  title: string;
  description: string;
}

const List: React.FC<Props> = ({ list }) => {
  const [card, setCard] = useLocalStorage("cards", []);
  // const [activeCardId, setActiveCardId] = useState<number>();

  const handleCardTitle = (title: string) => {
    if (title) {
      const newList = {
        id: Date.now(),
        parentId: list.id,
        order: card.length + 1,
        title: title,
        description: "",
      };
      setCard((prevCard: Card[]) => [...prevCard, newList]);
    }
  };

  return (
    <div className="w-64 pt-2 mx-2 bg-gray-300 rounded-sm ">
      <div className="flex items-center justify-between">
        <div className="w-full ml-3 text-sm font-semibold text-gray-800 cursor-pointer">
          {list.title}
        </div>
        <div className="p-1 mr-1 rounded-sm cursor-pointer hover:bg-gray-500">
          <HorizontalDotsIcon className="w-4 h-4" />
        </div>
      </div>
      {card.map(
        (task: Card) => task.parentId === list.id && <Card card={task} />
      )}
      <CreateCard getTitle={handleCardTitle} />
    </div>
  );
};

export default List;
