import React from "react";
import { useNavigate } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
export default function Movie(props) {
     const history = useNavigate();
     const deleteMovie = async (id) => {
          let response = await fetch("https://localhost:7282/api/Inventory/" + id + "", { method: "DELETE" });
          if (response.status === 204) props.update();
     };

     return (
          <TableRow>
               <TableCell>{props.data.name}</TableCell>
               <TableCell>{props.data.director}</TableCell>
               <TableCell>{props.data.genre}</TableCell>
               <TableCell>{props.data.releaseDate}</TableCell>
               <TableCell>{props.data.cost}</TableCell>
               <TableCell>{props.data.retail}</TableCell>
               <TableCell>{props.data.quantity}</TableCell>
               <TableCell style={{ float: "right" }}>
                    <Button variant="outlined" onClick={() => history("/edit/" + props.data.id + "")}>
                         Edit
                    </Button>
                    &nbsp;
                    <Button variant="outlined" onClick={() => deleteMovie(props.data.id)}>
                         Delete
                    </Button>
               </TableCell>
          </TableRow>
     );
}
