import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutUserAsync, loggedInUser } from '../auth/authSlice'
import { Navigate } from 'react-router-dom';

const LogOut = () => {
    const user = useSelector(loggedInUser);
    console.log(user)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(LogoutUserAsync(user?.id))
    },[dispatch,user?.id])
  return (
    <div>
      {!user && <Navigate to='/login' replace={true}></Navigate>}
    </div>
  )
}

export default LogOut
