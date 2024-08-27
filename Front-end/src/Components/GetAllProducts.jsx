// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { motion } from 'framer-motion';
// import '../css/GetAllProducts.css';

// export default function GetAllProducts() {
//   const [products, setProducts] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showDetails, setShowDetails] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/ecomerce/allProducts");
//         setProducts(response.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleImageClick = (imgUrl) => {
//     setSelectedImage(imgUrl);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   const toggleDetails = (id) => {
//     setShowDetails((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4 text-center"></h1>
      
//       {products.length > 0 ? (
//         <div className="row">
//           {products.map((product) => (
//             <motion.div
//               key={product._id}
//               className="col-12 col-sm-6 col-md-4 mb-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="card shadow-sm">
//                 <div className="card-body">
//                   <h5 className="card-title mb-3">{product.name}</h5>
                 
                  
//                   <div>
//                     <strong>Images:</strong>
//                     <div className="d-flex image-container mb-3">
//                       {product.images.map((img) => (
//                         <motion.img 
//                           key={img._id} 
//                           src={img.url} 
//                           alt={img.alt} 
//                           className="img-thumbnail" 
//                           style={{ width: '100px', cursor: 'pointer' }} 
//                           whileHover={{ scale: 1.1 }}
//                           onClick={() => handleImageClick(img.url)} 
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   <p className="card-text mb-3"><strong>Description:</strong> {product.description}</p>

//                   <div className="mt-3">
//                     <button className="btn btn-success button-spacing">Buy</button>
//                     <button className="btn btn-secondary button-spacing">Add to Cart</button>
//                     <button className="btn btn-info button-spacing" onClick={() => toggleDetails(product._id)}>
//                       {showDetails[product._id] ? 'Hide Details' : 'Show Details'}
//                     </button>
//                   </div>
                  
//                   {showDetails[product._id] && (
//                     <div className="mt-3">
//                       <p className="card-text"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
//                       <p className="card-text"><strong>Category:</strong> {product.category}</p>
//                       <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
//                       <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
//                       <p className="card-text"><strong>Rating:</strong> {product.rating}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <div className="alert alert-info">No product details available</div>
//       )}

//       {selectedImage && (
//         <motion.div 
//           className="modal fade show" 
//           style={{ display: 'block' }} 
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ duration: 0.3 }}
//           tabIndex="-1" 
//           role="dialog"
//         >
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <button type="button" className="close" onClick={closeModal}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body text-center">
//                 <img src={selectedImage} alt="Selected" className="img-fluid" />
//               </div>
//             </div>
//           </div>
//           <div className="modal-backdrop fade show" onClick={closeModal}></div>
//         </motion.div>
//       )}
//     </div>
//   );
// }






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { motion } from 'framer-motion';
// import '../css/GetAllProducts.css';
// import { useNavigate } from 'react-router-dom'; // For navigation

// export default function GetAllProducts() {
//   const [products, setProducts] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showDetails, setShowDetails] = useState({});
//   const navigate = useNavigate(); // Use navigate to pass data to another component

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/ecomerce/allProducts");
//         setProducts(response.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleImageClick = (imgUrl) => {
//     setSelectedImage(imgUrl);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   const toggleDetails = (id) => {
//     setShowDetails((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const handleAddToCart = (productId) => {
//     navigate(`/cart/${productId}`); // Navigate to the Cart component with the product ID
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4 text-center"></h1>
      
//       {products.length > 0 ? (
//         <div className="row">
//           {products.map((product) => (
//             <motion.div
//               key={product._id}
//               className="col-12 col-sm-6 col-md-4 mb-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="card shadow-sm">
//                 <div className="card-body">
//                   <h5 className="card-title mb-3">{product.name}</h5>
                 
                  
//                   <div>
//                     <strong>Images:</strong>
//                     <div className="d-flex image-container mb-3">
//                       {product.images.map((img) => (
//                         <motion.img 
//                           key={img._id} 
//                           src={img.url} 
//                           alt={img.alt} 
//                           className="img-thumbnail" 
//                           style={{ width: '100px', cursor: 'pointer' }} 
//                           whileHover={{ scale: 1.1 }}
//                           onClick={() => handleImageClick(img.url)} 
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   <p className="card-text mb-3"><strong>Description:</strong> {product.description}</p>

//                   <div className="mt-3">
//                     <button className="btn btn-success button-spacing">Buy</button>
//                     <button className="btn btn-secondary button-spacing" onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
//                     <button className="btn btn-info button-spacing" onClick={() => toggleDetails(product._id)}>
//                       {showDetails[product._id] ? 'Hide Details' : 'Show Details'}
//                     </button>
//                   </div>
                  
//                   {showDetails[product._id] && (
//                     <div className="mt-3">
//                       <p className="card-text"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
//                       <p className="card-text"><strong>Category:</strong> {product.category}</p>
//                       <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
//                       <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
//                       <p className="card-text"><strong>Rating:</strong> {product.rating}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <div className="alert alert-info">No product details available</div>
//       )}

//       {selectedImage && (
//         <motion.div 
//           className="modal fade show" 
//           style={{ display: 'block' }} 
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ duration: 0.3 }}
//           tabIndex="-1" 
//           role="dialog"
//         >
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <button type="button" className="close" onClick={closeModal}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body text-center">
//                 <img src={selectedImage} alt="Selected" className="img-fluid" />
//               </div>
//             </div>
//           </div>
//           <div className="modal-backdrop fade show" onClick={closeModal}></div>
//         </motion.div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import '../css/GetAllProducts.css';

export default function GetAllProducts() {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ecomerce/allProducts");
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddToCart = async (productId) => {
    const userID = localStorage.getItem("userID"); // Get the userID from localStorage

    if (!userID) {
      alert('User ID not found. Please login.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/cart/add-to-cart',
        { productId, quantity: 1 }, // Sending productId and quantity
        { headers: { 'x-user-id': userID } } // Including userID in the headers
      );

      if (response.status === 200) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">All Products</h1>
      
      {products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <motion.div
              key={product._id}
              className="col-12 col-sm-6 col-md-4 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">{product.name}</h5>
                  
                  <div>
                    <strong>Images:</strong>
                    <div className="d-flex image-container mb-3">
                      {product.images.map((img) => (
                        <motion.img 
                          key={img._id} 
                          src={img.url} 
                          alt={img.alt} 
                          className="img-thumbnail" 
                          style={{ width: '100px', cursor: 'pointer' }} 
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleImageClick(img.url)} 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="card-text mb-3"><strong>Description:</strong> {product.description}</p>

                  <div className="mt-3">
                    <button className="btn btn-success button-spacing">Buy</button>
                    <button className="btn btn-secondary button-spacing" onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                    <button className="btn btn-info button-spacing" onClick={() => toggleDetails(product._id)}>
                      {showDetails[product._id] ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                  
                  {showDetails[product._id] && (
                    <div className="mt-3">
                      <p className="card-text"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                      <p className="card-text"><strong>Category:</strong> {product.category}</p>
                      <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
                      <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
                      <p className="card-text"><strong>Rating:</strong> {product.rating}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No product details available</div>
      )}

      {selectedImage && (
        <motion.div 
          className="modal fade show" 
          style={{ display: 'block' }} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.3 }}
          tabIndex="-1" 
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body text-center">
                <img src={selectedImage} alt="Selected" className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={closeModal}></div>
        </motion.div>
      )}
    </div>
  );
}
