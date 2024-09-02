import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [itemToUpdate, setItemToUpdate] = useState({
    productId: null,
    quantity: 1,
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          alert("Please login to view your cart.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/cart/get-cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCartItems(response.data.data.items);
        setTotalAmount(response.data.totalAmount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error.message);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleUpdateQuantity = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please login to update your cart.");
        return;
      }

      await axios.put(
        "http://localhost:3000/cart/update-cart",
        { productId: itemToUpdate.productId, quantity: itemToUpdate.quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = await axios.get("http://localhost:3000/cart/get-cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(response.data.data.items);
      setTotalAmount(response.data.totalAmount);

      setShowUpdateModal(false);
      setItemToUpdate({ productId: null, quantity: 1 });
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  const handleConfirmUpdate = (productId, currentQuantity) => {
    setItemToUpdate({ productId, quantity: currentQuantity });
    setShowUpdateModal(true);
  };

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please login to remove items.");
        return;
      }

      await axios.delete(`http://localhost:3000/cart/remove-from-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId: itemToRemove },
      });

      setCartItems(
        cartItems.filter((item) => item.product._id !== itemToRemove)
      );

      const updatedCart = await axios.get(
        "http://localhost:3000/cart/get-cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalAmount(updatedCart.data.totalAmount);

      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  const handleConfirmRemove = (productId) => {
    setItemToRemove(productId);
    setShowConfirmModal(true);
  };

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setItemToRemove(null);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setItemToUpdate({ productId: null, quantity: 1 });
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="cart_summary d-flex justify-content-between align-items-center mb-4">

        <div className="cart_total d-flex align-items-center">
          <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          <Button variant="success" className="ml-3">Buy</Button>
        </div>
      </div>
      {cartItems.length > 0 ? (
        <div className="cart_items">
          <div className="cart_item row align-items-center mb-3 cart_item_headings">
            <div className="col-md-2 cart_image_heading">Image</div>
            <div className="col-md-4 cart_name_heading">Name</div>
            <div className="col-md-2 cart_price_heading">Price</div>
            <div className="col-md-2 cart_quantity_heading">Quantity</div>
            <div className="col-md-2 cart_actions_heading">Actions</div>
          </div>
          {cartItems.map((item) => (
            <div key={item._id} className="cart_item row align-items-center mb-3">
              <div className="col-md-2 cart_image">
                {item.product.images.length > 0 && (
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.images[0].alt}
                    className="img-fluid"
                    onClick={() =>
                      handleImageClick(item.product.images[0].url)
                    }
                  />
                )}
              </div>
              <div className="col-md-4 cart_name">
                <h5>{item.product.name}</h5>
              </div>
              <div className="col-md-2 cart_price">
                <p>${item.product.price.toFixed(2)}</p>
              </div>
              <div className="col-md-2 cart_quantity">
                <p>{item.quantity}</p>
              </div>
              <div className="col-md-2 cart_actions">
                <Button
                  variant="warning"
                  onClick={() =>
                    handleConfirmUpdate(item.product._id, item.quantity)
                  }
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleConfirmRemove(item.product._id)}
                  className="mt-2"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">Your cart is empty.</div>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <img src={selectedImage} alt="Selected" className="img-fluid" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this item from your cart?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter new quantity:</p>
          <input
            type="number"
            value={itemToUpdate.quantity}
            min="1"
            onChange={(e) =>
              setItemToUpdate({
                ...itemToUpdate,
                quantity: parseInt(e.target.value),
              })
            }
            className="form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateQuantity}>
           
          Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;