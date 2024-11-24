import AdminOrdersView from "@/components/admin-view/orders";
import { TabsContent } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";


function AdminOrders() {
    return ( 
        <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
            <AdminOrdersView/>
        </div>
     );
}

export default AdminOrders;