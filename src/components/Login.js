// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
// import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
// import { toast } from "react-toastify"; // Toastify for notifications
// import "react-toastify/dist/ReactToastify.css"; // Toastify styles
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
// import { Box, Typography } from '@mui/material'; // Import MUI components for the footer

// const Login = () => {
//   const navigate = useNavigate(); // Initialize useNavigate hook
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

//   // Toastify notification function
//   const notify = (message, type) => {
//     if (type === "success") {
//       toast.success(message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: true,
//         style: {
//           backgroundColor: "green",  // Green background for success
//           color: "white",              // White text
//         }
//       });
//     } else {
//       toast.error(message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: true,
//         style: {
//           backgroundColor: "#e74c3c",  // Red background for error
//           color: "white",              // White text
//         },
//       });
//     }
//   };

//   const handleResponse = (responseData) => {
//     const { token, user } = responseData;

//     // Store the token and user information in local storage
//     localStorage.setItem("authToken", token);
//     localStorage.setItem("user", JSON.stringify(user));

//     // Show success popup on screen using toast
//     toast.success("Login successful!", { position: "top-right", autoClose: 3000 });

//     // Redirect to dashboard (or another page)
//     navigate('/dashboard');  // Use navigate hook for redirection
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       // Check if the response is OK (status 200-299)
//       if (response.ok) {
//         const contentType = response.headers.get("Content-Type");

//         if (contentType && contentType.includes("application/json")) {
//           const data = await response.json();
//           handleResponse(data); // Call the response handler to handle the successful login
//         } else {
//           const errorText = await response.text(); // Handle non-JSON responses (e.g., plain text)
//           setErrorMessage(errorText || "Unexpected error occurred");
//           notify("Unexpected error occurred", "error");
//         }
//       } else {
//         const errorText = await response.text();
//         notify("Invalid email or password", "error");
//       }
//     } catch (error) {
//       setErrorMessage("Network error, please try again later");
//       notify("Network error, please try again later", "error");
//     }
//   };

//   // Transparent and light color scheme
//   const containerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: 'rgba(44, 62, 80, 0.6)', // Transparent dark background with light opacity
//     backgroundImage: 'url(https://source.unsplash.com/1600x900/?business,technology)', // Background image
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   };

//   const formContainerStyle = {
//     display: 'flex',
//     flexDirection: 'row',
//     backgroundColor: 'rgba(236, 240, 241, 0.9)', // Light gray with transparency
//     padding: '30px',
//     borderRadius: '12px',
//     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)', // Subtle shadow effect
//     maxWidth: '900px',
//     width: '100%',
//   };

//   const imageStyle = {
//     flex: '1',
//     maxWidth: '45%',
//     paddingRight: '20px',
//   };

//   const formStyle = {
//     flex: '1',
//     maxWidth: '50%',
//   };

//   const titleStyle = {
//     fontSize: '28px',
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: '20px',
//     color: '#34495E', // Darker shade for the title
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '15px',
//     margin: '10px 0',
//     borderRadius: '8px',
//     border: '1px solid #BDC3C7', // Subtle border
//     boxSizing: 'border-box',
//     fontSize: '16px',
//   };

//   const buttonStyle = {
//     backgroundColor: 'rgba(26, 188, 156, 0.8)', // Semi-transparent teal color
//     color: 'white',
//     padding: '15px',
//     width: '100%',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     margin: '18px 0',
//     transition: 'background-color 0.3s ease',
//   };

//   const buttonHoverStyle = {
//     backgroundColor: 'rgba(22, 160, 133, 0.8)', // Darker shade on hover
//   };

//   const dividerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     margin: '20px 0',
//     textAlign: 'center',
//   };

//   const dividerLineStyle = {
//     flex: 1,
//     height: '1px',
//     backgroundColor: '#BDC3C7',
//   };

//   const orTextStyle = {
//     margin: '0 10px',
//     color: '#7F8C8D', // Gray color for the 'OR' text
//   };

//   const registerLinkStyle = {
//     color: '#2980B9', // Blue for the register link
//     textDecoration: 'none',
//     fontSize: '16px',
//     display: 'inline-block',
//     marginTop: '10px',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   };

//   const registerLinkHoverStyle = {
//     textDecoration: 'underline',
//   };

//   const linksContainerStyle = {
//     textAlign: 'center',
//     marginTop: '20px',
//   };

//   return (
//     <section style={containerStyle}>
//       <div style={formContainerStyle}>
//         {/* Image Section */}
//         <div style={imageStyle}>
//           <img
//             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
//             alt="Login Illustration"
//             style={{ width: '100%', borderRadius: '10px' }}
//           />
//         </div>

//         {/* Form Section */}
//         <div style={formStyle}>
//           <h2 style={titleStyle}>Tech Titans</h2>
//           <form onSubmit={handleSubmit}>
//             {/* Email Input */}
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 style={inputStyle}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Password Input with Eye Icon */}
//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <div style={{ position: 'relative' }}>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   className="form-control"
//                   style={inputStyle}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={{
//                     position: 'absolute',
//                     right: '10px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//             </div>

