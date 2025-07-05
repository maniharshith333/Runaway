import React from 'react'

const SizeChart = () => {
  return (
     <div className="min-h-screen flex items-center justify-center px-4 py-12 ">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Size Chart</h1>
        <img
          src="/sizechart.png"
          alt="Size Chart"
          className="w-full h-auto max-w-full border rounded-md shadow-md"
        />
      </div>
    </div>
  )
}

export default SizeChart