import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import PropertyList from './components/PropertyList'
import PropertyDetails from './components/PropertyDetails'
import ContactPage from './components/ContactPage'
import Signup from './components/Signup'
import LoginPage from './components/LoginPage'
import PropertyRegistrationForm from './components/PropertyRegistrationForm'
import NewPropertyForm from './components/NewPropertyForm'
import ForgotPasswordRequest from './components/ForgotPasswordRequest'
import PasswordResetForm from './components/PasswordResetForm'


export default function App() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">RealHome</Link>
            <button className="navbar-toggler" type="button" data-bs-target="#navbarNav" data-bs-toggle="collapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Properties</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register-property">Register Property</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/new-property">New Property</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Sign In</Link>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
      <main className="main">
        <Button variant="primary" onClick={() => navigate('/signup')}>Primary Button</Button>

        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register-property" element={<PropertyRegistrationForm />} />
          <Route path="/new-property" element={<NewPropertyForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordRequest />} />
          <Route path="/reset-password/:token" element={<PasswordResetForm />} />
        </Routes>
      </main>
      <footer className="bg-dark text-white text-center p-4 mt-5">
        <div className="container">
            <p>&copy; 2025 RealHome. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}