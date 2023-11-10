import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loggedInUser } from './authSlice'
import Login from '../components/Login'


const Protected = ({children}) => {
    const user = useSelector(loggedInUser)
    if(user === null){
        return <Navigate to='/login' replace={true} ></Navigate>
        }
  return (
    children
  )
}

export default Protected