//             {/* Remember Me Checkbox */}
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 checked={rememberMe}
//                 onChange={() => setRememberMe(!rememberMe)}
//                 style={{ marginRight: '10px' }}
//               />
//               <label htmlFor="rememberMe">Remember me</label>
//             </div>

//             {/* Success Message */}
//             {errorMessage && <p className="text-success">{errorMessage}</p>}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               style={buttonStyle}
//               onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
//               onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
//             >
//               Sign in
//             </button>

//             {/* Links Container */}
//             <div style={linksContainerStyle}>
//               <a href="/forgot" style={{ fontSize: '14px', color: '#7F8C8D' }}>
//                 Forgot password?
//               </a>
//               {/* Divider with OR */}
//               <div style={dividerStyle}>
//                 <div style={dividerLineStyle}></div>
//                 <span style={orTextStyle}>OR</span>
//                 <div style={dividerLineStyle}></div>
//               </div>
//               <p style={{ fontSize: '14px', color: '#7F8C8D', marginTop: '15px' }}>
//                 New here?{" "}
//                 <a href="/register" style={registerLinkStyle}>
//                   Create an account
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Footer Section */}
//       <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#333", color: "#fff", padding: 2, textAlign: "center" }}>
//         <Typography variant="body2"> ❤️ 2025 Tech Titan's Inventory. All Rights Reserved.</Typography>
//       </Box>
//     </section>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
// import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
// import { toast } from "react-toastify"; // Toastify for notifications
// import "react-toastify/dist/ReactToastify.css"; // Toastify styles
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
// import { Box, Typography } from '@mui/material'; // Import MUI components for the footer

// const Login = () => {
//   const navigate = useNavigate(); // Initialize useNavigate hook
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

//   // Toastify notification function
//   const notify = (message, type) => {
//     if (type === "success") {
//       toast.success(message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: true,
//         style: {
//           backgroundColor: "green",  // Green background for success
//           color: "white",              // White text
//         }
//       });
//     } else {
//       toast.error(message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: true,
//         style: {
//           backgroundColor: "#e74c3c",  // Red background for error
//           color: "white",              // White text
//         },
//       });
//     }
//   };

//   const handleResponse = (responseData) => {
//     const { token, user } = responseData;

//     // Store the token and user information in local storage
//     localStorage.setItem("authToken", token);
//     localStorage.setItem("user", JSON.stringify(user));

//     // Show success popup on screen using toast
//     toast.success("Login successful!", { position: "top-right", autoClose: 3000 });

//     // Redirect to dashboard (or another page)
//     navigate('/dashboard');  // Use navigate hook for redirection
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const contentType = response.headers.get("Content-Type");

//         if (contentType && contentType.includes("application/json")) {
//           const data = await response.json();
//           handleResponse(data);
//         } else {
//           const errorText = await response.text();
//           setErrorMessage(errorText || "Unexpected error occurred");
//           notify("Unexpected error occurred", "error");
//         }
//       } else {
//         const errorText = await response.text();
//         notify("Invalid email or password", "error");
//       }
//     } catch (error) {
//       setErrorMessage("Network error, please try again later");
//       notify("Network error, please try again later", "error");
//     }
//   };

//   const containerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: 'rgba(44, 62, 80, 0.6)',
//     backgroundImage: 'url(https://source.unsplash.com/1600x900/?business,technology)',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   };

//   const formContainerStyle = {
//     display: 'flex',
//     flexDirection: 'row',
//     backgroundColor: 'rgba(236, 240, 241, 0.9)',
//     padding: '30px',
//     borderRadius: '12px',
//     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
//     maxWidth: '900px',
//     width: '100%',
//   };

//   const formStyle = {
//     flex: '1',
//     maxWidth: '50%',
//   };

//   const titleStyle = {
//     fontSize: '28px',
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: '20px',
//     color: '#34495E',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '15px',
//     margin: '10px 0',
//     borderRadius: '8px',
//     border: '1px solid #BDC3C7',
//     boxSizing: 'border-box',
//     fontSize: '16px',
//   };

//   const buttonStyle = {
//     backgroundColor: 'rgba(26, 188, 156, 0.8)',
//     color: 'white',
//     padding: '15px',
//     width: '100%',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     margin: '18px 0',
//     transition: 'background-color 0.3s ease',
//   };

//   const buttonHoverStyle = {
//     backgroundColor: 'rgba(22, 160, 133, 0.8)',
//   };

//   const dividerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     margin: '20px 0',
//     textAlign: 'center',
//   };

//   const dividerLineStyle = {
//     flex: 1,
//     height: '1px',
//     backgroundColor: '#BDC3C7',
//   };

//   const orTextStyle = {
//     margin: '0 10px',
//     color: '#7F8C8D',
//   };

