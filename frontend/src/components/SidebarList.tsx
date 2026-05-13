const SidebarList = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <div className=" text-gray-500 mt-3 ">
      <div className=" flex items-center  pl-10  py-1 transition-colors duration-200">
        <button className="flex cursor-pointer   hover:bg-gray-400 hover:text-white rounded-2xl px-2 py-1">
          <div>{icon}</div>
          <div className="pl-2">{text}</div>
        </button>
      </div>
    </div>
  );
};

export default SidebarList;
