import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useForm} from "react-hook-form"
import { checkUserAsync, loggedInUser } from '../auth/authSlice';
import { Link, Navigate, useRouteLoaderData } from 'react-router-dom';
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(loggedInUser)
  const error = useSelector(loggedInUser)
  const testingFun = (userData) =>{
    dispatch(checkUserAsync({email:userData.email,password:userData.password}))
  }
  if(user){
    return <Navigate to="/" replace={true}></Navigate>
  }
  return (
    <div>
      <div>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log In to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" onSubmit={handleSubmit((data) => {
                testingFun(data)
              })}>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
                  <input
                    id="email"
                    {...register(
                      "email",
                      { required: "email is required" ,
                        pattern:{ value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message:"email is not valid"}
                      }
                    )}
                    type="email"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is required",   
                    })}
                    type="password"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                  
                  <p className="text-red-500">{error}</p>
                </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log In</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <Link to="/signup" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create An Account</Link>
    </p>
  </div>
</div>
      </div>
    </div>
  );
}
