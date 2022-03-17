import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core//MenuItem";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

const genres = [
     {
          value: "Drama",
          label: "Drama",
     },
     {
          value: "Comedy",
          label: "Comedy",
     },
     {
          value: "Western",
          label: "Western",
     },
     {
          value: "Horror",
          label: "Horror",
     },
     {
          value: "Action",
          label: "Action",
     },
];

export default function Add(props) {
     const navigate = useNavigate();
     const [movie, setMovie] = React.useState(null);

     useEffect(() => {
          console.log(props);
          setMovie(props.data);
          return () => {};
     }, [props]);

     const handleChange = (event) => {
          const { name, value } = event.target;
          setMovie({ ...movie, [name]: value });
     };

     const submitForm = async () => {
          if (movie.id !== 0) {
               //Update ation
               let response = await fetch("https://localhost:7282/api/Inventory/" + movie.id + "", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(movie),
               });
               if (response.status === 204) console.log("updated");
          } else {
               //Add action
               let response = await fetch("https://localhost:7282/api/Inventory/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(movie),
               });
               if (response.status === 201) console.log(response);
          }
     };

     return (
          <div>
               {movie !== null && (
                    <div>
                         {" "}
                         <div>
                              <TextField
                                   id="standard-basic"
                                   label="Movie Name"
                                   variant="standard"
                                   name="name"
                                   value={movie.name}
                                   onChange={handleChange}
                              />
                         </div>
                         <div>
                              <TextField
                                   id="standard-basic"
                                   label="Director"
                                   variant="standard"
                                   name="director"
                                   value={movie.director}
                                   onChange={handleChange}
                              />
                         </div>
                         <div>
                              <TextField
                                   id="standard-select-currency"
                                   select
                                   label="Select"
                                   value={movie.genre}
                                   onChange={handleChange}
                                   helperText="select your genre"
                                   variant="standard"
                                   name="genre"
                              >
                                   {genres.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                             {option.label}
                                        </MenuItem>
                                   ))}
                              </TextField>
                         </div>
                         <div>
                              <TextField
                                   id="standard-basic"
                                   label="Release Date"
                                   variant="standard"
                                   name="releaseDate"
                                   value={movie.releaseDate}
                                   onChange={handleChange}
                              />
                         </div>
                         <div>
                              <TextField
                                   id="standard-basic"
                                   label="Quantity"
                                   variant="standard"
                                   name="quantity"
                                   value={movie.quantity}
                                   onChange={handleChange}
                              />
                         </div>
                         <div>
                              <TextField id="standard-basic" label="Cost" variant="standard" name="cost" value={movie.cost} onChange={handleChange} />
                         </div>
                         <div>
                              <TextField
                                   id="standard-basic"
                                   label="Retail"
                                   variant="standard"
                                   name="retail"
                                   value={movie.retail}
                                   onChange={handleChange}
                              />
                         </div>
                         <div>
                              <TextField id="standard-basic" label="Imdb" variant="standard" name="imdb" value={movie.imdb} onChange={handleChange} />
                         </div>
                         <div>
                              <Button variant="contained" onClick={submitForm}>
                                   Submit
                              </Button>
                              <Button variant="contained">Cancel</Button>
                         </div>
                    </div>
               )}
          </div>
     );
}
