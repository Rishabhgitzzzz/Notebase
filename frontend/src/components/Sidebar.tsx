import Logo from "../icons/Logo";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarList from "./SidebarList";

const Sidebar = () => {
  return (
    <div className=" fixed h-screen w-64 bg-white border-r border-gray-200 flex flex-col p-3">
      <div className="flex items-center">
        <div>
          <Logo />
        </div>
        <div className="text-3xl pl-3 font-semibold">NoteBase</div>
      </div>
      <div>
        <SidebarList icon={<TwitterIcon />} text="Twitter" />
        <SidebarList icon={<YoutubeIcon />} text="Youtube" />
      </div>
    </div>
  );
};

export default Sidebar;
