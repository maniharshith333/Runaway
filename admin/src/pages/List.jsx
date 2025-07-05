import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch product list');
    }
  };

  const removeProduct = async (id) => {
  try {
    const response = await axios.post(
      backendUrl + '/api/product/remove',
      { id },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList(); // Refresh the list after deletion
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error('Failed to delete product');
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">All Products</h2>

      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center px-4 py-2 bg-gray-200 rounded text-sm font-semibold">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center px-4 py-3 border rounded-md shadow-sm bg-white text-sm"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency} {item.price}</p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-600 hover:text-red-800 font-bold text-center"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-gray-500 mt-4 text-center">No products found.</p>
      )}
    </div>
  );
};

export default List;

