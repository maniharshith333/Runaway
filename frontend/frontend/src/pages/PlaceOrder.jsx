import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const {
    cartItems,
    products,
    delivery_fees,
    backendUrl,
    token,
    setCartItems,
    getCartAmount,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const [cartList, setCartList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    paymentMethod: '', // Added for selection
  });

  const TAX_RATE = 0.1;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + delivery_fees;

  useEffect(() => {
    const fetchCartInfo = async () => {
      const updatedList = [];
      for (const productId in cartItems) {
        const product = products.find((p) => p._id === productId);
        if (!product) continue;

        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          updatedList.push({ ...product, size, quantity });
        }
      }

      setCartList(updatedList);

      if (token) {
        try {
          const serverSubtotal = await getCartAmount(token);
          setSubtotal(serverSubtotal);
        } catch (err) {
          console.error('Failed to fetch cart amount:', err);
        }
      }
    };

    if (products.length && Object.keys(cartItems).length > 0) {
      fetchCartInfo();
    }
  }, [cartItems, products, token, getCartAmount]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: subtotal + delivery_fees,
      };

      const method = formData.paymentMethod;

      if (method === 'cod') {
        const response = await axios.post(backendUrl + '/api/order/place', orderData, {
          headers: { token },
        });

        if (response.data.success) {
          toast.success('Order placed via Cash on Delivery');
          setCartItems({});
          navigate('/orders');
        } else {
          toast.error(response.data.message);
        }
      } else if (method === 'razorpay') {
           toast("Razor pay is not Activated now");
           return
        };

      
    }
    catch(error){

    }
  };

  return (
    <form
      onSubmit={onsubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-10"
    >
      <div className="flex flex-col gap-6 w-full sm:max-w-[55%]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <input required name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder="Email or phone" className="border p-2 rounded" />

        <div className="grid grid-cols-2 gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border p-2 rounded" type="text" placeholder="First name" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border p-2 rounded" type="text" placeholder="Last name" />
        </div>

        <input required onChange={onChangeHandler} name="street" value={formData.street} className="border p-2 rounded w-full" type="text" placeholder="Address" />
        <input className="border p-2 rounded w-full" type="text" placeholder="Apartment, suite (optional)" />

        <div className="grid grid-cols-3 gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className="border p-2 rounded" type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="state" value={formData.state} className="border p-2 rounded" type="text" placeholder="State" />
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border p-2 rounded" type="text" placeholder="PIN code" />
        </div>

        <select required onChange={onChangeHandler} name="country" value={formData.country} className="border p-2 rounded w-full">
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>

        <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border p-2 rounded w-full" type="text" placeholder="Phone" />

        <div>
          <h2 className="font-semibold text-lg mt-6 mb-2">Payment</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border rounded cursor-pointer">
              <input type="radio" name="paymentMethod" value="razorpay" checked={formData.paymentMethod === 'razorpay'} onChange={onChangeHandler} />
              <span className="font-medium">Razorpay (UPI, Cards, Wallets)</span>
            </label>
            <label className="flex items-center gap-3 p-4 border rounded cursor-pointer">
              <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={onChangeHandler} />
              <span className="font-medium">Cash on Delivery</span>
            </label>
          </div>
        </div>
      </div>

      <div className="w-full sm:max-w-[40%] bg-white p-6 rounded-lg shadow border space-y-5">
        {cartList.map((item) => {
          const imageUrl = item.image?.[0]?.startsWith('http') ? item.image[0] : `${backendUrl}/${item.image?.[0]}`;
          return (
            <div key={`${item._id}-${item.size}`} className="flex gap-4 items-center">
              <div className="relative">
                <img src={imageUrl} alt={item.name} className="w-16 h-16 object-contain rounded border" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 text-sm">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500 text-xs">Size: {item.size}</p>
              </div>
              <div className="text-sm font-medium">₹{item.price.toLocaleString()}</div>
            </div>
          );
        })}

        <div className="flex gap-2">
          <input type="text" placeholder="Discount code or gift card" className="flex-1 border px-3 py-2 rounded text-sm" />
          <button className="bg-gray-200 px-4 py-2 rounded text-sm font-medium">Apply</button>
        </div>

        <div className="space-y-2 text-sm border-t pt-4">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>₹{delivery_fees}</span></div>
        </div>

        <div className="flex justify-between items-center border-t pt-4 text-base font-bold">
          <span>Total</span><span>INR ₹{total.toFixed(2)}</span>
        </div>

        <div className="text-xs text-gray-500">Including ₹{tax.toFixed(2)} in taxes</div>

        <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;








