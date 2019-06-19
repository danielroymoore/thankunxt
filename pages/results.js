import React from "react";
import fetch from 'isomorphic-unfetch';

const Results = (props) => (
  <div>
    <h1>Result of stars: { props.show.name }</h1>
    <a href="/search">Back to Search</a>
  </div>
);

Results.getInitialProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();
  return { show }
}

export default Results;
