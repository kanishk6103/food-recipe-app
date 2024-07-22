import Image from "next/image";
import { Avatar } from "../../../public/assets";
const Header = () => {
  return (
    <div className="flex items-center justify-between w-full px-7">
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-xl">Hello, Jaya</div>
        <div className="font-normal text-xs w-max text-sub-heading">
          What are you cooking today?
        </div>
      </div>
      <div>
        <Image src={Avatar} width={40} height={40} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
