import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function GetAllProducts() {
  const [products, setProducts] = useState([]); 
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
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product Details</h1>
     
      {products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                  <p className="card-text"><strong>Description:</strong> {product.description}</p>
                  <p className="card-text"><strong>Category:</strong> {product.category}</p>
                  <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
                  <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
                  <p className="card-text"><strong>Rating:</strong> {product.rating}</p>
                  <p className="card-text"><strong>Number of Reviews:</strong> {product.numReviews}</p>
                  <p className="card-text"><strong>Featured:</strong> {product.isFeatured ? 'Yes' : 'No'}</p>
                  {/* <p className="card-text"><strong>Created At:</strong> {new Date(product.createdAt).toLocaleString()}</p>
                  <p className="card-text"><strong>Updated At:</strong> {new Date(product.updatedAt).toLocaleString()}</p> */}
                  <div>
                    <strong>Images:</strong>
                    <div className="d-flex gap-2">
                      {product.images.map((img) => (
                        <img key={img._id} src={img.url} alt={img.alt} className="img-thumbnail" style={{ width: '100px' }} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary me-2">Buy</button>
                    <button className="btn btn-secondary">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No product details available</div>
      )}
    </div>
  );
}




