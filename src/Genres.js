import React from 'react';

const Genres = ({ genres }) => {
  return (
    <>
      {genres.map((genre, id) => {
        return (
          <span key={id} className="badge">
            {genre}
          </span>
        );
      })}
    </>
  );
};

export default Genres;
