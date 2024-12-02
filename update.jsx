import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './crud.css';

const UpdateItem = () => {
  const { id, category } = useParams(); // Get both category and ID from URL params
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch the item data when the component mounts
  useEffect(() => {
    const fetchItem = async () => {
      if (!id || !category) {
        // setError('Invalid item ID or category.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/${category}/${id}`);
        const item = response.data;
        setItemName(item.name);
        setItemPrice(item.price);
        setItemImage(item.img);
      } catch (err) {
        console.error('Error fetching item:', err);
        setError('Error fetching item. Please try again later.');
      }
    };

    fetchItem();
  }, [id, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName || !itemPrice || !itemImage) {
      alert('Please fill all fields!');
      return;
    }

    const updatedItem = {
      id: id,
      name: itemName,
      price: itemPrice,
      img: itemImage,
    };

    try {
      await axios.put(`http://localhost:3000/${category}/${id}`, updatedItem);
      setSuccess(true);
      setError(null);
      navigate(`/${category}`); // Navigate back to the category page after successful update
    } catch (err) {
      console.error('Error updating item:', err);
      setError('Error updating item. Check your server connection.');
    }
  };

  return (
    <div className="full">
      <div className="contt">
        <h2>Update Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="fg">
            <label>Item Name:</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="fg">
            <label>Item Price:</label>
            <input
              type="text"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
            />
          </div>
          <div className="fg">
            <label>Item Image URL:</label>
            <input
              type="url"
              value={itemImage}
              onChange={(e) => setItemImage(e.target.value)}
              required
            />
          </div>
          <div className="fg">
            <label>Category:</label>
            <select value={category} disabled>
              <option value="fruits">Fruits</option>
              <option value="dairyAndEggs">Dairy & Eggs</option>
              <option value="vegetables">Vegetables</option>
              <option value="snacks">Snacks</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>
          <button className="btna" type="submit">Update Item</button>
        </form>
        {success && <p className="message success">Item updated successfully!</p>}
        {error && <p className="message error">{error}</p>}
      </div>
    </div>
  );
};

export default UpdateItem;
