import { categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import StarRatingComponent from "../common/star-rating";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "@/store/shop/review-slice";

function ShoppingProduct({
  product,
  handleGetProductDetails,
  handleAddtoCart,
  reviews
}) {
  const dispach = useDispatch()
  const filteredReviews = reviews ? reviews.filter((item) => item.productId === product._id) : [];


  // console.log(filteredReviews,'filteredReviews');

  const averageReview = filteredReviews.reduce((sum,reviewItem) => sum + reviewItem.reviewValue, 0) / filteredReviews.length
  

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out of stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`${product?.totalStock} kg's left`}
            </Badge>
          ) : 
          product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex gap-2 items-center">
          <StarRatingComponent rating={averageReview} />
          <h1>({averageReview ? averageReview : 0})</h1>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[17px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}/kg
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}/kg
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {
          product?.totalStock === 0 ? <Button
          className="w-full opacity-60 cursor-not-allowed"
        >
          Out Of Stock
        </Button> : <Button
          onClick={() => handleAddtoCart(product?._id,product?.totalStock)}
          className="w-full "
        >
          Add to cart
        </Button>
        }
        
      </CardFooter>
    </Card>
  );
}

export default ShoppingProduct;
