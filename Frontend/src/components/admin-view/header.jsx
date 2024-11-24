import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Menu, LogOut } from "lucide-react";
import { logoutUserAction, resetTokenAndCredentials } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";

function AdminHeader({setOpen}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
  // dispatch(logoutUserAction());
  dispatch(resetTokenAndCredentials())
    sessionStorage.clear()
    navigate('/auth/login')
};


  return (
    <header className="flex item-center justify-between px-4 py-3 bg-background border-bottom">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block bg-black text-white hover:bg-black border-0 rounded">
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogout} className="bg-black text-white hover:bg-black border-0 inline-flex gap-2 items-center rounded px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
