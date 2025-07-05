import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
     const response = await axios.post(backendUrl + '/api/order/list', {}, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

 const statusHandler = async (event, orderId) => {
  try {
    const response = await axios.post(
      backendUrl + '/api/order/status',
      { orderId, status: event.target.value }, // ✅ include these!
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success('Order status updated');
      await fetchAllOrders();
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error.message);
  }
};


  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid gap-4 sm:grid-cols-[2fr_2fr_1fr_1fr_1fr] items-start bg-white p-4 sm:p-6 rounded-lg shadow-md border text-sm"
          >
            {/* Products & Buyer Info */}
            <div className="space-y-2">
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <img
                      src={item.image?.[0]?.startsWith('http') ? item.image[0] : `${backendUrl}/${item.image[0]}`}
                      alt={item.name}
                      className="w-10 h-10 object-contain rounded border"
                    />
                    <p>
                      <span className="font-medium">{item.name}</span> x {item.quantity} <span className="text-gray-500">(Size: {item.size})</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <p className="font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
                <p>📞 {order.address.phone}</p>
              </div>
            </div>

            {/* Order Info */}
            <div className="space-y-1">
              <p>🛒 <strong>{order.items.length}</strong> item(s)</p>
              <p>💳 Method: {order.paymentMethod}</p>
              <p>💰 Payment: <span className={order.payment ? "text-green-600 font-medium" : "text-red-600"}>{order.payment ? "Done" : "Pending"}</span></p>
              <p>📅 {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <div className="text-lg font-bold text-blue-600">
              {currency} {order.amount.toLocaleString()}
            </div>

            {/* Status Selector */}
            <div>
              <select
              onChange={(event) =>statusHandler(event,order._id)}
                 value={order.status}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option  value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
