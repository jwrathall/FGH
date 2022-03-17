import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
export default function Payment(props) {
     //on load only
     useEffect(() => {}, []);

     return (
          <Grid container spacing={2}>
               <Grid item md={4}></Grid>
               <Grid item md={2}></Grid>
               <Grid item md={2}></Grid>
               <Grid item md={2}></Grid>
          </Grid>
     );
}
