import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieSale from "./components/movieSale";
import CartItem from "./components/cartItem";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default function Sale() {
     const history = useNavigate();
     const [movies, setMovies] = useState([]);
     const [cart, setCart] = useState([]);
     const [subTotal, setSubTotal] = useState([]);
     const [subTotalValue, setSubTotalValue] = useState(0);

     useEffect(() => {
          console.log("sales page");
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

     const addToCart = (movie) => {
          const found = cart.find((e) => e.id === movie.id);
          if (found === undefined) setCart([...cart, movie]);
     };

     const addToSubtotal = (retail) => {
          let foundIndex = subTotal.findIndex((x) => x.id === retail.id);
          if (foundIndex !== -1) {
               let value = subTotal;
               value[foundIndex] = retail;
               setSubTotal(value);
          } else {
               setSubTotal([...subTotal, retail]);
          }

          let sum = subTotal.reduce((p, c, i) => {
               return p + c.retail;
          }, 0);

          console.log(sum);
     };

     return (
          <Grid container spacing={2}>
               <Grid item xs={8}>
                    {movies.length > 0 ? (
                         <div>
                              <TableContainer component={Paper}>
                                   <Table>
                                        <TableHead>
                                             <TableRow>
                                                  <TableCell>Name</TableCell>
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
                                                       return <MovieSale data={movie} key={i} toCart={addToCart}></MovieSale>;
                                                  })}
                                             </TableBody>
                                        )}
                                   </Table>
                              </TableContainer>
                         </div>
                    ) : (
                         <div> no Movies to show</div>
                    )}
               </Grid>
               <Grid item xs={4}>
                    {cart.length > 0 && (
                         <div>
                              {cart.map((item, i) => {
                                   return <CartItem data={item} key={i} subtotal={addToSubtotal}></CartItem>;
                              })}
                         </div>
                    )}
                    <Grid item xs={4}>
                         x
                    </Grid>
                    <Grid item xs={3}>
                         SUBTOTAL: {subTotal}
                    </Grid>
               </Grid>
          </Grid>
     );
}