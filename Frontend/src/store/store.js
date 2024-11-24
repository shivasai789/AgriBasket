import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin-slice/products/index';
import adminOrderSlice  from './admin-slice/order-slice';
import shopProductSlice  from './shop/products-slice';
import shopCartSlice  from './shop/cart-slice';
import shopAddressSlice  from './shop/address-slice';
import shopOrderSlice  from './shop/order-slice';
import shopSearchSlice  from './shop/search-slice';
import shopReviewSlice  from './shop/review-slice';
import commonFeatureSlice from "./common-slice";



const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        adminOrder: adminOrderSlice,
        shopProducts: shopProductSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
        shopSearch: shopSearchSlice,
        shopReview: shopReviewSlice,
        commonFeature: commonFeatureSlice,
    }
})


export default store