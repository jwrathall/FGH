import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Movie from "./components/movie";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export default function Inventory() {
     const history = useNavigate();
     const [movies, setMovies] = useState([]);
     useEffect(() => {
          fetchMovies();
          return () => {};
     }, []);

     async function fetchMovies() {
          console.log("fetch");
          let response = await fetch("https://localhost:7282/api/Inventory");
          const movies = await response.json();
          console.log(movies);
          setMovies(movies);
     }

     return (
          <div>
               {movies.length > 0 ? (
                    <div>
                         <div>
                              <Button color="primary" onClick={() => history("/add")}>
                                   Add New
                              </Button>
                         </div>
                         <TableContainer component={Paper}>
                              <Table>
                                   <TableHead>
                                        <TableRow>
                                             <TableCell>Name</TableCell>
                                             <TableCell>Director</TableCell>
                                             <TableCell>Genre</TableCell>
                                             <TableCell>Release</TableCell>
                                             <TableCell>Cost</TableCell>
                                             <TableCell>Retail</TableCell>
                                             <TableCell>Quantity</TableCell>
                                             <TableCell></TableCell>
                                        </TableRow>
                                   </TableHead>

                                   {movies.length > 0 && (
                                        <TableBody>
                                             {movies.map((movie, i) => {
                                                  return <Movie data={movie} key={i} update={fetchMovies}></Movie>;
                                             })}
                                        </TableBody>
                                   )}
                              </Table>
                         </TableContainer>
                    </div>
               ) : (
                    <div> no Movies to show</div>
               )}
          </div>
     );
}
