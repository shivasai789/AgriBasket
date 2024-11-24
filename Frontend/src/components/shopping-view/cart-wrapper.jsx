import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems,setOpenCartSheet }) {

  const navigate = useNavigate()

  const totalAmount = cartItems && cartItems.length > 0 ? 
  cartItems.reduce((sum,currentItem) => sum+(
    currentItem?.salePrice > 0 ? currentItem.salePrice : currentItem?.price
  ) * currentItem?.quantity,0)
  : 0

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
          : null}
          {console.log(cartItems,'wrapper')
          }
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalAmount}</span>
        </div>
      </div>
      <Button onClick={() => {
        navigate('/shop/checkout')
        setOpenCartSheet(false)
      }} className="w-full mt-6">Checkout</Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
