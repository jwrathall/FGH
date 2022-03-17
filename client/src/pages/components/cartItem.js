import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
     bottom: {
          borderBottom: "1px",
     },
}));

export default function CartItem(props) {
     const classes = useStyles();
     const [quantity, setQuantity] = useState(1);
     const [cost, setCost] = useState(props.data.retail);

     //on load only
     useEffect(() => {
          props.subtotal({ id: props.data.id, retail: props.data.retail });
          return () => {};
     }, []);

     const handleChange = (event) => {
          const { name, value } = event.target;
          if (value <= props.data.quantity) {
               setQuantity(value);
               setCost(value * props.data.retail);
               //update parent subtotal
               props.subtotal({ id: props.data.id, retail: value * props.data.retail });
          } else {
               console.log("Not enough quantity on in stock");
          }
     };

     const removeItem = () => {
          props.remove(props.data);
     };

     return (
          <Box sx={{ borderBottom: 1 }} className={classes.bottom}>
               <Grid container spacing={2}>
                    <Grid item md={6}>
                         <div>
                              <h4>{props.data.name}</h4>
                              <div>{props.data.genre}</div>
                              <div>{props.data.releaseDate}</div>
                         </div>
                    </Grid>
                    <Grid item md={2}>
                         <TextField
                              id="standard-basic"
                              label="Quantity"
                              variant="standard"
                              name="quantity"
                              value={quantity}
                              onChange={handleChange}
                         />
                    </Grid>
                    <Grid item md={2}>
                         <p>Cost: {cost}</p>
                    </Grid>
                    <Grid item md={2}>
                         <Button variant="outlined" color="secondary" onClick={removeItem}>
                              Remove
                         </Button>
                    </Grid>
                    <hr></hr>
               </Grid>
          </Box>
     );
}
