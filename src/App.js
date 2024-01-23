import { useEffect, useState } from 'react';
import { fetchProducts } from './utils';
import Price from './atoms/Price';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import { useCart } from './cartContext';

function App() {
  const { cart, addItemToCart, removeItemFromCart, clearCart } = useCart();
  const [products, setProducts] = useState(null)
  const [activeProducts, setActiveProducts] = useState(null)

  useEffect(() => {
    const getProducts = async () => {
      let productsRetreived = await fetchProducts("https://www.increasingly.co/Clients/Interview/products.json")
      setProducts(productsRetreived.responseData.products)
      setActiveProducts(productsRetreived.responseData.products)
    }
    getProducts()
  }, [])

  const filterByBrands = (brand) => {
    let filterBrands = products.filter((product) => product.brand == brand)
    setActiveProducts(filterBrands)
  }

  const filterByCategories = (category) => {
    let filterBrands = products.filter((product) => product.category == category)
    setActiveProducts(filterBrands)
  }

  const resetFilter = () => {
    setActiveProducts(products)
  }

  console.log(products)

  if (!products) {
    return (
      <div role="status" className='flex justify-center items-center h-lvh'>
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    )
  }


  return (
    <div>

      <div className='flex flex-col md:flex-row'>
        <Filter resetFilter={resetFilter} filterByBrands={filterByBrands} filterByCategories={filterByCategories} products={products} />
        <div className='container m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 gap-5'>
          {activeProducts.map((product) => {
            return (
              <div key={product.id} className='border p-3 shadow-sm rounded'>
                <p className='text-sm mb-2'> {product.category}</p>
                <img src={product.imageUrl} alt={product.product_name} className=' mb-3 rounded' />
                <h3 className='font-semibold'>{product.product_name}</h3>
                <p className='text-sm mb-2'> {product.brand}</p>
                <Price price={product.price} discounted_price={product.discounted_price} />
                <div className='flex items-center mt-2 gap-2 '>
                  <button onClick={() => addItemToCart(product)} className='font-bold  text-sm bg-blue-800 text-white hover:bg-blue-700 transition-all border rounded p-2  w-full'>Add To Cart</button>

                </div>

              </div>
            )
          })}
        </div>
      </div>

    </div>
  );
}

export default App;
