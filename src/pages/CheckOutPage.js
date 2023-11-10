import React from 'react'
import Navbar from '../features/navbar/Navbar'
import CheckOut from '../features/components/CheckOut'

const CheckOutPage = () => {
  return (
    <div>
      <Navbar children={<CheckOut />} />
    </div>
  )
}

export default CheckOutPage
