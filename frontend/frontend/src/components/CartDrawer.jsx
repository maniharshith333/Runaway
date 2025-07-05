import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoClose } from 'react-icons/io5';

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    cartItems,
    products,
    removeFromCart,
    addToCart,
    deleteFromCart,
    updateQuantity,
    delivery_fees,
    currency,
    token,
    navigate,
  } = useContext(ShopContext);

  const [cartList, setCartList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const updatedList = [];
    let newSubtotal = 0;

    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity <= 0) continue;

        newSubtotal += product.price * quantity;
        updatedList.push({
          ...product,
          size,
          quantity,
        });
      }
    }

    setCartList(updatedList);
    setSubtotal(newSubtotal);
  }, [cartItems, products]);

  const total = subtotal + delivery_fees;

  if (!isOpen) return null;

  const handleRemove = (itemId, size, quantity) => {
    if (quantity > 1) {
      updateQuantity(itemId, size, quantity - 1);
    } else {
      deleteFromCart(itemId, size);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out">
      <div className="flex justify-between items-center px-4 py-3 border-b font-semibold text-lg">
        <span>Your Cart</span>
        <IoClose className="text-2xl cursor-pointer" onClick={onClose} />
      </div>

      <div className="px-4 py-2 text-gray-600 text-sm">
        {cartList.length} item{cartList.length !== 1 ? 's' : ''} in your cart
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {cartList.length === 0 ? (
          <p className="text-center text-gray-400 mt-8">Your cart is empty.</p>
        ) : (
          cartList.map((item) => {
            const imageUrl = item.image?.[0]?.startsWith('http')
              ? item.image[0]
              : `${backendUrl}/${item.image?.[0]}`;

            return (
              <div key={`${item._id}-${item.size}`} className="flex gap-4 border-b pb-4">
                <img
                  src={imageUrl}
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.jpg';
                  }}
                  className="w-20 h-20 object-contain rounded border"
                />
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">Size: {item.size}</p>
                    <p className="font-semibold text-sm">
                      {currency} {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm mt-1">
                    <button
                      onClick={() => handleRemove(item._id, item.size, item.quantity)}
                      className="border px-2 rounded hover:bg-gray-100"
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item._id, item.size)}
                      className="border px-2 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                    <button
                      onClick={() => deleteFromCart(item._id, item.size)}
                      className="text-xs text-gray-500 underline ml-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="px-4 py-3 border-t space-y-1 text-sm font-medium">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{currency} {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{currency} {delivery_fees.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-base">
          <span>Total</span>
          <span>{currency} {total.toLocaleString()}</span>
        </div>

        <button
          className="mt-3 w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
          onClick={() => {
            onClose();
            navigate('/place-order');
          }}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;




