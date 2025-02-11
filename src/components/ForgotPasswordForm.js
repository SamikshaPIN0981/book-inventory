

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isTokenSent, setIsTokenSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    

    try {
      const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("Forgot Password Response:", data);

      if (response.ok) {
        setMessage(data.message);
        const token = data.token;

        if (token) {
          const encodedToken = btoa(token);
          localStorage.setItem('encodedToken', encodedToken);
          setIsTokenSent(true);
          toast.success("Reset link sent to your email!");
          navigate('/');

        }
      } else {
        setMessage(data.message || "Error sending reset link. Please try again.");
        toast.error(data.message || "Error sending reset link.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setMessage('Error sending reset link. Please try again.');
      toast.error("Network error, please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    const token = atob(localStorage.getItem('encodedToken'));

    try {
      const response = await fetch(`http://localhost:8080/api/auth/reset-password?token=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        toast.success("Password updated successfully!");
      } else {
        setMessage('Error updating password. Please try again.');
        toast.error("Error updating password.");
      }
    } catch (error) {
      setMessage('Error updating password. Please try again.');
      toast.error("Network error, please try again later.");
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: 'rgba(44, 62, 80, 0.6)', backgroundImage: 'url(https://source.unsplash.com/1600x900/?business,technology)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="d-flex flex-row bg-light p-4 rounded shadow-lg" style={{ maxWidth: '900px', width: '100%' }}>
        <div className="flex-grow-1 pe-3">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="Forgot Password Illustration" className="w-100 rounded" />
        </div>
        <div className="flex-grow-1">
          <h2 className="text-center text-dark mb-3">{isTokenSent ? 'Reset Your Password' : 'Forgot Your Password?'}</h2>
          {!isTokenSent && (
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: 'rgba(26, 188, 156, 0.8)' }} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}
            {/* : (
             <form onSubmit={handleResetPasswordSubmit}>
               <div className="mb-3">
                 <label className="form-label">New Password</label>
                 <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
               </div>
               <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: 'rgba(26, 188, 156, 0.8)' }}>
                 Update Password
               </button>
             </form>
           ) */}
          {message && <p className="text-center text-danger mt-3">{message}</p>}
          <div className="d-flex align-items-center my-3">
            <div className="flex-grow-1 border-top"></div>
            <p className="mx-2 text-secondary">OR</p>
            <div className="flex-grow-1 border-top"></div>
          </div>
          <div className="text-center">
            <a href="/register" className="text-primary fw-bold">Don't have an account? Register</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordForm;
