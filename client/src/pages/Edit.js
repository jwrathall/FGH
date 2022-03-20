import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./components/form";
export default function Edit(props) {
     const [movie, setMovie] = useState(null);
     let { id } = useParams();

     useEffect(() => {
          fetchMovies();

          return () => {};
     }, [id]);

     async function fetchMovies() {
          console.log("fetch");
          let response = await fetch("https://localhost:7282/api/Inventory/" + id + "");
          const movies = await response.json();

          setMovie(movies);
     }

     return <div>{movie !== null && <Form data={movie}></Form>}</div>;
}
