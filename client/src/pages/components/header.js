import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
     navlinks: {
          display: "flex",
     },
     link: {
          textDecoration: "none",
          color: "white",
          fontSize: "14px",
          marginLeft: theme.spacing(5),
          "&:hover": {
               textDecoration: "none",
               color: "red",
               borderBottom: "1px solid white",
          },
     },
}));
export default function Header() {
     const classes = useStyles();

     return (
          <header>
               <AppBar position="static">
                    <Toolbar>
                         <Typography variant="h6">MoviePhone</Typography>
                         <div className={classes.navlinks}>
                              <Link
                                   className={classes.link}
                                   to={{
                                        pathname: "/",
                                   }}
                              >
                                   Inventory
                              </Link>
                              <Link
                                   className={classes.link}
                                   to={{
                                        pathname: "/sale",
                                   }}
                              >
                                   Sales
                              </Link>
                         </div>
                    </Toolbar>
               </AppBar>
          </header>
     );
}
