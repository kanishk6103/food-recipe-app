const PrimaryButton = ({
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
      className={`px-5 py-1 text-xs font-semibold rounded-xl ${
        filled ? "text-white bg-primary-green-500" : "text-primary-green-400"
      }`}
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
