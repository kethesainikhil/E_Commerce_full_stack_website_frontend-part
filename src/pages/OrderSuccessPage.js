import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom'
import { loggedInUser } from '../features/auth/authSlice';
import { resetItemsAsync } from '../features/cart/cartSlice';
import { resetOrder } from '../features/order/orderSlice';

const OrderSuccessPage = () => {
    const params = useParams();
    const user = useSelector(loggedInUser);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(resetItemsAsync(user.id))
        dispatch(resetOrder())
    },[dispatch,user.id])
  return (
    <div>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order Successfull with order No #{params.id}</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            TO check your order goto myorders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default OrderSuccessPage
