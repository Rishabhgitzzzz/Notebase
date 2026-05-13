import Logo from "../icons/Logo";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarList from "./SidebarList";

const Sidebar = () => {
  return (
    <div className=" fixed h-screen w-64 bg-white border-r border-gray-200 flex flex-col p-3">
      <div className="flex items-center p-1">
        <div>
          <Logo />
        </div>
        <div className="text-3xl pl-2 font-semibold">
          Note<span className="text-indigo-500">Base</span>
        </div>
      </div>
      <div>
        <SidebarList icon={<TwitterIcon />} text="Twitter" />
        <SidebarList icon={<YoutubeIcon />} text="Youtube" />
      </div>
    </div>
  );
};

export default Sidebar;
