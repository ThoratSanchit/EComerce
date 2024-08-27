import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Spinner } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userID = localStorage.getItem('userID'); 
        // if (!userID) {
        //   alert('Please Login or signup.');
        //   return;
        // }

        const response = await axios.get('http://localhost:3000/cart/get-cart', {
          headers: {
            'x-user-id': userID
          }
        });

        setCartItems(response.data.data.items);
        setTotalAmount(response.data.totalAmount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error.message);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        alert('Please Login or signup.');
        return;
      }

      await axios.delete(`http://localhost:3000/cart/remove-item/${itemId}`, {
        headers: {
          'x-user-id': userID
        }
      });

  
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item._id} className="col-12 col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      {item.product.images.length > 0 && (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.images[0].alt}
                          className="card-img"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleImageClick(item.product.images[0].url)}
                        />
                      )}
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title mb-3">{item.product.name}</h5>
                        <p className="card-text mb-3"><strong>Price:</strong> ${item.product.price.toFixed(2)}</p>
                        <p className="card-text mb-3"><strong>Quantity:</strong> {item.quantity}</p>
                        <Button variant="danger" onClick={() => handleRemove(item._id)}>Remove</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">Your cart is empty.</div>
      )}

    
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && <img src={selectedImage} alt="Selected" className="img-fluid" />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;

