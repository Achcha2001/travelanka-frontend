import React from 'react';

import './SearchBar.css';

function SearchBar() {
  return (
    
    <div className="search-bar">
      <input type="text" placeholder="Search for your destination..." />
      <select name="category">
        <option value="select">Select Category</option>
        <option value="category1">Economical</option>
        <option value="category2">Deluxe</option>
        <option value="category3">Super Deluxe</option>
      </select>
      <button>Search</button>
     
    </div>
    
  );
}

export default SearchBar;

  