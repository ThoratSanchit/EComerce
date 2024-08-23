// // import React from 'react'
// // import GetAllProducts from './Components/GetAllProducts'

// // export default function App() {
// //   return (
// //     <>
// //     <GetAllProducts></GetAllProducts>
// //     </>
// //   )
// // }

// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import GetAllProducts from "./Components/GetAllProducts";
// import Navbar from "./Components/Navbar";
// import ListProducts from "./Components/ListProducts";
// import SearchProducts from "./Components/SearchProducts";

// export default function App() {
//   return (
//     <>
//       <Router>
//         <Navbar />

//         <div className="container mt-4">
//           <Routes>
//             <Route exact path="/" element=<GetAllProducts /> />
//             {/* Add more routes here */}
//             <Route path="/search" component={() => <div>Search Page</div>} />
//             <Route exact path="/add" element=<ListProducts /> />
//             <Route path="/cart" component={() => <div>Cart Page</div>} />
//             <Route exact path="/search" element=<SearchProducts /> />
//           </Routes>
//         </div>
//       </Router>
//     </>
//   );
// }


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetAllProducts from "./Components/GetAllProducts";
import Navbar from "./Components/Navbar";
import ListProducts from "./Components/ListProducts";
import SearchProducts from "./Components/SearchProducts";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Cart from "./Components/Cart";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route exact path="/" element={<GetAllProducts />} />
          <Route exact path="/add" element={<ListProducts />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/search" element={<SearchProducts />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}
