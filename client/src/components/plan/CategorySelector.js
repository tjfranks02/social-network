import React, {useEffect} from 'react'

const CategorySelector = ({onSelect}) => {

  const handleSelect  = (evnt) => {
    evnt.preventDefault();
    onSelect(evnt.target.value);
  };  

  const constructCategories = () => {
    //in future will have some kind of async function to get all category types.
    let categories = ['Running', 'Reading'];

    categories = categories.map((category) => {
      return (
        <option key={category} value={category}>{category}</option>
      );
    });

    return (
      categories
    );
  };

  return (
    <select onChange={(evnt) => handleSelect(evnt)}>
      {constructCategories()}
    </select>
  );
};

export default CategorySelector;