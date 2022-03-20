import React, { useEffect, useState, useRef } from "react";
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
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

import ReactToPrint, { PrintContextConsumer } from "react-to-print";

const useStyles = makeStyles((theme) => ({
     bottom: {
          borderBottom: "1px",
     },
}));

export default function Sale() {
     const componentRef = useRef();
     const classes = useStyles();
     const history = useNavigate();
     const [movies, setMovies] = useState([]);
     const [cart, setCart] = useState([]);
     const [subTotal, setSubTotal] = useState([]);
     const [subTotalValue, setSubTotalValue] = useState(0);
     const [totalValue, setTotalValue] = useState(0);
     const [rerender, setRerender] = useState(false);
     const [payment, setPayment] = useState(false);
     const [showCashPayment, setShowCashPayment] = useState(null);
     const [showCash, setShowCash] = useState(false);
     const [showChange, setShowChange] = useState(false);
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
          setShowCash(false);
          setPayment(0);
     };

     const cashHandler = (e) => {
          setShowCashPayment(e.target.value);
     };

     const handleChange = (event) => {
          console.log(event.target.value);
          if (event.target.value === "Cash") {
               setShowCash(true);
          } else {
               setShowCash(false);
          }
          setPayment(event.target.value);
     };

     const processPayment = () => {
          if (showCash) {
               //show what change is required
          } else {
               //show paid in full
          }
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
               <Grid item md={6} ref={componentRef}>
                    {cart.length > 0 ? (
                         <div>
                              <Grid container spacing={2}>
                                   <Grid item md={12}>
                                        {cart.length > 0 && (
                                             <div>
                                                  {cart.map((item, i) => {
                                                       return (
                                                            <CartItem data={item} key={i} subtotal={addToSubtotal} remove={removeFromCart}></CartItem>
                                                       );
                                                  })}
                                             </div>
                                        )}
                                   </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                   <Grid item xs={8}></Grid>
                                   <Grid item xs={4}>
                                        <div className="right">
                                             <Button variant="outlined" color="primary" onClick={clearCart}>
                                                  {" "}
                                                  Clear Cart
                                             </Button>
                                        </div>
                                   </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                   <Grid item xs={8}></Grid>
                                   <Grid item xs={4} alignItems="center">
                                        <div className="right subtotal-container">
                                             <div>SubTotal: {subTotalValue > 0 && <span>{subTotalValue}</span>}</div>
                                             <div>Tax: {subTotalValue > 0 && <span>{(subTotalValue * taxRate).toFixed(2)}</span>}</div>
                                             <div>Total: {subTotalValue > 0 && <span>{totalValue.toFixed(2)}</span>}</div>
                                        </div>
                                   </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                   <Grid item md={6}></Grid>
                                   <Grid item md={6}>
                                        <div className="right" style={{ width: "100%", marginTop: "35px" }}>
                                             <FormControl component="fieldset">
                                                  <FormLabel component="legend">Payment Method</FormLabel>
                                                  <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                                       <FormControlLabel
                                                            value="Visa"
                                                            control={
                                                                 <Radio
                                                                      checked={payment === "Visa"}
                                                                      onChange={handleChange}
                                                                      value="Visa"
                                                                      name="radio-button-demo"
                                                                      inputProps={{ "aria-label": "A" }}
                                                                 />
                                                            }
                                                            label="Visa"
                                                            labelPlacement="top"
                                                       />
                                                       <FormControlLabel
                                                            value="MC"
                                                            control={
                                                                 <Radio
                                                                      checked={payment === "MC"}
                                                                      onChange={handleChange}
                                                                      value="MC"
                                                                      name="radio-button-demo"
                                                                      inputProps={{ "aria-label": "B" }}
                                                                 />
                                                            }
                                                            label="MC"
                                                            labelPlacement="top"
                                                       />
                                                       <FormControlLabel
                                                            value="Debit"
                                                            control={
                                                                 <Radio
                                                                      checked={payment === "Debit"}
                                                                      onChange={handleChange}
                                                                      value="Debit"
                                                                      color="default"
                                                                      name="radio-button-demo"
                                                                      inputProps={{ "aria-label": "D" }}
                                                                 />
                                                            }
                                                            label="Debit"
                                                            labelPlacement="top"
                                                       />
                                                       <FormControlLabel
                                                            value="Cash"
                                                            control={
                                                                 <Radio
                                                                      checked={payment === "Cash"}
                                                                      onChange={handleChange}
                                                                      value="Cash"
                                                                      color="default"
                                                                      name="radio-button-demo"
                                                                      inputProps={{ "aria-label": "E" }}
                                                                 />
                                                            }
                                                            label="Cash"
                                                            labelPlacement="top"
                                                       />
                                                  </RadioGroup>
                                             </FormControl>
                                        </div>
                                   </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                   <Grid item md={4}></Grid>
                                   <Grid item md={8}>
                                        <div className="right">
                                             {" "}
                                             {showCash && <TextField id="outlined-basic" label="Cash" variant="outlined" onClick={cashHandler} />}
                                        </div>
                                   </Grid>
                              </Grid>

                              <div className="right" style={{ width: "100%", marginTop: "15px" }}>
                                   <Button variant="contained" color="secondary" onClick={processPayment}>
                                        Payment
                                   </Button>
                                   <ReactToPrint trigger={() => <Button>Print</Button>} content={() => componentRef.current}>
                                        {" "}
                                   </ReactToPrint>
                              </div>
                              <Grid container spacing={2}>
                                   <Grid item md={4}></Grid>
                                   <Grid item md={8}>
                                        <div className="right">
                                             {" "}
                                             {showChange && <TextField id="outlined-basic" label="Change" variant="outlined" />}
                                        </div>
                                   </Grid>
                              </Grid>
                         </div>
                    ) : (
                         <Grid container spacing={2}>
                              <Grid item md={12}>
                                   <p>Cart is Empty</p>
                              </Grid>
                         </Grid>
                    )}
               </Grid>
               <div></div>
          </Grid>
     );
}
