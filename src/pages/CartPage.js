import React from 'react'
import Cart from '../features/cart/Cart'
import Navbar from '../features/navbar/Navbar'

const CartPate = () => {
  return (
    <div>
      <Navbar children={<Cart />}
       />
    </div>
  )
}

export default CartPate
