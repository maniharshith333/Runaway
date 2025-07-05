import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';


const SearchBar = () => {

    const {search,setSearch , showSearch,setShowSearch} = useContext(ShopContext);
    

    

  return showSearch  ?   (
    <div className='border-t border-b bg-gray-50 text-center' >
        <div className='inline-flex item-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
           <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm  ' type='text' placeholder='Search' />
           <FontAwesomeIcon icon={faSearch} className="text-gray-500 w-5 cursor-pointer" />

        </div>
        <p
  onClick={() => {
    setShowSearch(false);
    setSearch('');
  }}
  className="inline-block ml-3 text-red-500 font-bold cursor-pointer"
  title="Close Search"
>
  ×
</p>

    </div>
  ) : null
}

export default SearchBar