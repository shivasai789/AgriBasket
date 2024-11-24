import { FileChartPie } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BookA, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BookA />,
  },
];

function MenuItems({setOpen}) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path)
            setOpen ? setOpen(false) : null
        }}
          className="text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer flex item-center gap-2 rounded-md px-3 py-2"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSidebar({open,setOpen}) {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
            <div className="flex-col h-full">
                <SheetHeader className="border-b">
                <SheetTitle className="flex gap-2 mt-5 mb-5">
                <FileChartPie size={30} />
                <h1 className="text-xl font-extrabold">Admin Panel</h1>
                </SheetTitle>
                </SheetHeader>
                <MenuItems setOpen={setOpen}/>
            </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <FileChartPie size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
}

export default AdminSidebar;
