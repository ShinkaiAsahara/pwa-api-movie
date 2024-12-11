import React from 'react';
import '../Movie.css';

const Movie = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      <h2 className="movie-title">{movie.Title}</h2>
      <p className="movie-details"><strong>Year:</strong> {movie.Year}</p>
      <p className="movie-details"><strong>Genre:</strong> {movie.Genre}</p>
      <p className="movie-details"><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  );
};

export default Movie;
