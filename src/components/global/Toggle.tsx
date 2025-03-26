type ToggleProps = {
  value: boolean;
  onChange: () => void;
};

export const Toggle = ({ value, onChange }: ToggleProps) => {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex items-center cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 ${
        value ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};
