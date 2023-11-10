import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteToCartAsync,
  fetchItems,
  fetchItemsByUserIdAsync,
  updateToCartAsync,
} from "../cart/cartSlice";
import { addAddressAsync, loggedInUser, updateAddress } from "../auth/authSlice";
import { useForm } from "react-hook-form";
import { AddorderAsync, currentOrder, orders } from "../order/orderSlice";

const CheckOut = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const user = useSelector(loggedInUser);
  const items = useSelector(fetchItems);
  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync(user?.id));
  }, [dispatch, user.id]);
  const totalAmount = items.reduce((amount, item) => {
    const price = item.price * item.quantity;
    return (amount += price);
  }, 0);
  const totalItems = items.reduce((quantity, item) => {
    return (quantity += item.quantity);
  }, 0);
  const handleQuanity = (e, item) => {
    dispatch(updateToCartAsync({ ...item, quantity: +e.target.value }));
  };
  const handleRemove = (e, id) => {
    dispatch(deleteToCartAsync(id));
  };
  const testingFun = (data) => {
    dispatch(addAddressAsync({...user,address:[...user.address,data]}));
    reset();
  }
  const [selectedAddress,setAddress] = useState(null);
  const [selectedPayment,setPayment] = useState(null);
  const handleAddress =  (e) =>{
    setAddress(user.address[e.target.value]);
  }
  const handlePayment =  (e) =>{
    setPayment(e.target.value);
  }
  const handleOrder = () =>{
    const order = {items,totalAmount,totalItems,selectedAddress,selectedPayment,user:user.id};
    dispatch(AddorderAsync(order));
  }
  const order = useSelector(currentOrder);
  return (
    <>
    {order && <Navigate to={`/order-success/${order.id}`} replace={true}></Navigate>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form className="bg-white px-7 mt-12" noValidate
              class="space-y-6"
              onSubmit={handleSubmit((data) => {
                testingFun(data)
              })}>
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12">
                <h2 class=" text-2xl font-semibold leading-7 py-5 text-gray-900">
                  Personal Information
                </h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div class="mt-8 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2">
                  <div class="sm:col-span-4">
                    <label
                      for="name"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <div class="mt-2">
                      <input
                        type="text"
                        {...register(
                          "name",
                          { required: "name is required" ,
                          }
                        )}
                        id="name"
                        autocomplete="given-name"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div class="sm:col-span-4">
                    <label
                      for="email"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div class="mt-2">
                      <input
                        id="email"
                        {...register(
                          "email",
                          { required: "email is required" ,
                          }
                        )}
                        type="email"
                        autocomplete="email"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  <div class="sm:col-span-4">
                    <label
                      for="phone"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div class="mt-2">
                      <input
                        id="phone"
                        {...register(
                          "phone",
                          { required: "phone is required" ,
                          }
                        )}
                        type="phone"
                        autocomplete="phone"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div class="col-span-full">
                    <label
                      for="street"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street 
                    </label>
                    <div class="mt-2">
                      <input
                        type="text"
                        {...register(
                          "street",
                          { required: "street is required" ,
                          }
                        )}
                        id="street"
                        autocomplete="street"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-2 sm:col-start-1">
                    <label
                      for="city"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div class="mt-2">
                      <input
                        type="text"
                        {...register(
                          "city",
                          { required: "city is required" ,
                          }
                        )}
                        id="city"

                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>


                  <div class="sm:col-span-2">
                    <label
                      for="pincode"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div class="mt-2">
                      <input
                        type="text"
                        {...register(
                          "pincode",
                          { required: "pincode is required" ,
                          }
                        )}
                        id="pincode"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-6 flex items-center justify-end pt-3 gap-x-6">
                  <button
                    type="button"
                    class="text-sm py-3 font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    class="rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>

              <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">
                  Adress
                </h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">
                  Choose from the existing adress
                </p>
                <ul role="list">
                  {user?.address?.map((adress,index) => (
                    <li
                      key={adress.email}
                      className="flex justify-between gap-x-6 py-5 border-solid border-2 border-black m-2 p-3"
                    >
                      <div className="flex gap-x-4">
                        <input
                          id="card"
                          name="address"
                          type="radio"
                          value={index}
                          onChange={(e)=>handleAddress(e)}
                          class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {adress.name}
                          </p>
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {adress.email}
                          </p>
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {adress.phone}
                          </p>
                          
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        
                        <p className="text-sm leading-6 text-gray-900">
                          Street : {adress.street}
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          City: {adress.city}
                        </p>
                        <p className="text-xs leading-5 text-gray-500">
                          Pincode: {adress.pincode}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div class="mt-10 space-y-10">
                  <fieldset>
                    <legend class="text-sm font-semibold leading-6 text-gray-900">
                      Choose A Payment
                    </legend>
                    <div class="mt-6 space-y-6">
                      <div class="flex items-center gap-x-3">
                        <input
                          id="card"
                          name="card"
                          onChange={(e) => handlePayment(e)}
                          value="card"
                          type="radio"
                          class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          for="card"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card
                        </label>
                      </div>
                      <div class="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="card"
                          type="radio"
                          value="cash"
                          onChange={(e) => handlePayment(e)}
                          class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          for="cash"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
            </div>
          </form>
          
        </div>
        <div className="lg:col-span-2">
          {items && (
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="mt-8">
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-4xl text-gray-800">
                  Cart
                </h2>
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
                            <p className="mt-1 text-sm text-gray-500">
                              {item.rating}
                            </p>
                          </div>
                          <div className="flex flex-1 items-e2nd justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                for="password"
                                class="inline text-sm font-medium leading-6 mr-3 text-gray-900"
                              >
                                Qty
                              </label>
                              <select onChange={(e) => handleQuanity(e, item)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) => handleRemove(e, item.id)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
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
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                  onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
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
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default CheckOut;
