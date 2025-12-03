import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toast, Alert } from 'react-bootstrap';

export default function ForgotPasswordRequest() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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
      setToastMessage('Password reset link sent to your email!');
      setShowToast(true);
      setEmail('');
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setToastMessage('');
      setShowToast(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Forgot Password</h1>
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
          placeholder="Enter your email"
          className="border p-3 rounded-lg"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Request Reset Link'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Remembered your password?</p>
        <Link to={'/login'}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}