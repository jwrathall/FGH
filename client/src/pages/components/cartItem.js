import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
export default function CartItem(props) {
     const [quantity, setQuantity] = useState(1);
     const [cost, setCost] = useState(props.data.retail);

     useEffect(() => {
          //set starting point for subtotal
          let x = 1;
          console.log("item");
          props.subtotal({ id: props.data.id, retail: props.data.retail });
          return () => {};
     }, [props]);

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

     return (
          <Grid container spacing={2}>
               <Grid item xs={4}>
                    <div>
                         <h4>{props.data.name}</h4>
                         <p>{props.data.genre}</p>
                         <p>{props.data.releaseDate}</p>
                    </div>
               </Grid>
               <Grid item xs={3}>
                    <TextField id="standard-basic" label="Quantity" variant="standard" name="quantity" value={quantity} onChange={handleChange} />
               </Grid>
               <Grid item xs={3}>
                    <p>Cost: {cost}</p>
               </Grid>
               <Grid item xs={2}></Grid>
          </Grid>
     );
}
