import React from "react";
import './styles/Navbar.scss';

const Navbar = ({homePage, triggerSearch}) => {
  return (
    <nav>
      <div className="header">
      {homePage && 
        <div className="wrap">
          <div className="search">
              <input 
                type="text"
                className="searchTerm"
                placeholder="Recherche un film, une série, un artiste..."
                onChange={(event) => {triggerSearch(event.target.value)}}
              />
          </div>
        </div>
      }
      </div>
    </nav>
  );
}

export default Navbar;
