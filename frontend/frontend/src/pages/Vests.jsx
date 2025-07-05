import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Vests = () => {
  const { products, search } = useContext(ShopContext);
  const [filteredVests, setFilteredVests] = useState([]);

  useEffect(() => {
    const filtered = products
      .filter((product) => product.category === 'Vests')
      .filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase())
      );

    setFilteredVests(filtered.reverse());
  }, [products, search]);

  return (
    <div>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'VESTS'} text2={'*'} />
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-6'>
        {filteredVests.length > 0 ? (
          filteredVests.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No vests found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Vests;
