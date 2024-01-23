import React from 'react'
import ShoppingCart from './ShoppingCart'
function Navbar() {
  return (
    <div className='px-10 py-2 border-b font-semibold flex w-full flex justify-between items-center'>
      <p>Home</p>
     <ShoppingCart/>
    </div>
  )
}

export default Navbar