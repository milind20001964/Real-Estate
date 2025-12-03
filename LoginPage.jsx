import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toast, Alert } from 'react-bootstrap';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        setToastMessage('');
        setShowToast(false);
        return;
      }
      setLoading(false);
      setError(null);
      setToastMessage('Signed in successfully!');
      setShowToast(true);
      setTimeout(() => {
        navigate('/'); 
      }, 3000); 
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setToastMessage('');
      setShowToast(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      {showToast && (
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{
          position: 'absolute',
          top: 20,
          right: 20,
          minWidth: '250px',
          zIndex: 1050
        }}>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      )}
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={'/signup'}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      <div className="flex justify-center mt-3">
        <Link to={'/forgot-password'}>
          <span className="text-blue-700">Forgot Password?</span>
        </Link>
      </div>
    </div>
  );
}