import React, { useEffect } from 'react';
import Counter from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import CheckOut from './features/components/CheckOut';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckOutPage from './pages/CheckOutPage';
import Protected from './features/auth/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInUser } from './features/auth/authSlice';
import { fetchItems, fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import ErrorPage from './pages/ErrorPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrder from './features/users/userOrder';
import LogOut from './features/components/Logout';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected><Home></Home></Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>
  },
  {
    path: "/checkout",
    element: <Protected><CheckOutPage></CheckOutPage></Protected>
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage></ProductDetailPage></Protected>
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>
  },
  {
    path: "/myorder",
    element: <Protected><UserOrder></UserOrder></Protected>
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);


function App() {
  const user = useSelector(loggedInUser)?.loggedIn
  const dispatch = useDispatch();
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
    
  },[dispatch,user])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
