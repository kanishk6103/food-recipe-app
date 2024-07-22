import Image from "next/image";
import { Bookmark } from "../../../public/assets";
const HomeCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="relative flex flex-col justify-center">
      <Image
        src={image}
        alt="dish-image"
        width={110}
        height={110}
        className="absolute -top-14 rounded-full left-0 right-0 ml-auto mr-auto"
      />
      <div className="w-36 h-44 flex items-center justify-center bg-placeholder-colour rounded-lg">
        <span className="text-card-text-style px-5 text-center font-semibold text-sm line-clamp-2">
          {name}
        </span>
      </div>
      <div className="absolute bottom-0 py-3 px-3 flex justify-between items-end w-full">
        <div className="flex flex-col gap-1 justify-start">
          <div className="font-normal text-xs">Time</div>
          <div className="font-semibold text-xs">15 Mins</div>
        </div>
        <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
          <Image src={Bookmark} alt="bookmark" />
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