//   return (
//     <section style={containerStyle}>
//       <div style={formContainerStyle}>
//         <div style={formStyle}>
//           <h2 style={titleStyle}>Tech Titans</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 style={inputStyle}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <div style={{ position: 'relative' }}>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   className="form-control"
//                   style={inputStyle}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={{
//                     position: 'absolute',
//                     right: '10px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 checked={rememberMe}
//                 onChange={() => setRememberMe(!rememberMe)}
//                 style={{ marginRight: '10px' }}
//               />
//               <label htmlFor="rememberMe">Remember me</label>
//             </div>

//             {errorMessage && <p className="text-success">{errorMessage}</p>}

//             <button
//               type="submit"
//               style={buttonStyle}
//               onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
//               onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
//             >
//               Sign in
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { toast } from "react-toastify"; // Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { Box, Typography } from '@mui/material'; // Import MUI components for the footer
//import jwt_decode from 'jwt-decode';  // Correct import for jwt-decode
import { jwtDecode } from 'jwt-decode';


const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Toastify notification function
  const notify = (message, type) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        style: {
          backgroundColor: "green",  // Green background for success
          color: "white",              // White text
        }
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        style: {
          backgroundColor: "#e74c3c",  // Red background for error
          color: "white",              // White text
        },
      });
    }
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token ) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  const handleResponse = (responseData) => {
    const { token, user } = responseData;
  
    // Store the token and user information in local storage
    localStorage.setItem("authToken", token);
   // localStorage.setItem("user", JSON.stringify(user));
    console.log(token);
  
    // Decode the JWT to get userId
    if (token) {
      try {
        // Decode the token using jwtDecode
        const decodedToken = jwtDecode(token);
  
        // Log the entire decoded token to inspect its structure
        // console.log("Decoded token:", decodedToken);
  
        // Extract userId (use 'sub' as userId in this case)
        const userId = decodedToken.sub; // 'sub' is the user ID in your token
        console.log("User ID from decoded token:", userId);
        // console.log(userId.sub)
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  
    // Show success popup on screen using toast
    toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
  
    // Redirect to dashboard (or another page)
    navigate('/dashboard');  // Use navigate hook for redirection
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is OK (status 200-299)
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        
        if (contentType.includes("application/json")) {
          const data = await response.json();
          handleResponse(data); // Call the response handler to handle the successful login
        } else {
          const errorText = await response.text(); // Handle non-JSON responses (e.g., plain text)
          setErrorMessage(errorText || "Unexpected error occurred");
          notify("Unexpected error occurred", "error");
        }
      } else {
        const errorText = await response.text();
        notify("Invalid email or password", "error");
      }
    } catch (error) {
      setErrorMessage("Network error, please try again later");
      notify("Network error, please try again later", "error");
    }
  };

  // Transparent and light color scheme
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(44, 62, 80, 0.6)', // Transparent dark background with light opacity
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?business,technology)', // Background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(236, 240, 241, 0.9)', // Light gray with transparency
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)', // Subtle shadow effect
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
    color: '#34495E', // Darker shade for the title
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #BDC3C7', // Subtle border
    boxSizing: 'border-box',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: 'rgba(26, 188, 156, 0.8)', // Semi-transparent teal color
    color: 'white',
    padding: '15px',
    width: '100%',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '18px 0',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: 'rgba(22, 160, 133, 0.8)', // Darker shade on hover
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
    color: '#7F8C8D', // Gray color for the 'OR' text
  };

  const registerLinkStyle = {
    color: '#2980B9', // Blue for the register link
    textDecoration: 'none',
    fontSize: '16px',
    display: 'inline-block',
    marginTop: '10px',
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
            alt="Login Illustration"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>

        {/* Form Section */}
        <div style={formStyle}>
          <h2 style={titleStyle}>Tech Titans</h2>
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

            {/* Password Input with Eye Icon */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  style={inputStyle}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                style={{ marginRight: '10px' }}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            {/* Success Message */}
            {errorMessage && <p className="text-success">{errorMessage}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              Sign in
            </button>

            {/* Links Container */}
            <div style={linksContainerStyle}>
              <a href="/forgot" style={{ fontSize: '14px', color: '#7F8C8D' }}>
                Forgot password?
              </a>
              {/* Divider with OR */}
              <div style={dividerStyle}>
                <div style={dividerLineStyle}></div>
                <span style={orTextStyle}>OR</span>
                <div style={dividerLineStyle}></div>
              </div>
              <p style={{ fontSize: '14px', color: '#7F8C8D', marginTop: '15px' }}>
                New here?{" "}
                <a href="/register" style={registerLinkStyle}>
                  Create an account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#2C3E50", color: "#ECF0F1", padding: 2, textAlign: "center" }}>
        <Typography variant="body2"> ❤️ 2025 Tech Titan's Inventory. All Rights Reserved.</Typography>
      </Box>
    </section>
  );
};

export default Login;
