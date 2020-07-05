import React from "react"

function SearchBox({input, handleSearchSubmit, handleSearchChange }) {
    return (
      <div className="searchbox">
        <form className="form-inline">
         {/* this will be the input box for the searchbox */}
         <br></br>
         <input value={input} onChange={handleSearchChange}></input>
         <button type="submit" onClick={handleSearchSubmit}>Search</button>
        </form>
      </div>
    );
  }
  export default SearchBox;
  