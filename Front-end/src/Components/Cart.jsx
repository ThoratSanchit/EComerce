import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null); // Add state for user info
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const cartResponse = await axios.get('http://localhost:3000/cart/view-cart', {
          headers: { 'x-access-token': token }
        });
        setCart(cartResponse.data.data);

        // Fetch user info
        const userResponse = await axios.get('http://localhost:3000/auth/check-auth', {
          headers: { 'x-access-token': token }
        });
        setUser(userResponse.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data.');
        toast.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put('http://localhost:3000/cart/update-cart', 
        { productId, quantity: newQuantity }, 
        { headers: { 'x-access-token': token } }
      );
      toast.success('Cart updated successfully!');
      // Refresh cart data
      await fetchCart();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update cart.');
    }
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:3000/cart/remove-from-cart/${productId}`, {
        headers: { 'x-access-token': token }
      });
      toast.success('Product removed from cart!');
      // Refresh cart data
      await fetchCart();
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove product.');
    }
  };

  if (loading) return <div className="container mt-3">Loading...</div>;
  if (error) return <div className="container mt-3 text-danger">{error}</div>;

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Your Cart</h2>
      {user && <p><strong>Logged in as:</strong> {user.name} ({user.email})</p>}
      {cart && cart.items.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.product._id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                      className="form-control"
                      style={{ width: '80px' }}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                <td colSpan="2"><strong>${cart.totalAmount.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <ToastContainer />
    </div>
  );
}
