import React, { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import Header from '../components/Header'; 
import '../MovieList.css'; 

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');
  const apiKey = 'd9a968b5'; 
  const movieIds = [
    'tt0111161', 
    'tt0068646', 
    'tt0071562',
    'tt0468569', 
    'tt0050083', 
    'tt0108052',
    'tt0167260',
    'tt0137523', 
    'tt0080684', 
    'tt0109830', 
    'tt0133093', 
    'tt0167261', 
    'tt0110912',
    'tt0137523', 
    'tt0317248', 
    'tt0073486'  
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      const storedMovies = localStorage.getItem('movies');
      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      }

      try {
        const moviePromises = movieIds.map(id =>
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
        );
        const responses = await Promise.all(moviePromises);
        const moviesData = await Promise.all(responses.map(response => response.json()));
        const validMovies = moviesData.filter(movie => movie && movie.Response === "True");
        
        setMovies(validMovies.slice(0, 15));
        localStorage.setItem('movies', JSON.stringify(validMovies.slice(0, 15)));
      } catch (error) {
        const storedMovies = localStorage.getItem('movies');
        if (storedMovies) {
          setMovies(JSON.parse(storedMovies));
          setMessage('');
        } else {
          setMessage('Error fetching data and no cached movies available');
        }
      }
    };

    fetchMovies();
  }, [apiKey]); 

  const movieSearch = (query) => {
    if (!query) {
      setMessage('');
      return;
    }
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.Search) {
          setMovies(data.Search);
          localStorage.setItem('movies', JSON.stringify(data.Search));
          setMessage(''); 
        } else {
          setMovies([]); 
          setMessage('No Movies Found');
        }
      })
      .catch(() => {
        const storedMovies = localStorage.getItem('movies');
        if (storedMovies) {
          setMovies(JSON.parse(storedMovies));
          setMessage('Showing cached movies due to offline mode');
        } else {
          setMessage('Error fetching data and no cached movies available');
        }
      });
  };

  return (
    <div>
      <Header onSearch={movieSearch} />
      <div className='movie-list-container'>
        {message && <div>{message}</div>}
        {movies.length > 0 ? movies.map(movie => <Movie key={movie.imdbID} movie={movie} />) : <div>No movies available</div>}
      </div>
    </div>
  );
};

export default MovieList;
