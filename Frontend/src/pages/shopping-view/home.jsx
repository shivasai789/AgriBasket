
import nike from '../../assets/brands/nike.png'
import adidas from '../../assets/brands/adidas.png'
import h_m from '../../assets/brands/h&m.webp'
import levi from '../../assets/brands/Levi.png'
import puma from '../../assets/brands/puma.png'
import zara from '../../assets/brands/Zara.png'
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  FootprintsIcon,
  ShirtIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/admin-slice/products";
import ShoppingProduct from "@/components/shopping-view/product-list";
import { fetchAllShoppingProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: FootprintsIcon },
];

const brandsWithIcon = [
    { id: "nike", label: "Nike",icon: nike },
    { id: "adidas", label: "Adidas" ,icon: adidas },
    { id: "puma", label: "Puma",icon: puma  },
    { id: "levi", label: "Levi's",icon: levi  },
    { id: "zara", label: "Zara",icon: zara  },
    { id: "h&m", label: "H&M",icon: h_m  },
  ]

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {user} = useSelector(state => state.auth)
  const { productList,productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {toast} = useToast()

  // const slides = [BannerOne, BannerFive, BannerThree, BannerFour];


  function handleGetProductDetails(getCurrentProductId) {
    // console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId){
    // console.log(getCurrentProductId)
    dispatch(addToCart({userId: user?.id,productId: getCurrentProductId,quantity: 1})).then(data => {
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product added to cart",
        })
      }
      
    })
  }


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
        fetchAllShoppingProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch])

  // console.log(productList,'productlist')

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length>0 ? featureImageList.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 mt-0`}
          />
        )):null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProduct 
                  key={productItem._id} 
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart} />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
