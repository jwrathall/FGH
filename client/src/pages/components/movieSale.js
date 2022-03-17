import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
export default function MovieSale(props) {
     const buyMovie = (movie) => {
          if (movie.quantity > 0) {
               props.toCart(movie);
          } else {
               console.log("not enough inventory");
          }
     };

     return (
          <TableRow>
               <TableCell>{props.data.name}</TableCell>
               <TableCell>{props.data.releaseDate}</TableCell>
               <TableCell>{props.data.cost}</TableCell>
               <TableCell>{props.data.retail}</TableCell>
               <TableCell>{props.data.quantity}</TableCell>
               <TableCell>
                    &nbsp;
                    <Button variant="outlined" onClick={() => buyMovie(props.data)}>
                         Buy
                    </Button>
               </TableCell>
          </TableRow>
     );
}
