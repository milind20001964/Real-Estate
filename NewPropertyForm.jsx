import React, { useState } from 'react';
import './NewPropertyForm.css';

const NewPropertyForm = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyType: 'House',
    price: '',
    description: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    agentName: '',
    agentEmail: '',
    lat: '',
    lng: '',
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      if (name === 'thumbnail') {
        setThumbnailFile(files[0]);
      } else if (name === 'images') {
        setImageFiles([...files]);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.propertyName);
    data.append('propertyType', formData.propertyType);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('bedrooms', formData.bedrooms);
    data.append('bathrooms', formData.bathrooms);
    data.append('area', formData.area);
    data.append('agentName', formData.agentName);
    data.append('agentEmail', formData.agentEmail);
    data.append('lat', formData.lat);
    data.append('lng', formData.lng);

    if (thumbnailFile) {
      data.append('thumbnail', thumbnailFile);
    }

    imageFiles.forEach((file) => {
      data.append('images', file);
    });

    try {
      const response = await fetch('http://localhost:5000/api/property/register', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(result.message);
        
        setFormData({
          propertyName: '',
          propertyType: 'House',
          price: '',
          description: '',
          location: '',
          bedrooms: '',
          bathrooms: '',
          area: '',
          agentName: '',
          agentEmail: '',
          lat: '',
          lng: '',
        });
        setThumbnailFile(null);
        setImageFiles([]);
        
        e.target.reset(); 
      } else {
        alert(`Error: ${result.message || 'Something went wrong!'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error during property registration.');
    }
  };

  return (
    <div className="new-property-form-container">
      <h2>Create a New Property Listing</h2>
      <form onSubmit={handleSubmit} className="new-property-form">
        <div className="form-group">
          <label htmlFor="propertyName">Property Name</label>
          <input
            type="text"
            id="propertyName"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="propertyType">Property Type</label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
          >
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (USD)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bedrooms">Bedrooms</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bathrooms">Bathrooms</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="area">Area (sq ft)</label>
          <input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="agentName">Agent Name</label>
          <input
            type="text"
            id="agentName"
            name="agentName"
            value={formData.agentName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="agentEmail">Agent Email</label>
          <input
            type="email"
            id="agentEmail"
            name="agentEmail"
            value={formData.agentEmail}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lat">Latitude</label>
          <input
            type="text"
            id="lat"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lng">Longitude</label>
          <input
            type="text"
            id="lng"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail Image</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Additional Images</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Add Property</button>
      </form>
    </div>
  );
};

export default NewPropertyForm;
