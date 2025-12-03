import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Toast, Alert } from 'react-bootstrap';

export default function PasswordResetForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
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
      setToastMessage('Your password has been reset successfully!');
      setShowToast(true);
      setTimeout(() => {
        navigate('/login');
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
      <h1 className="text-3xl text-center font-semibold my-7">Reset Password</h1>
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
          type="password"
          placeholder="New Password"
          className="border p-3 rounded-lg"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="border p-3 rounded-lg"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}