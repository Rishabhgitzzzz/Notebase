const SidebarList = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="flex">
      {icon} {text}
    </div>
  );
};

export default SidebarList;
