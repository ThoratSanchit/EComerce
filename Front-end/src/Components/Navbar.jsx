
// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "../css/Navbar.css";
// import { CgProfile } from "react-icons/cg";
// import { Dropdown } from "react-bootstrap";

// export default function Navbar() {
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [userEmail, setUserEmail] = useState(null);
//   const [userName, setUserName] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user details are stored in localStorage
//     const storedEmail = localStorage.getItem("userEmail");
//     const storedName = localStorage.getItem("userName");

//     if (storedEmail && storedName) {
//       setUserEmail(storedEmail);
//       setUserName(storedName);
//     } else {
//       const token = localStorage.getItem("authToken");
//       if (token) {
//         fetch("http://localhost:3000/auth/check-auth", {
//           headers: {
//             "x-access-token": token,
//           },
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.email) {
//               setUserEmail(data.email);
//               setUserName(data.name);
//             } else {
//               console.error("Email not found in response");
//             }
//           })
//           .catch(() => {
//             console.error("Fetch Error");
//             localStorage.removeItem("authToken");
//             setUserEmail(null);
//           });
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");
//     toast.success("logout successfull..")
//     setUserEmail(null);
//     setUserName(null);
   
//     navigate("/login");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchKeyword.trim()) {
//       navigate(`/search?keyword=${searchKeyword}`);
//     }
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
//         <div className="container d-flex justify-content-between">
//           <NavLink className="navbar-brand" to="/">
//             <img
//               src="/path/to/your/logo.png"
//               alt="Brand Logo"
//               className="logo"
//             />
//           </NavLink>
//           <form className="form-inline search-form" onSubmit={handleSearch}>
//             <input
//               className="form-control mr-2"
//               type="search"
//               placeholder="Search Products"
//               aria-label="Search"
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//             />
//             <button
//               className="btn btn-outline-light"
//               type="submit"
//               disabled={!searchKeyword.trim()}
//             >
//               Search
//             </button>
//           </form>
//           <ul className="navbar-nav d-flex justify-content-between align-items-center">
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/" end>
//                 Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/add">
//                 Become a Seller?
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/cart">
//                 Cart
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <Dropdown>
//                 <Dropdown.Toggle variant="success" id="profile-dropdown">
//                   <CgProfile size={24} className="profile-icon" />
//                 </Dropdown.Toggle>
// {/* 
//                 <Dropdown.Menu>
//                   {userEmail ? (
//                     <>
//                       <Dropdown.ItemText>
//                         <div className="auth-color">Name: {userName}</div>
//                         <div className="auth-color">Email: {userEmail}</div>
//                       </Dropdown.ItemText>
//                       <Dropdown.Divider />
//                       <Dropdown.Item onClick={handleLogout}>
//                         Logout
//                       </Dropdown.Item>
//                     </>
//                   ) : (
//                     <>
//                       <Dropdown.Item as={NavLink} to="/login">
//                         Login
//                       </Dropdown.Item>
//                       <Dropdown.Item as={NavLink} to="/signup">
//                         Sign Up
//                       </Dropdown.Item>
//                     </>
//                   )}
//                 </Dropdown.Menu> */}

// <Dropdown.Menu>
//   {userEmail ? (
//     <>
//       <Dropdown.ItemText className="user-info">
//         <div className="auth-color">Name: {userName}</div>
//         <div className="auth-color">Email: {userEmail}</div>
//       </Dropdown.ItemText>
//       <Dropdown.Divider />
//       <Dropdown.Item className="logout" onClick={handleLogout}>
//         Logout
//       </Dropdown.Item>
//     </>
//   ) : (
//     <>
//       <Dropdown.Item as={NavLink} to="/login">
//         Login
//       </Dropdown.Item>
//       <Dropdown.Item as={NavLink} to="/signup">
//         Sign Up
//       </Dropdown.Item>
//     </>
//   )}
// </Dropdown.Menu>
//               </Dropdown>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { CgProfile } from "react-icons/cg";
// import { Dropdown, Modal, Button } from "react-bootstrap";
// import "../css/Navbar.css";

// export default function Navbar() {
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [userEmail, setUserEmail] = useState(null);
//   const [userName, setUserName] = useState(null);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user details are stored in localStorage
//     const storedEmail = localStorage.getItem("userEmail");
//     const storedName = localStorage.getItem("userName");

//     if (storedEmail && storedName) {
//       setUserEmail(storedEmail);
//       setUserName(storedName);
//     } else {
//       const token = localStorage.getItem("authToken");
//       if (token) {
//         fetch("http://localhost:3000/auth/check-auth", {
//           headers: {
//             "x-access-token": token,
//           },
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.email) {
//               setUserEmail(data.email);
//               setUserName(data.name);
//             } else {
//               console.error("Email not found in response");
//             }
//           })
//           .catch(() => {
//             console.error("Fetch Error");
//             localStorage.removeItem("authToken");
//             setUserEmail(null);
//           });
//       }
//     }
//   }, []);

//   const handleAddToCart = async (productId) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       await axios.post('http://localhost:3000/cart/add-to-cart', { productId }, {
//         headers: { 'x-access-token': token }
//       });
//       showAddToCartSuccess(); // Notify user about the successful addition
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to add item to cart.');
//     }
//   };
  

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");
//     setUserEmail(null);
//     setUserName(null);
//     setShowLogoutModal(false); // Close the modal after logout
//     navigate("/login"); // Navigate to the login page
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchKeyword.trim()) {
//       navigate(`/search?keyword=${searchKeyword}`);
//     }
//   };

//   const handleShowLogoutModal = () => setShowLogoutModal(true);
//   const handleCloseLogoutModal = () => setShowLogoutModal(false);

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
//         <div className="container d-flex justify-content-between">
//           <NavLink className="navbar-brand" to="/">
//             <img
//               src="/path/to/your/logo.png"
//               alt="Brand Logo"
//               className="logo"
//             />
//           </NavLink>
//           <form className="form-inline search-form" onSubmit={handleSearch}>
//             <input
//               className="form-control mr-2"
//               type="search"
//               placeholder="Search Products"
//               aria-label="Search"
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//             />
//             <button
//               className="btn btn-outline-light"
//               type="submit"
//               disabled={!searchKeyword.trim()}
//             >
//               Search
//             </button>
//           </form>
//           <ul className="navbar-nav d-flex justify-content-between align-items-center">
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/" end>
//                 Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/add">
//                 Become a Seller?
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" onClick={handleAddToCart} to="/cart">
//                 Cart
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <Dropdown>
//                 <Dropdown.Toggle variant="success" id="profile-dropdown">
//                   <CgProfile size={24} className="profile-icon" />
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu>
//                   {userEmail ? (
//                     <>
//                       <Dropdown.ItemText className="user-info">
//                         <div className="auth-color">Name: {userName}</div>
//                         <div className="auth-color">Email: {userEmail}</div>
//                       </Dropdown.ItemText>
//                       <Dropdown.Divider />
//                       <Dropdown.Item
//                         className="logout"
//                         onClick={handleShowLogoutModal}
//                       >
//                         Logout
//                       </Dropdown.Item>
//                     </>
//                   ) : (
//                     <>
//                       <Dropdown.Item as={NavLink} to="/login">
//                         Login
//                       </Dropdown.Item>
//                       <Dropdown.Item as={NavLink} to="/signup">
//                         Sign Up
//                       </Dropdown.Item>
//                     </>
//                   )}
//                 </Dropdown.Menu>
//               </Dropdown>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {/* Logout Confirmation Modal */}
//       <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Logout</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to log out?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseLogoutModal}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }















































import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CgProfile } from "react-icons/cg";
import { Dropdown, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from 'react-toastify';
import "../css/Navbar.css";

export default function Navbar() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedEmail = localStorage.getItem("userEmail");
  //   const storedName = localStorage.getItem("userName");

  //   if (storedEmail && storedName) {
  //     setUserEmail(storedEmail);
  //     setUserName(storedName);
  //   } else {
  //     const token = localStorage.getItem("authToken");
  //     if (token) {
  //       fetch("http://localhost:3000/auth/check-auth", {
  //         headers: {
  //           "x-access-token": token,
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data.email) {
  //             setUserEmail(data.email);
  //             setUserName(data.name);
  //           }
  //         })
  //         .catch(() => {
  //           console.error("Fetch Error");
  //           localStorage.removeItem("authToken");
  //           setUserEmail(null);
  //         });
  //     }
  //   }
  // }, []);

  
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
  
    if (storedEmail && storedName) {
      setUserEmail(storedEmail);
      setUserName(storedName);
    } else {
      const token = localStorage.getItem("authToken");
      if (token) {
        fetch("http://localhost:3000/auth/check-auth", {
          headers: {
            "x-access-token": token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.email) {
              setUserEmail(data.email);
              setUserName(data.name);
            }
          })
          .catch(() => {
            console.error("Fetch Error");
            localStorage.removeItem("authToken");
            setUserEmail(null);
          });
      }
    }
  }, []);  // Ensure this hook runs once after component mounts
  

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:3000/cart/add-to-cart",
        { productId, quantity },
        { headers: { "x-access-token": token } }
      );

      toast.success(`Added to Cart: ${response.data.data.items[0].name}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item to cart.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setUserEmail(null);
    setUserName(null);
    setShowLogoutModal(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/search?keyword=${searchKeyword}`);
    }
  };

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container d-flex justify-content-between">
          <NavLink className="navbar-brand" to="/">
            <img
              src="/path/to/your/logo.png"
              alt="Brand Logo"
              className="logo"
            />
          </NavLink>
          <form className="form-inline search-form" onSubmit={handleSearch}>
            <input
              className="form-control mr-2"
              type="search"
              placeholder="Search Products"
              aria-label="Search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              className="btn btn-outline-light"
              type="submit"
              disabled={!searchKeyword.trim()}
            >
              Search
            </button>
          </form>
          <ul className="navbar-nav d-flex justify-content-between align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add">
                Become a Seller?
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart" onClick={() => handleAddToCart("66b0e8ffe834fe9737081f36", 1)}>
                Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="profile-dropdown">
                  <CgProfile size={24} className="profile-icon" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {userEmail ? (
                    <>
                      <Dropdown.ItemText className="user-info">
                        <div className="auth-color">Name: {userName}</div>
                        <div className="auth-color">Email: {userEmail}</div>
                      </Dropdown.ItemText>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        className="logout"
                        onClick={handleShowLogoutModal}
                      >
                        Logout
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item as={NavLink} to="/login">
                        Login
                      </Dropdown.Item>
                      <Dropdown.Item as={NavLink} to="/signup">
                        Sign Up
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>

      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
