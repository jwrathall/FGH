import React, { useEffect } from "react";
import Form from "./components/form";
import { GetMovie } from "../data/movie";

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
