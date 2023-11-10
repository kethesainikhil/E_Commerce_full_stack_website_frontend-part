import { configureStore } from '@reduxjs/toolkit';
import proudctReducer from "../features/product-list/productSlice";
import authReducer from "../features/auth/authSlice"
import cartReducer from "../features/cart/cartSlice"
import orderReducer from "../features/order/orderSlice"
import userReducer from "../features/users/userSlice"
import { increment } from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    products : proudctReducer,
    user: authReducer,
    cart: cartReducer,
    order: orderReducer,
    particularUser:userReducer
  },
});
