import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  deleteToCartAsync, fetchItems, fetchItemsByUserIdAsync, updateToCartAsync } from './cartSlice';
import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { loggedInUser } from '../auth/authSlice';
// const items = [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-item-01.jpg',
//     imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-item-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   // More items...
// ]


export default function Cart() {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true)
  
  const user = useSelector(loggedInUser);
  const items = useSelector(fetchItems);
  useEffect(()=>{
    dispatch(fetchItemsByUserIdAsync(user?.id));
  },[dispatch,user.id])

  const totalAmount = items.reduce((amount,item)=>{
    const price = item.price * item.quantity
    return amount += price
  },0)
  const totalItems = items.reduce((quantity,item)=>{
    return quantity += item.quantity
  },0)
  const handleQuanity  = (e,item) =>{
    dispatch(updateToCartAsync({...item,quantity: +e.target.value}));
  }
  const handleRemove = (e,id) =>{
    dispatch(deleteToCartAsync(id))
  }
  return (
    <>
    {items && <div className="mx-auto mt-12 bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                          <div className="mt-8">
                          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-4xl text-gray-800">Cart</h2>
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.images[0]}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <p>{item.title}</p>
                                      </h3>
                                      <p className="ml-4">{item.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.rating}</p>
                                  </div>
                                  <div className="flex flex-1 items-e2nd justify-between text-sm">
                                 <div className="text-gray-500">
                                    <label for="password" class="inline text-sm font-medium leading-6 mr-3 text-gray-900">Qty</label>
                                    <select onChange={(e)=>handleQuanity(e,item)} >
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                    </select>
                                    </div>

                                    <div className="flex">
                                      <button onClick={(e)=>handleRemove(e,item.id)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
                      <div className="flex justify-between -mt-2 text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>${totalAmount}</p>
                      </div>
                      <div className="flex justify-between -mt-4 text-base font-medium text-gray-900">
                        <p>Total Items</p>
                        <p>{totalItems}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link to="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link to="/">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                          </Link>
                        </p>
                      </div>
                    </div>
      </div>}
    </>
    
  );
}
