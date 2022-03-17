import React, { useEffect, useState } from "react";
import Form from "./components/form";
import { GetMovie } from "../data/movie";
import { useNavigate } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
export default function Add(props) {
     useEffect(() => {
          return () => {};
     }, []);

     return (
          <div>
               <Form data={GetMovie()}></Form>
          </div>
     );
}
