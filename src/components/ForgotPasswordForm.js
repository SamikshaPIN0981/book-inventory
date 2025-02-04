import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { toast } from "react-toastify"; // Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Toastify styles

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/password-reset/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        toast.success("Reset link sent to your email!");
      } else {
        setMessage('Error sending reset link. Please try again.');
        toast.error("Error sending reset link.");
      }
    } catch (error) {
      setMessage('Error sending reset link. Please try again.');
      toast.error("Network error, please try again later.");
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(44, 62, 80, 0.6)',
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?business,technology)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(236, 240, 241, 0.9)',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    maxWidth: '900px',
    width: '100%',
  };

  const imageStyle = {
    flex: '1',
    maxWidth: '45%',
    paddingRight: '20px',
  };

  const formStyle = {
    flex: '1',
    maxWidth: '50%',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#34495E',
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #BDC3C7',
    boxSizing: 'border-box',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: 'rgba(26, 188, 156, 0.8)',
    color: 'white',
    padding: '15px',
    width: '100%',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '18px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: 'rgba(22, 160, 133, 0.8)',
  };

  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    textAlign: 'center',
  };

  const dividerLineStyle = {
    flex: 1,
    height: '1px',
    backgroundColor: '#BDC3C7',
  };

  const orTextStyle = {
    margin: '0 10px',
    color: '#7F8C8D',
  };

  const registerLinkStyle = {
    color: '#2980B9',
    textDecoration: 'none',
    fontSize: '16px',
    display: 'inline-block',
    marginTop: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  const registerLinkHoverStyle = {
    textDecoration: 'underline',
  };

  const linksContainerStyle = {
    textAlign: 'center',
    marginTop: '20px',
  };

  return (
    <section style={containerStyle}>
      <div style={formContainerStyle}>
        {/* Image Section */}
        <div style={imageStyle}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt="Forgot Password Illustration"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>

        {/* Form Section */}
        <div style={formStyle}>
          <h2 style={titleStyle}>Reset Your Password</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              Send Reset Link
            </button>

            {/* Message after submit */}
            {message && <p className="text-center" style={{ color: '#e74c3c' }}>{message}</p>}

            {/* Divider */}
            <div style={dividerStyle}>
              <div style={dividerLineStyle}></div>
              <p style={orTextStyle}>OR</p>
              <div style={dividerLineStyle}></div>
            </div>
          </form>

          {/* Links Container */}
          <div style={linksContainerStyle}>
            {/* Register Link */}
            <a
              href="/register"
              style={registerLinkStyle}
              onMouseEnter={(e) => (e.target.style.textDecoration = registerLinkHoverStyle.textDecoration)}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              Don't have an account? Register
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordForm;
