import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
  import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useEffect, useState } from "react";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetailsForAdmin } from "@/store/admin-slice/order-slice";
import { Badge } from "../ui/badge";


function AdminOrdersView() {

  const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
  const {orderList,orderDetails} = useSelector(state=>state.adminOrder)
  const dispatch = useDispatch()

  function handleFetchOrderDetails(getId){
    dispatch(getOrderDetailsForAdmin(getId))

  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  },[dispatch])

  // console.log(orderDetails,'orderDetails');

  useEffect(() => {
    if(orderDetails !== null) setOpenDetailsDialog(true)
  },[orderDetails])
  

    return ( 
        <Card>
            <CardHeader>
                <CardTitle>
                    All Orders
                </CardTitle>
            </CardHeader>
            <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  // eslint-disable-next-line react/jsx-key
                  <TableRow>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      {orderItem.orderStatus === "rejected" || orderItem.orderStatus === "cancelled" ? (
                        <Badge className="bg-red-400 py-1 px-3">
                          {orderItem?.orderStatus}
                        </Badge>
                      ) : orderItem.orderStatus === "pending" ? (
                        <Badge className="bg-orange-400 py-1 px-3">
                          {orderItem?.orderStatus}
                        </Badge>
                      ) : orderItem.orderStatus === "confirmed" ? (
                        <Badge className="bg-green-400 py-1 px-3">
                          {orderItem?.orderStatus}
                        </Badge>
                      ) : (
                        <Badge className=" py-1 px-3">
                          {orderItem?.orderStatus}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetailsForAdmin());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
        </Card>
     );
}

export default AdminOrdersView;