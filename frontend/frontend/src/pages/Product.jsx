import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, setIsCartOpen, token ,navigate} = useContext(ShopContext);
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  

  useEffect(() => {
    const selected = products.find((item) => item._id === productId);
    setProduct(selected || {});
  }, [products, productId]);

  const sizes = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (!token) {
      toast("please login to add product to cart ")
      navigate("/login");
      return;
    }
    addToCart(productId, selectedSize);
    setIsCartOpen(true);
  };

  const relatedProducts = products
    .filter((item) => item.category === product.category && item._id !== product._id)
    .slice(0, 3);

  return (
    <div className="min-h-screen px-4 py-8 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-4 max-h-[600px] scrollbar-hide">
            {product.image?.map((img, i) => (
              <div key={i} className="min-w-[300px] max-w-[500px]">
                <img
                  src={img}
                  alt={`product-${i}`}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Left Section (Details) */}
        <div className="w-full lg:w-1/4 order-last lg:order-first text-sm">
          <p className="text-xs text-gray-600 mb-2">
            HOME › ALL PRODUCTS › {product.name?.toUpperCase()}
          </p>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg font-semibold text-gray-700 mb-4">Rs. {product.price}</p>

          {/* Mobile Size Selector */}
          <div className="lg:hidden my-6">
            <p className="font-medium text-sm mb-2">SIZE</p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 text-xs transition ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'border-black hover:bg-black hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
         <Link to = '/sizechart'><button className="bg-black text-white py-2 w-full text-sm font-semibold mb-2">SIZE CHART</button></Link>
            <button
              onClick={handleAddToCart}
              className="border border-black py-2 w-full text-sm font-medium hover:bg-black hover:text-white transition mb-2"
            >
              ADD TO CART
            </button>
          </div>

          <h2 className="font-semibold text-md mb-1 mt-6">DESCRIPTION</h2>
          <p className="text-gray-700 font-[Inter] text-sm mb-4">{product.description}</p>

          <h2 className="font-semibold text-md mb-1">DETAILS</h2>
          <ul className="list-disc font-[Inter] list-inside text-gray-700 text-sm space-y-1">
            <li>100% Cotton</li>
            <li>Weight - 280 GSM</li>
            <li>High-Density Print</li>
            <li>Reverse Wash Only</li>
          </ul>

          <p className="text-sm text-gray-500 mt-4">SHIPPING: Packed within 24 hours.</p>
        </div>

        {/* Desktop Size/Action Section */}
        <div className="w-full lg:w-1/4 hidden lg:flex flex-col gap-4 sticky top-10 h-fit">
          <p className="font-medium text-sm">SIZE</p>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border py-2 text-xs transition ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'border-black hover:bg-black hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

       <Link to = '/sizechart'><button className="bg-black text-white py-2 px-6 text-sm font-semibold">SIZE CHART</button></Link> 
          <button
            onClick={handleAddToCart}
            className="border border-black py-2 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* You May Also Like Section */}
      {relatedProducts.length > 0 && (
        <div className="w-full max-w-7xl mt-16">
          <h2 className="text-xl font-semibold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="bg-[#f5f5f5] p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="w-full h-60 object-contain rounded-lg mb-3"
                />
                <h3 className="text-sm font-medium text-gray-800 truncate">{item.name}</h3>
                <p className="text-sm text-gray-600">Rs. {item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;








