import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/authentication/layout";
import AuthLogin from "./pages/authentication/login";
import AuthRegister from "./pages/authentication/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingProductList from "./pages/shopping-view/product-list";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/auth-check";
import UnauthPage from "./pages/unauth-view";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
// import 'shadcn-ui/styles.css';
import SearchProducts from './pages/shopping-view/search';
import { ThreeDots } from "react-loader-spinner";
import PulseLoader from './../node_modules/react-spinners/esm/PulseLoader';
import PaypalCancelPage from "./pages/shopping-view/paypal-cancel";


function App() {
  const {isAuthenticated,user,isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token'))
    dispatch(checkAuth(token))
  },[dispatch])

  if(isLoading) return <div className="min-h-screen w-full flex justify-center items-center">
    <PulseLoader />
  </div>


  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common components */}

      <Routes>
        <Route
        path="/"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>
        }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="products" element={<ShoppingProductList />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="paypal-cancel" element={<PaypalCancelPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
