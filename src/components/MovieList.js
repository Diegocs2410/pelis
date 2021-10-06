import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
const queryString = require('query-string');

export const MovieList = () => {
  // Hooks de react-router-dom
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState([
    {
      Title: '',
      Year: '',
      imdbID: '',
      Type: '',
      Poster: '',
      ok: true,
    },
  ]);
  useEffect(() => {
    // Sacamos la q de la barra de navegacion
    const { q = '' } = queryString.parse(location.search);
    if (q === '') {
      setMovies([
        {
          Title: '',
          Year: '',
          imdbID: '',
          Type: '',
          Poster: '',
          ok: true,
        },
      ]);
    }
    getMovies(q);
  }, [location.search]);

  const getMovies = async (q) => {
    try {
      const {
        data: { Search },
      } = await axios.get(`https://www.omdbapi.com/?apikey=d2bd72fb&s=${q}`);
      setMovies(Search);
    } catch (error) {
      console.log('Error en getMovies', error.message);
    }
  };
  const search = (e) => {
    history.push('?q=' + e.target.value);
    getMovies(e.target.value);
  };
  return (
    <div className='container'>
      <section className='col-md-8 form-group mx-auto mt-3'>
        <h1 className='text-center text-white'>Movie Info</h1>
        <input
          type='text'
          placeholder='Search'
          className='form-control mt-3'
          onChange={(e) => search(e)}
        />
      </section>
      <section className='row'>
        {typeof movies !== 'undefined' &&
          movies[0].ok !== true &&
          movies?.map((mov) => (
            <Link
              to={`/description/${mov.imdbID}`}
              className='col-md-4 my-3 text-decoration-none'
              key={mov.imdbID}
            >
              <div className='card'>
                <div className='card-header'>
                  <img
                    src={mov.Poster === 'N/A' ? 'img/movieNA.jpg' : mov.Poster}
                    alt='img peli'
                    className='card-img-top'
                  />
                </div>
                <div className='card-body'>
                  <h4>{mov.Title} </h4>
                </div>
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
};
