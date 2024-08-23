// import React, { useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../css/Login.css';
// import { Link } from 'react-router-dom';

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     email: '',
//     password: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: '' });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = 'Email is required.';
//     if (!formData.password) newErrors.password = 'Password is required.';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const response = await axios.post('http://localhost:3000/auth/login', formData);
//       if (response.data.token) {
//         localStorage.setItem('authToken', response.data.token);
//         toast.success('Login successful!');
//         window.location.replace('/');
//       } else {
//         toast.error(response.data.message || 'Login failed. Please check your credentials.');
//       }

//       if(response.data.message=="Invalid credentials"){
//         toast.error("Invalid credentiaals")
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       toast.error('Error logging in. Please try again.');
//     }
//   };

//   return (
//     <div className="container mt-3 d-flex justify-content-center">
//       <div className="card p-3 shadow-lg form-background" style={{ width: '24rem' }}>
//         <h2 className="mb-3 text-center">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-2">
//             <label htmlFor="email" className="form-label">Email</label>
//             <input
//               type="email"
//               className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             {errors.email && <div className="text-danger small">{errors.email}</div>}
//           </div>
//           <div className="mb-2">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type="password"
//               className={`form-control form-control-sm ${errors.password ? 'is-invalid' : ''}`}
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//             {errors.password && <div className="text-danger small">{errors.password}</div>}
//           </div>
//           <button type="submit" className="btn btn-dark w-100 btn-sm">Login</button>
//         </form>
//         <div className="mt-3 text-center">
//           <p className="mb-0">Don't have an account? <Link to="/signup" className="link-primary">Sign up</Link></p>
//         </div>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// }









import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        toast.success('Login successful!');
        window.location.replace('/');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error logging in. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div className="card p-3 shadow-lg form-background" style={{ width: '24rem' }}>
        <h2 className="mb-3 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="text-danger small">{errors.email}</div>}
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control form-control-sm ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <div className="text-danger small">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-dark w-100 btn-sm">Login</button>
        </form>
        <div className="mt-3 text-center">
          <p className="mb-0">Don't have an account? <Link to="/signup" className="link-primary">Sign up</Link></p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
