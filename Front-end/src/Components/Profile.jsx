// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "../css/Profile.css"; // Ensure this path is correct
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Profile() {
//   const [userEmail, setUserEmail] = useState(null);
//   const [userName,setUserName]=useState(null)
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     console.log("Token sanchit:", token); // Debugging line
//     if (token) {
//       fetch("http://localhost:3000/auth/check-auth", {
//         headers: {
//           "x-access-token": token,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("User Data:", data); // Debugging line
//           if (data.email) {
//             setUserEmail(data.email);
//             setUserName(data.name);
//           } else {
//             console.error("Email not found in response"); // Debugging line
//           }
//         })
//         .catch(() => {
//           console.error("Fetch Error"); // Debugging line
//           localStorage.removeItem("authToken");
//           setUserEmail(null);
//         });
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     setUserEmail(null);
//     navigate("/login");
//   };

//   return (
//     <div className="container mt-3">
//       <div className="row">
//         <div className="col">
//           {userEmail && userName &&(
//             <div className="alert alert-info" role="alert">
//               Logged in as <strong>{userEmail}</strong>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="row">
//         <div className="col">
//           <div className="d-flex justify-content-between">
//             <div>
//               {!userEmail && (
//                 <>
//                   <NavLink className="btn btn-primary me-2" to="/login">
//                     Login
//                   </NavLink>
//                   <NavLink className="btn btn-primary" to="/signup">
//                     Sign Up
//                   </NavLink>
//                 </>
//               )}
//             </div>
//             {userEmail && (
//               <button className="btn btn-danger" onClick={handleLogout}>
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Profile.css"; // Ensure this path is correct
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user details are stored in localStorage
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
            } else {
              console.error("Email not found in response");
            }
          })
          .catch(() => {
            console.error("Fetch Error");
            localStorage.removeItem("authToken");
            setUserEmail(null);
          });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setUserEmail(null);
    setUserName(null);
    navigate("/login");
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          {userEmail  && (
            <div className="alert alert-info" role="alert">
             <div>   Username:{userName} </div>
              Logged in as <strong>{userEmail}</strong>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between">
            <div>
              {!userEmail ? (
                <>
                  <NavLink className="btn btn-primary me-2" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="btn btn-primary" to="/signup">
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

