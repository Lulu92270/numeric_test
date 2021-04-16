import React, { useEffect, useState } from "react";
import axios from 'axios';
import Select from './small_components/Select';
import { useHistory } from 'react-router-dom';

import './App.scss';
import Navbar from './Navbar';

const App = () => {
  const history = useHistory();

  const popularOrTopRated = ["Popular Movies", "Latest Movies"];
  const [dataPopular, setDataPopular] = useState();
  const [dataTopRated, setDataTopRated] = useState();
  const [selectPopularOrTopRated, setSelectPopularOrTopRated] = useState(popularOrTopRated[0])
  const [popularOrTopRatedArray, setPopularOrTopRatedArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const api_key = "cd95ee3e9f8445332a65a4300abd82eb";
  const BASE_URL = "https://api.themoviedb.org/3";
  const imgMovie = "https://image.tmdb.org/t/p/w500/";

  const getPopular = axios.create({ baseURL: BASE_URL })
  .get("movie/popular", { params: { api_key } });
  const getTopRated = axios.create({ baseURL: BASE_URL })
  .get("movie/top_rated", { params: { api_key } });

  useEffect(() => {
    getPopular.then(response => 
      {
        setDataPopular(response.data.results)
        setPopularOrTopRatedArray(response.data.results)
      }
    );
    getTopRated.then(response => {
      setDataTopRated(response.data.results)
    });
  }, []);

  const handleSelect = (e) => {
    const movieType = popularOrTopRated.find(type => e.target.value === type)
    movieType === "Popular Movies" ? setPopularOrTopRatedArray(dataPopular) : setPopularOrTopRatedArray(dataTopRated)
    setSelectPopularOrTopRated(e.target.value)
  }
  // Search Section
  const filteredMovies = popularOrTopRatedArray.filter(movie => movie.original_title.match(new RegExp(searchTerm, 'i')));

  return (
    <div className="home">
      <Navbar 
        homePage={true}
        triggerSearch={(string) => setSearchTerm(string)}
      />
      <div className="App">
        <header className="App-header">
          <Select
            options={popularOrTopRated}
            value={selectPopularOrTopRated} tooltip=""
            onChange={handleSelect}
          />
          {filteredMovies.map((movie, key) => (
            <div 
              key={key}
              style={{cursor: "pointer"}}
              onClick={() => history.push(`/movie/${movie.id}`)}
            >
              <img alt="ImageMovie" src={`${imgMovie}${movie.poster_path}`}/>
              <p>{movie.original_title}</p>
              <p>{`Rating: ${movie.vote_average}`}</p>
            </div>
          ))}
        </header>
      </div>
    </div>
  );
}

export default App;
