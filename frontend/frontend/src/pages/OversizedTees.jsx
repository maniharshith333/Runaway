import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const OversizedTees = () => {
  const { products, search } = useContext(ShopContext);
  const [filteredOversizedTees, setFilteredOversizedTees] = useState([]);

  useEffect(() => {
    const filtered = products
      .filter((product) => product.category === 'Oversized-tees')
      .filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase())
      );

    setFilteredOversizedTees(filtered.reverse());
  }, [products, search]);

  return (
    <div>
      <div className="text-center py-8 text-3xl">
        <Title text1={'OVERSIZED'} text2={'TEES*'} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
        {filteredOversizedTees.length > 0 ? (
          filteredOversizedTees.map((item) => (
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
            No oversized tees found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default OversizedTees;
