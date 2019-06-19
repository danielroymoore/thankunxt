import React, { useState } from "react";

const Search = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const doSearch = (e) => {
    e.preventDefault();

    fetch('api/search', {
      method: 'post',
      body: JSON.stringify({ term: searchTerm })
    })
    .then(res => res.json())
    .then(response => { window.location = `/results/${response}`})
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>This is the Search Page</h1>
      <form action="/results" onSubmit={ doSearch }>
        <label>Search:</label>
        <input type="text" name="search_term" value={ searchTerm } onChange={ (e) => { setSearchTerm(e.target.value) } } />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Search;
