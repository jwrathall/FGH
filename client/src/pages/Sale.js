import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieSale from "./components/movieSale";
import CartItem from "./components/cartItem";
import Payment from "./components/payment";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
     bottom: {
          borderBottom: "1px",
     },
}));

export default function Sale() {
     const classes = useStyles();
     const history = useNavigate();
     const [movies, setMovies] = useState([]);
     const [cart, setCart] = useState([]);
     const [subTotal, setSubTotal] = useState([]);
     const [subTotalValue, setSubTotalValue] = useState(0);
     const [totalValue, setTotalValue] = useState(0);
     const [rerender, setRerender] = useState(false);
     const taxRate = 0.13;

     useEffect(() => {
          console.log("sales page");
          fetchMovies();
          return () => {};
     }, []);

     useEffect(() => {
          function reCalculate() {
               if (subTotal.length >= 0) {
                    let sum = subTotal.reduce((p, c, i) => {
                         return p + c.retail;
                    }, 0);

                    setSubTotalValue(sum);
                    setTotalValue(sum * taxRate + sum);
               }
          }

          reCalculate();

          return () => {};
     }, [subTotal, rerender]);

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

     const removeFromCart = (movie) => {
          const result = cart.filter((e) => e.id !== movie.id);
          setCart(result);
          if (result.length === 0) {
               setSubTotal([]);
               setSubTotalValue(0);
          } else {
               const value = subTotal.filter((e) => e.id !== movie.id);
               setSubTotal(value);
          }
     };

     const addToSubtotal = (retail) => {
          let foundIndex = subTotal.findIndex((x) => x.id === retail.id);
          if (foundIndex !== -1) {
               let value = subTotal;
               value[foundIndex] = retail;
               setSubTotal(value);
               setRerender(!rerender);
          } else {
               setSubTotal([...subTotal, retail]);
          }
     };

     const clearCart = () => {
          let emptyCart = cart;
          emptyCart.length = 0;
          setCart(emptyCart);
          setSubTotal([]);
          setSubTotalValue(0);
     };

     return (
          <Grid container spacing={2} style={{ marginTop: "25px" }}>
               <Grid item md={6}>
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
               <Grid item md={6}>
                    <Grid container spacing={2}>
                         <Grid item md={12}>
                              {cart.length > 0 && (
                                   <div>
                                        {cart.map((item, i) => {
                                             return <CartItem data={item} key={i} subtotal={addToSubtotal} remove={removeFromCart}></CartItem>;
                                        })}
                                   </div>
                              )}
                         </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                         <Grid item xs={4}>
                              <Button variant="outlined" color="primary" onClick={clearCart}>
                                   {" "}
                                   Clear
                              </Button>
                         </Grid>
                         <Grid item xs={5}></Grid>
                         <Grid item xs={3} alignItems="center">
                              <div>SubTotal: {subTotalValue > 0 && <span>{subTotalValue}</span>}</div>
                              <div>Tax: {subTotalValue > 0 && <span>{(subTotalValue * taxRate).toFixed(2)}</span>}</div>
                              <div>Total: {subTotalValue > 0 && <span>{totalValue.toFixed(2)}</span>}</div>
                         </Grid>
                    </Grid>
               </Grid>
          </Grid>
     );
}
