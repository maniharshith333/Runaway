import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

const Hoodie = () => {
  const { products } = useContext(ShopContext);
  const [hoodies, setHoodies] = useState([]);

  useEffect(() => {
    const hoodieList = products.filter(
      (product) => product.category === 'Hoodies&SweetShirts'
    );
    setHoodies(hoodieList.slice(0, 6).reverse());
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'HOODIES &'} text2={'SWEATSHIRTS*'} />
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-6'>
        {hoodies.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

      <div className='flex justify-center mt-8'>
        <Link to='/Hoodies'>
          <button className='px-6 py-2 border border-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md text-sm'>
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hoodie;
