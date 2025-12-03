import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ContactPage() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    recipientId: '',
    propertyId: '',
  });

  useEffect(() => {
    if (location.state) {
      setFormData((prevData) => ({
        ...prevData,
        subject: location.state.subject || '',
        recipientId: location.state.recipientId || '',
        propertyId: location.state.propertyId || '',
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      const data = await res.json();
      console.log(data.message);
      alert('Thank you for your message! We will get back to you shortly.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        recipientId: '',
        propertyId: '',
      });
    } catch (error) {
      console.error(error);
      alert('There was an error sending your message. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{formData.recipientId ? 'Contact Agent' : 'Contact Us'}</h1>
      <p className="mb-4">
        Have questions, feedback, or need assistance? Reach out to us using the form below, or
        find our contact details.
      </p>

      <div className="row">
        <div className="col-md-7">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-md-4 offset-md-1">
          <h4 className="mt-4 mt-md-0">Our Information</h4>
          <p>
            <strong>Address:</strong> 1165 2nd main Aravinda nagara Mysore 570023
          </p>
          <p>
            <strong>Phone:</strong> 9110483491
          </p>
          <p>
            <strong>Email:</strong> shmilind2000@gmail.com
          </p>
          <p>
            <strong>Business Hours:</strong> Mon-Fri: 09:00am - 6:00pm
          </p>
        </div>
      </div>
    </div>
  );
}
