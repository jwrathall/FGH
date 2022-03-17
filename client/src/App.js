import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inventory from "./pages/Inventory";
import Sale from "./pages/Sale";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Header from "./pages/components/header";
import Container from "@material-ui/core/Container";
import "./App.css";

export default function App() {
     return (
          <Router>
               <Header />
               <Container maxWidth="lg">
                    <Routes>
                         <Route path="/" element={<Inventory />} />
                         <Route path="/sale" element={<Sale />} />
                         <Route path="/add" element={<Add />} />
                         <Route path="/edit/:id" element={<Edit />} />
                    </Routes>
               </Container>
          </Router>
     );
}
