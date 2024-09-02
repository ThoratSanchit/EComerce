// // axiosConfig.js
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Function to refresh tokens
// const refreshAuthToken = async () => {
//   const refreshToken = localStorage.getItem('refreshToken');
//   if (!refreshToken) {
//     throw new Error('No refresh token found');
//   }
//   return axios.post('http://localhost:3000/auth/refresh-token', { refreshToken });
// };

// // Add axios interceptor globally
// axios.interceptors.response.use(
//   response => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.error('Error status:', error.response?.status); // Log error status
//     console.error('Error details:', error.response?.data); // Log error details

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const response = await refreshAuthToken();
//         localStorage.setItem('authToken', response.data.accessToken);
//         localStorage.setItem('refreshToken', response.data.refreshToken);

//         originalRequest.headers['Authorization'] = 'Bearer ' + response.data.accessToken;
//         return axios(originalRequest);
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError); // Log refresh token errors
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('refreshToken');
//         toast.error('Session expired. Please log in again.');
//         setTimeout(() => {
//           window.location.href = '/login';
//         }, 2000);
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axios;
