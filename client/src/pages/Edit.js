import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "./components/form";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
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
