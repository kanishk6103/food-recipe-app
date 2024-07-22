const ResultCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <div
      className="w-36 h-36 rounded-[10px] px-2 flex flex-col justify-end items-start my-2 text-white relative"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-[10px]" />
      <div className="relative z-10 py-2 px-1">
        <div className="font-semibold text-sm line-clamp-2 w-full">{name}</div>
        <div className="font-normal text-[8px]">By Kanishk Tiwari</div>
      </div>
    </div>
  );
};

export default ResultCard;
