import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Cpu } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="text-indigo-400" size={22} />
          <span className="text-white font-semibold text-lg">AI Task Platform</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">
            Hey, <span className="text-white font-medium">{user?.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;