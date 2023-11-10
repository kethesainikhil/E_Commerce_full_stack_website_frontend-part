import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loggedInUser } from '../auth/authSlice';

export default function UserOrder() {
  const user = useSelector(loggedInUser);

  const dispatch = useDispatch();
  return (
    <div>
      <div>
      
      </div>
    </div>
  );
}
