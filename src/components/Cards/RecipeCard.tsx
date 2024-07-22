import Image from "next/image";
import { Clock, Star } from "../../../public/assets";

const RecipeCard = ({
  name,
  image,
  rating,
  creator,
  time,
}: {
  name: string;
  image: string;
  rating: number;
  creator: {
    name: string;
    image: string;
  };
  time: number;
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<Image key={i} src={Star} alt="star" />);
    }
    return stars;
  };

  return (
    <div className="relative pt-7 mb-2">
      <Image
        src={image}
        height={80}
        width={80}
        alt="Recipe Image"
        className="rounded-full absolute right-3 top-1"
      />
      <div className="flex flex-col gap-3 w-64 shadow-lg rounded-xl p-2 ">
        <div className="font-semibold text-base">{name}</div>
        <div className="flex gap-1">{renderStars()}</div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <Image
              src={creator.image}
              height={25}
              width={25}
              alt="Creator-Image"
              className="rounded-full"
            />
            <div className="text-xs font-normal text-sub-heading">
              By {creator.name}
            </div>
          </div>
          <div className="flex gap-1">
            <Image src={Clock} alt="alt" width={17} height={17} />
            <div className="text-xs font-normal text-sub-heading">
              {time} mins
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
