import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core//MenuItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
               <Grid container spacing={3}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                         {movie !== null && (
                              <div>
                                   {" "}
                                   <div>{movie.id === 0 ? <h4>Add New Movie</h4> : <h4>Edit Movie</h4>}</div>
                                   <div className="formItem">
                                        <TextField
                                             id="standard-basic"
                                             label="Movie Name"
                                             variant="standard"
                                             name="name"
                                             value={movie.name}
                                             onChange={handleChange}
                                             fullWidth
                                        />
                                   </div>
                                   <div className="formItem">
                                        <TextField
                                             id="standard-basic"
                                             label="Director"
                                             variant="standard"
                                             name="director"
                                             value={movie.director}
                                             onChange={handleChange}
                                             fullWidth
                                        />
                                   </div>
                                   <div className="formItem">
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
                                             fullWidth
                                        </TextField>
                                   </div>
                                   <div className="formItem">
                                        <TextField
                                             id="standard-basic"
                                             label="Release Date"
                                             variant="standard"
                                             name="releaseDate"
                                             value={movie.releaseDate}
                                             onChange={handleChange}
                                             fullWidth
                                        />
                                   </div>
                                   <div className="formItem">
                                        <TextField
                                             id="standard-basic"
                                             label="Quantity"
                                             variant="standard"
                                             name="quantity"
                                             value={movie.quantity}
                                             onChange={handleChange}
                                             fullWidth
                                        />
                                   </div>
                                   <div className="formItem">
                                        <TextField
                                             id="standard-basic"
                                             label="Cost"
                                             variant="standard"
                                             name="cost"
                                             value={movie.cost}
                                             onChange={handleChange}
                                             fullWidth
                                        />
                                   </div>
                                   <div className="formItem">
                                        <TextField
                                             id="standard-basic"
                                             label="Retail"
                                             variant="standard"
                                             name="retail"
                                             value={movie.retail}
                                             onChange={handleChange}
                                             fullWidth
                                        />
                                   </div>
                                   <div className="formItem">
                                        <TextField
                                             id="standard-basic"
                                             label="Imdb"
                                             variant="standard"
                                             name="imdb"
                                             value={movie.imdb}
                                             onChange={handleChange}
                                             fullWidth
                                        />
                                   </div>
                                   <div className="right" style={{ width: "100%", marginTop: "15px" }}>
                                        <Button variant="contained" color="primary" onClick={submitForm}>
                                             Submit
                                        </Button>
                                        &nbsp;
                                        <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
                                             Cancel
                                        </Button>
                                   </div>
                              </div>
                         )}
                    </Grid>
                    <Grid item xs></Grid>
               </Grid>
          </div>
     );
}
