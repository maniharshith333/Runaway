import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrder = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.orderId = order._id;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };
 


  useEffect(() => {
    loadOrder();
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 sm:px-10 min-h-[80vh]">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orderData.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border rounded-lg px-4 bg-white shadow-sm space-y-2"
            >
              <div className="text-sm text-gray-500">
                Order Placed on {new Date(item.date).toLocaleDateString()}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    className="w-16 h-16 object-contain border rounded"
                    src={
                      item.image?.[0]?.startsWith('http')
                        ? item.image[0]
                        : `${backendUrl}/${item.image?.[0]}`
                    }
                    alt={item.name}
                  />
                  <div className="text-sm font-[Inter]">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-600">Size: {item.size}</p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p>
                    {currency}
                    {item.price.toLocaleString()}
                  </p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>

              <div onChange={(event) => statusHandler(event, order._id)} className="text-right font-[Inter] text-green-600 text-sm font-semibold pt-2">
                 
                Status: {item.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;


