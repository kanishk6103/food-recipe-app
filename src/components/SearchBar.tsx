import Image from "next/image";
import { Search, Settings } from "../../public/assets";
const SearchBar = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="w-full px-7 flex justify-between items-center h-10">
      <div className="flex w-3/4 p-1 h-full border border-gray-300 rounded-xl">
        <Image
          src={Search}
          height={18}
          width={18}
          alt="Search"
          className="mx-1"
        />
        <input
          type="text"
          className="h-full w-full py-2 px-1 placeholder:text-placeholder-colour text-xs focus:outline-none focus:border-gray-500"
          placeholder={placeholder}
        />
      </div>
      <button className="bg-primary-green-500 text-white px-3 rounded-lg h-full">
        <Image src={Settings} height={20} width={20} alt="Settings" />
      </button>
    </div>
  );
};

export default SearchBar;
