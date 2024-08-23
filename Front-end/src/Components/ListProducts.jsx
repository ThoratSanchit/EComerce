import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/ListProducts.css'

export default function ListProducts() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    brand: ''
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    brand: '',
    images: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
    setErrors({ ...errors, images: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Product name is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.category) newErrors.category = 'Category is required.';
    if (!formData.price) newErrors.price = 'Price is required.';
    if (!formData.stock) newErrors.stock = 'Stock is required.';
    if (!formData.brand) newErrors.brand = 'Brand is required.';
    if (selectedFiles.length === 0) newErrors.images = 'At least one image is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) {
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('brand', formData.brand);
    for (let i = 0; i < selectedFiles.length; i++) {
      data.append('images', selectedFiles[i]);
    }

    try {
      const response = await axios.post('http://localhost:3000/ecomerce/add/product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product added successfully:', response.data);
   
      toast.success('Product added successfully!');
      window.location.replace("/");

      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        brand: ''
      });
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product. Please try again.');
    }
  };

  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div className="card p-3 shadow-lg form-background" style={{ width: '24rem' }}>
        <h2 className="mb-3 text-center">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <div className="text-danger small">{errors.name}</div>}
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`}
              id="description"
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
            {errors.description && <div className="text-danger small">{errors.description}</div>}
          </div>
          <div className="mb-2">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              className={`form-control form-control-sm ${errors.category ? 'is-invalid' : ''}`}
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            {errors.category && <div className="text-danger small">{errors.category}</div>}
          </div>
          <div className="mb-2">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className={`form-control form-control-sm ${errors.price ? 'is-invalid' : ''}`}
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
            {errors.price && <div className="text-danger small">{errors.price}</div>}
          </div>
          <div className="mb-2">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
              type="number"
              className={`form-control form-control-sm ${errors.stock ? 'is-invalid' : ''}`}
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
            {errors.stock && <div className="text-danger small">{errors.stock}</div>}
          </div>
          <div className="mb-2">
            <label htmlFor="brand" className="form-label">Brand</label>
            <input
              type="text"
              className={`form-control form-control-sm ${errors.brand ? 'is-invalid' : ''}`}
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
            />
            {errors.brand && <div className="text-danger small">{errors.brand}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">Images</label>
            <input
              type="file"
              className={`form-control form-control-sm ${errors.images ? 'is-invalid' : ''}`}
              id="images"
              name="images"
              onChange={handleFileChange}
              multiple
            />
            {errors.images && <div className="text-danger small">{errors.images}</div>}
          </div>
          <button type="submit" className="btn btn-dark w-100 btn-sm">Add Product</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
