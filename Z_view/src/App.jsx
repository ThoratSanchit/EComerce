// import React from 'react'
// import GetAllProducts from './Components/GetAllProducts'

// export default function App() {
//   return (
//     <>
//     <GetAllProducts></GetAllProducts>
//     </>
//   )
// }



// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetAllProducts from './Components/GetAllProducts';
import Navbar from './Components/Navbar';
import ListProducts from './Components/ListProducts';

export default function App() {
  return (
   <>
  
    <Router>
    <Navbar />

      <div className="container mt-4">

        <Routes>
          <Route exact path="/" element=<GetAllProducts/>/>
          {/* Add more routes here */}
          <Route path="/search" component={() => <div>Search Page</div>} />
               <Route exact path="/add" element=<ListProducts/>/>
          <Route path="/cart" component={() => <div>Cart Page</div>} />
          {/* You can add more routes for other components/pages */}
        </Routes>
      </div>
    </Router>
   </>
  );
}

