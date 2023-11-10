import React from 'react'
import Navbar from '../features/navbar/Navbar'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import ProductList from '../features/product-list/components/ProductList'
const Home = () => {

  return (
    <div>
        <Navbar children = {<ProductList />} />
        {/* <LoginPage /> */}
        {/* <SignupPage /> */}
    </div>
  )
}

export default Home
