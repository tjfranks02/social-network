import React from 'react'

const CategorySelector = ({onSelect, categories}) => {

  const handleSelect  = (evnt) => {
    evnt.preventDefault();
    onSelect(evnt.target.value);
  };  

  const constructCategories = () => {
    categories = categories.map((category) => {
      return (
        <option key={category} value={category}>{category}</option>
      );
    });

    return categories;
  };

  return (
    <select onChange={(evnt) => handleSelect(evnt)}>
      <option defaultValue='' disabled hidden>Please select a category</option>
      {constructCategories()}
    </select>
  );
};

export default CategorySelector;