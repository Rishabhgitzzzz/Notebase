interface inputBoxProps {
  placeholder: string;
  ref?: any;
}
const Inputbox = ({ placeholder, ref }: inputBoxProps) => {
  return (
    <div>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-md px-3 py-2 mb-3 text-sm outline-none focus:border-purple-400"
      />
    </div>
  );
};

export default Inputbox;
