import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogOutIcon from "../icons/LogOutIcon";

const LogOutButton = () => {
  const { logout } = useAuth();
  const nav = useNavigate();
  function handleLogout() {
    logout();
    nav("/signin");
  }
  return (
    <button
      onClick={handleLogout}
      title="Logout"
      className="w-9 h-9 rounded-full bg-red-100 hover:bg-red-200 text-red-500 flex items-center justify-center transition-colors"
    >
      <LogOutIcon />
    </button>
  );
};

export default LogOutButton;
