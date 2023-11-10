import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { loggedInUser } from "./authSlice";

// A mock function to mimic making an async request for data
export function AddUser(userData) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/users',{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    });
    const data = await response.json()
    resolve({data})
  })
}

export function AddAdress(update) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/users/'+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    });
    const data = await response.json()
    resolve({data})
  })
}
export function Logout(id) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/users/'+id)
    const data = await response.json()
    resolve({data})
  })
}
export function checkUser(logInfo) {
  return new Promise(async(resolve,reject) =>{
    const email = logInfo.email;
    const password = logInfo.password;
    const response = await fetch(`http://localhost:8000/users/?email=${email}`)
    const data = await response.json()
    if(data.length){
      if(password === data[0].password){
        resolve({data:data[0]})
      }
      else{
        reject("wrong credentials")
      }
    }
    else{
      reject("user not found")
    }
    resolve({data})
  })
}
