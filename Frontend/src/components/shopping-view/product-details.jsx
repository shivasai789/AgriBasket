import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useToast } from "@/hooks/use-toast";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const [reviewMsg,setReviewMsg] = useState("")
  const [rating,setRating] = useState(0)

  function handleAddReview(){
    dispatch(addReview({
      productId: productDetails?._id,
      userId: user?.id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating
    })).then((data) => {
      // console.log(data);
      if(data.payload.success){
        toast({
          title: 'Review added successfully!'
        })
      }
      else{
        toast({
          title: "Write review after purchasing product",
          variant: "destructive"
        })
      }
      
    })
  }

  function handleRatingChange(getRating){
    setRating(getRating)
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    // console.log(getCurrentProductId)

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added!`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0)
        setReviewMsg("")
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0)
    setReviewMsg(
    ""
    )
  }

  useEffect(() => {
    if(productDetails !== null) dispatch(getReviews(productDetails?._id))
  },[productDetails])

  const averageReview = reviews && reviews.length > 0 ? 
  reviews.reduce((sum,reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length : 0

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-12 w-full sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[97vh]  overflow-y-auto">
        <div className="relative rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            height={600}
            width={600}
            className="aspect-square w-full object-cover mt-5 md:mt-0"
          />
        </div>
        <div className="">
          <h1 className="text-2xl font-extrabold">{productDetails?.title}</h1>
          <p className="text-muted-foreground text-md mb-5 mt-4">
            {productDetails?.description}
          </p>
          <div className="flex items-center justify-between">
            <p
              className={`${
                productDetails?.salePrice > 0 ? "line-through" : ""
              } text-3xl font-bold text-primary`}
            >
              ${productDetails?.price}/kg
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}/kg
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5 ">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">({averageReview.toFixed(1)})</span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out Of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddtoCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                className="w-full"
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6 ">
              {
                reviews && reviews.length > 0 ?
                reviews.map(reviewItem => (
                  // eslint-disable-next-line react/jsx-key
                  <div className="flex gap-4 ">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{reviewItem?.userName}</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarRatingComponent rating={reviewItem?.reviewValue} />
                  </div>
                  <p className="text-muted-foreground">
                    {reviewItem?.reviewMessage}
                  </p>
                </div>
              </div>
                )) : <h1>No Reviews</h1>
              }
              
            </div>
            <div className="mt-10 flex-col   flex gap-2">
              <Label>Write a review</Label>
              <div className="flex ">
                <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ''} >Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
