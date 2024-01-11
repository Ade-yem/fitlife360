/* eslint-disable react/prop-types */
import React from 'react';

const Filter = ({ items, type, updateParams }) => {
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleChange = (event) => {
    const value = event.target.value;
    if (selectedItem === value) {
      setSelectedItem(null)
    }else setSelectedItem(value);
    updateParams(type, value)
  };
  

  return (
    <div className='border-b-2 mb-4 w-[98%]'>
      <p className="text-bold text-base m-2 text-gray-500">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      <div className="flex flex-col space-y-2">
        {items.map((item) => (
          <label key={item} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={item}
              checked={selectedItem === item}
              onChange={handleChange}
              className="m-2 p-4 w-5 h-5 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className={`text-gray-700 ${selectedItem === item? 'text-primary' : 'text-gray-500'}`}>
              {item.split('_').join(' ')}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
