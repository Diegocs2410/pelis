import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

export const Movie = () => {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    try {
      const getMovie = async () => {
        const { data } = await axios.get('https://www.omdbapi.com/?apikey=d2bd72fb&i=' + id);
        setMovie(data);
        console.log(data);
      };
      getMovie();
    } catch (error) {
      console.log('Error en getMovie', error.message);
    }
  }, [id]);

  const handleClick = () => {
    // Si la longitud del historial es menor o igual a 2 entonces lleveme a la pagina principal, de lo contrario retroceda
    history.length <= 2 ? history.push('/') : history.goBack();
  };

  return (
    <div className='container text-white mb-5'>
      <h3 className='display-5 my-5 text-center'>{movie.Title} </h3>
      <div className='card ps-3 mb-5'>
        <div className='row'>
          <div className='col-md-4 p-3'>
            <img
              src={movie.Poster === 'N/A' ? '/img/movieNA.jpg' : movie.Poster}
              alt='imagen pelicula'
              className='img-fluid'
            />
          </div>
          <div className='col-md-8 p-3'>
            <h4>
              Description:{' '}
              <span>
                {' '}
                <span className='badge bg-secondary'>
                  <span className='me-2'>IMDB</span>
                  {movie.imdbRating}
                </span>
                <i class='bi bi-star ms-2'></i>
                <i class='bi bi-star'></i>
                <i class='bi bi-star'></i>{' '}
              </span>{' '}
              <p className='lead mt-3 text-underline'>{movie.Genre} </p>
            </h4>
            <p>{movie.Plot} </p>
            <p>
              <span className='h4'>Released: </span> {movie.Released}
            </p>
            <p>
              <span className='h5'>Director:</span> {movie.Director}
            </p>
            <p>
              <span className='h5'>Duration:</span> {movie.Runtime}
            </p>
            <p>
              <span className='h5'>Productora:</span> {movie.Production}
            </p>
            <button className='btn btn-success' onClick={handleClick}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
