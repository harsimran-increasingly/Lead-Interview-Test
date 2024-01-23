import React, { useState } from 'react';
import { useCart } from '../cartContext';


const ShoppingCart = () => {
   const { cart, addItemToCart, removeItemFromCart, clearCart } = useCart();

   const [showCart, setShowCart] = useState(false)
   return (
      <div>
         <div className='flex items-center gap-2' onClick={() => setShowCart(true)}><p>Cart</p><p className='font-light'>{cart.length}</p></div>
         {showCart && <div className='absolute bg-gray-100 h-full shadow-lg border w-80 p-2 top-0 right-0'>

            <div className="flex gap-2">
               <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={() => setShowCart(false)} > Close</button>
               <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={() => clearCart()}>Clear Cart</button>
            </div >

            <ul className=' border-t flex flex-col gap-2 text-sm font-light pt-5'>
               {cart.map(item => (
                  <li key={item.id} className='flex items-center justify-between'>
                     <p>{item.product_name} </p>  <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
                  </li>
               ))}
            </ul>

         </div>}

      </div>
   );
};

export default ShoppingCart;