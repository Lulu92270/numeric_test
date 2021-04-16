import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './small_components/Tooltip.scss';

const MovieShow = ({match}) => {
  const history = useHistory();
  const [movie, setMovie] = useState(false);

  const api_key = "cd95ee3e9f8445332a65a4300abd82eb";
  const BASE_URL = "https://api.themoviedb.org/3";
  const imgMovie = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    const getMovie = axios.create({ baseURL: BASE_URL })
    .get(`/movie/${match.params.id}`, { params: { api_key } });

    getMovie.then(response => {
      setMovie(response.data)
      console.log(response.data)
    });
  },[match]);


  const handleLike = () => {
    // NOT WORKING REQUIRED TO RETRIEVE SESSION TOKEN
    const postURL = `${BASE_URL}/movie/${match.params.id}/rating?api_key=${api_key}`
    // const postRating = axios.create({ baseURL: BASE_URL })
    // .post(`/movie/${match.params.id}/rating`, {"value": "8.5"}, { params: { api_key } });
    // postRating.then(r => console.log(r))
    //           .catch(error => console.log("Post Rating Error", error))
    axios.post(postURL, {"value": "8.5"})
    .then(r => console.log(r))
    .catch(error => console.log("Post Rating Error", error))
  }

  return (
    <div className="home">
      <Navbar homePage={false} />
      {movie &&
        <div className="App">
          <h1 style={{position: "absolute", width:"auto", top:"0", color: "white"}}>
            {`${movie.original_title} - ${movie.release_date.slice(0,4)}`}
          </h1>
          <header className="App-header">
            <div style={{display: "flex"}}>
              <img 
                alt="Img"
                src={`${imgMovie}${movie.poster_path}`}
                style={{width: "300px", height: "450px", marginRight: "20px"}}
              />
              <div className="movie-details">
                <p style={{fontWeight: "bold", fontSize: "30px", textAlign: "left"}}>{`Genre:`}</p>
                <ul>
                  {movie.genres.map((genre, index) => {
                  return ( 
                    <li key={index} style={{textAlign: "left"}} >{genre.name}</li>
                  );
                  })}
                </ul>
                <p style={{fontWeight: "bold", fontSize: "30px", textAlign: "left"}}>{`Synopsis:`}</p>
                <p style={{textAlign: "left"}}>{movie.overview}</p>
              </div>
            </div>
            <button 
              className="button"
              onClick={() => history.push("/")}
              style={{marginLeft: "30px", width: "200px", height: "50px"}}
            >
              Back
            </button>
            <button 
              className="button"
              onClick={handleLike}
              style={{marginLeft: "30px", width: "200px", height: "50px"}}
            >
              Like
            </button>
          </header>
        </div>
      }
    </div>
  );
}

export default MovieShow;