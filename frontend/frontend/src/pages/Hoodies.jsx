import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Hoodies = () => {
  const { products, search } = useContext(ShopContext);
  const [filteredHoodies, setFilteredHoodies] = useState([]);

  useEffect(() => {
    const hoodieList = products
      .filter((product) => product.category === 'Hoodies&SweetShirts')
      .filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase())
      );

    setFilteredHoodies(hoodieList.reverse());
  }, [products, search]);

  return (
    <div>
      <div className="text-center py-8 text-3xl">
        <Title text1={'HOODIES &'} text2={'SWEATSHIRTS'} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
        {filteredHoodies.length > 0 ? (
          filteredHoodies.map((item) => (
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
            No hoodies or sweatshirts found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Hoodies;
