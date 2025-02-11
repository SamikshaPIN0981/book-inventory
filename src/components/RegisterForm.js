import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { toast, ToastContainer } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons from react-icons

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility

  const notify = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const userData = { name, email, password, confirmPassword };
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        //setErrorMessage(errorData.message || 'Error during registration');
        notify(errorData.message || 'Error during registration.', 'error');
        return;
      }

      const responseData = await response.json();
      console.log('Registration successful:', responseData);
      notify('Registration successful!', 'success');
    } catch (err) {
      console.error('Error during registration:', err);
      notify('Failed registration.', 'error');
    }
  };

  // Styles (updated with transparent background and light shades)
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(44, 62, 80, 0.8)', // Transparent dark background
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?business,technology)', // Background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(236, 240, 241, 0.9)', // Light gray background with transparency
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#34495E', // Darker shade for title
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #BDC3C7', // Subtle border with transparency
    boxSizing: 'border-box',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: '#1ABC9C', // Greenish teal
    color: 'white',
    padding: '15px',
    width: '100%',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '15px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#16A085', // Darker shade on hover
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
    color: '#7F8C8D', // Gray color for 'OR' text
  };

  const loginLinkStyle = {
    color: '#2980B9',
    textDecoration: 'none',
    fontSize: '16px',
    display: 'inline-block',
    marginTop: '20px',
    textAlign: 'center',
  };

  const loginLinkHoverStyle = {
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
            alt="Register Illustration"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>

        {/* Form Section */}
        <div style={formStyle}>
          <h2 style={titleStyle}>Create an Account</h2>
          <form onSubmit={handleRegister}>
            {/* Name Input */}
            <input
              type="text"
              id="name"
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />

            {/* Email Input */}
            <input
              type="email"
              id="email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            {/* Password Input */}
            <div style={{ position: 'relative' }}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {/* Eye icon */}
              {passwordVisible ? (
                <FaEye
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                />
              )}
            </div>

            {/* Confirm Password Input */}
            <div style={{ position: 'relative' }}>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                style={inputStyle}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
              {/* Eye icon */}
              {confirmPasswordVisible ? (
                <FaEye
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                />
              )}
            </div>

            {/* Error Message */}
            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

            {/* Submit button */}
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              Register
            </button>

            {/* Divider */}
            <div style={dividerStyle}>
              <div style={dividerLineStyle}></div>
              <span style={orTextStyle}>OR</span>
              <div style={dividerLineStyle}></div>
            </div>

            {/* Login Link */}
            <div style={linksContainerStyle}>
              <a
                href="/"
                style={loginLinkStyle}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Already have an account? Login here
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default RegisterForm;
