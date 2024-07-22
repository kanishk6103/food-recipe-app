const FilterButton = ({
  text,
  handler,
  filled,
}: {
  text: string;
  handler: () => void;
  filled: boolean;
}) => {
  return (
    <button
      className={`px-3 py-1 text-xs font-semibold rounded-lg ${
        filled
          ? "text-white bg-primary-green-500"
          : "text-primary-green-400 border border-primary-green-500"
      }`}
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default FilterButton;
