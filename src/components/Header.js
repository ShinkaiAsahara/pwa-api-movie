import React, { useState } from 'react';
import '../Header.css'; 

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const movieSearch = () => {
    if (searchQuery.trim()) { 
      onSearch(searchQuery);
      setSearchQuery(''); 
    }
  };

  return (
    <header className="header">
      <a href="#" className="header-logo">Movie and Chill</a>
      <div className="header-search">
        <input
          type="text"
          className="header-search-input"
          placeholder="Search titles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && movieSearch()}/>
      </div>
    </header>
  );
};

export default Header;
