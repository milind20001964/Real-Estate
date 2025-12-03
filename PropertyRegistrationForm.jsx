import React, { useState } from 'react';
import './PropertyRegistrationForm.css';

const PropertyRegistrationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '1',
    bathrooms: '1',
    area: '',
    thumbnail: null,
    images: [],
    agentName: '',
    agentEmail: '',
    lat: '', 
    lng: '', 
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    if (name === 'title' && !value) {
      error = 'Title is required';
    }
    if (name === 'price' && (!value || value <= 0)) {
      error = 'Price must be a positive number';
    }
    if (name === 'location' && !value) {
      error = 'Location is required';
    }
    if (name === 'area' && (!value || value <= 0)) {
      error = 'Area must be a positive number';
    }
    if (name === 'agentName' && !value) {
      error = 'Agent Name is required';
    }
    if (name === 'agentEmail' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Agent Email is invalid';
    }
    if (name === 'lat' && value && isNaN(Number(value))) {
      error = 'Latitude must be a number';
    }
    if (name === 'lng' && value && isNaN(Number(value))) {
      error = 'Longitude must be a number';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'thumbnail') {
      setFormData({
        ...formData,
        thumbnail: files[0],
      });
    } else if (name === 'images') {
      setFormData({
        ...formData,
        images: [...formData.images, ...files],
      });
    } else {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });

      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);

      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('location', formData.location);
      data.append('bedrooms', formData.bedrooms);
      data.append('bathrooms', formData.bathrooms);
      data.append('area', formData.area);
      data.append('agentName', formData.agentName);
      data.append('agentEmail', formData.agentEmail);
      if (formData.lat) data.append('lat', formData.lat); 
      if (formData.lng) data.append('lng', formData.lng); 


      if (formData.thumbnail) {
        data.append('thumbnail', formData.thumbnail);
      }
      formData.images.forEach((image) => {
        data.append('images', image);
      });

      try {
        const res = await fetch('/api/property/register', {
          method: 'POST',
          body: data,
        });

        const result = await res.json();
        if (result.success) {
          console.log('Property registered successfully:', result.property);
          alert('Property registered successfully!');
          
          setFormData({
            title: '',
            description: '',
            price: '',
            location: '',
            bedrooms: '1',
            bathrooms: '1',
            area: '',
            thumbnail: null,
            images: [],
            agentName: '',
            agentEmail: '',
            lat: '',
            lng: '',
          });
          setErrors({});
        } else {
          console.error('Error registering property:', result.message);
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error during property registration.');
      }
    } else {
      console.log('Form has errors:', newErrors);
    }
  };

  return (
    <div className="property-registration-form">
      <h1>Property Registration</h1>
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Property Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          {errors.price && <span className="error">{errors.price}</span>}
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
          {errors.location && <span className="error">{errors.location}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="bedrooms">Bedrooms</label>
          <select
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="bathrooms">Bathrooms</label>
          <select
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="area">Area (sqft)</label>
          <input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
          {errors.area && <span className="error">{errors.area}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="agentName">Agent Name</label>
          <input
            type="text"
            id="agentName"
            name="agentName"
            value={formData.agentName}
            onChange={handleChange}
            required
          />
          {errors.agentName && <span className="error">{errors.agentName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="agentEmail">Agent Email</label>
          <input
            type="email"
            id="agentEmail"
            name="agentEmail"
            value={formData.agentEmail}
            onChange={handleChange}
            required
          />
          {errors.agentEmail && <span className="error">{errors.agentEmail}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="lat">Latitude (Optional)</label>
          <input
            type="text"
            id="lat"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
          />
          {errors.lat && <span className="error">{errors.lat}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="lng">Longitude (Optional)</label>
          <input
            type="text"
            id="lng"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
          />
          {errors.lng && <span className="error">{errors.lng}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail Image</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleChange}
            accept="image/*"
            required
          />
          {formData.thumbnail && (
            <div className="image-preview">
              <img src={URL.createObjectURL(formData.thumbnail)} alt="Thumbnail Preview" />
              <button type="button" onClick={() => setFormData({ ...formData, thumbnail: null })}>
                Remove Thumbnail
              </button>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="images">Additional Images</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleChange}
            accept="image/*"
            multiple
          />
        </div>
        <div className="image-previews">
          {formData.images.map((image, index) => (
            <div key={index} className="image-preview">
              <img src={URL.createObjectURL(image)} alt={`preview ${index}`} />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">Register Property</button>
      </form>
    </div>
  );
};

export default PropertyRegistrationForm;
