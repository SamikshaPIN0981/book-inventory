// import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
// import { toast } from "react-toastify"; // Toastify for notifications
// import "react-toastify/dist/ReactToastify.css"; // Toastify styles

// const ForgotPasswordForm = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:8080/api/password-reset/forgot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMessage(data.message);
//         toast.success("Reset link sent to your email!");
//       } else {
//         setMessage('Error sending reset link. Please try again.');
//         toast.error("Error sending reset link.");
//       }
//     } catch (error) {
//       setMessage('Error sending reset link. Please try again.');
//       toast.error("Network error, please try again later.");
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
//     marginTop: '18px',
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

//   const registerLinkStyle = {
//     color: '#2980B9',
//     textDecoration: 'none',
//     fontSize: '16px',
//     display: 'inline-block',
//     marginTop: '20px',
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
//             alt="Forgot Password Illustration"
//             style={{ width: '100%', borderRadius: '10px' }}
//           />
//         </div>

//         {/* Form Section */}
//         <div style={formStyle}>
//           <h2 style={titleStyle}>Reset Your Password</h2>
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

//             {/* Submit Button */}
//             <button
//               type="submit"
//               style={buttonStyle}
//               onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
//               onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
//             >
//               Send Reset Link
//             </button>

//             {/* Message after submit */}
//             {message && <p className="text-center" style={{ color: '#e74c3c' }}>{message}</p>}

//             {/* Divider */}
//             <div style={dividerStyle}>
//               <div style={dividerLineStyle}></div>
//               <p style={orTextStyle}>OR</p>
//               <div style={dividerLineStyle}></div>
//             </div>
//           </form>

//           {/* Links Container */}
//           <div style={linksContainerStyle}>
//             {/* Register Link */}
//             <a
//               href="/register"
//               style={registerLinkStyle}
//               onMouseEnter={(e) => (e.target.style.textDecoration = registerLinkHoverStyle.textDecoration)}
//               onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
//             >
//               Don't have an account? Register
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ForgotPasswordForm;

// import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
// import { toast } from "react-toastify"; // Toastify for notifications
// import "react-toastify/dist/ReactToastify.css"; // Toastify styles

// const ForgotPasswordForm = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [token, setToken] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [isTokenSent, setIsTokenSent] = useState(false);

//   const handleForgotPasswordSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const token = data.token;
//         setMessage(data.message);
//         setMessage(data.token);
//         if(token){

//         const encodedToken = btoa(token);
//         localStorage.setItem('encodedToken',encodedToken);
//         setIsTokenSent(true);
//         toast.success("Reset link sent to your email!");}
//       } else {
//         setMessage('Error sending reset link. Please try again.');
//         toast.error("Error sending reset link.");
//       }
//     } catch (error) {
//       setMessage('Error sending reset link. Please try again.');
//       toast.error("Network error, please try again later.");
//     }
//   };


//   const handleResetPasswordSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:8080/api/auth/reset-password?token=${atob(token)}', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ newPassword }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMessage(data.message);
//         toast.success("Password updated successfully!");
//       } else {
//         setMessage('Error updating password. Please try again.');
//         toast.error("Error updating password.");
//       }
//     } catch (error) {
//       setMessage('Error updating password. Please try again.');
//       toast.error("Network error, please try again later.");
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
//     marginTop: '18px',
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

//   const registerLinkStyle = {
//     color: '#2980B9',
//     textDecoration: 'none',
//     fontSize: '16px',
//     display: 'inline-block',
//     marginTop: '20px',
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
//             alt="Forgot Password Illustration"
//             style={{ width: '100%', borderRadius: '10px' }}
//           />
//         </div>

//         {/* Form Section */}
//         <div style={formStyle}>
//           <h2 style={titleStyle}>{isTokenSent ? 'Reset Your Password' : 'Forgot Your Password?'}</h2>

//           {/* Forgot Password Form */}
//           {!isTokenSent ? (
//             <form onSubmit={handleForgotPasswordSubmit}>
//               {/* Email Input */}
//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   style={inputStyle}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 style={buttonStyle}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
//               >
//                 Send Reset Link
//               </button>
//             </form>
//           ) : (
//             <form onSubmit={handleResetPasswordSubmit}>
//               {/* Reset Token Input */}
//               {/* <div className="mb-3">
//                 <label className="form-label">Reset Token</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   style={inputStyle}
//                   value={token}
//                   onChange={(e) => setToken(e.target.value)}
//                   required
//                 />
//               </div> */}

//               {/* New Password Input */}
//               <div className="mb-3">
//                 <label className="form-label">New Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   style={inputStyle}
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 style={buttonStyle}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
//               >
//                 Update Password
//               </button>
//             </form>
//           )}

//           {/* Message after submit */}
//           {message && <p className="text-center" style={{ color: '#e74c3c' }}>{message}</p>}

//           {/* Divider */}
//           <div style={dividerStyle}>
//             <div style={dividerLineStyle}></div>
//             <p style={orTextStyle}>OR</p>
//             <div style={dividerLineStyle}></div>
//           </div>

//           {/* Register Link */}
//           <div style={linksContainerStyle}>
//             <a
//               href="/register"
//               style={registerLinkStyle}
//               onMouseEnter={(e) => (e.target.style.textDecoration = registerLinkHoverStyle.textDecoration)}
//               onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
//             >
//               Don't have an account? Register
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ForgotPasswordForm;
// import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import { toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 

// const ForgotPasswordForm = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [isTokenSent, setIsTokenSent] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleForgotPasswordSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();
//       console.log("Forgot Password Response:", data); // Debugging log

//       if (response.ok) {
//         setMessage(data.message);
//         const token = data.token;

//         if (token) {
//           const encodedToken = btoa(token);
//           localStorage.setItem('encodedToken', encodedToken);
//           setIsTokenSent(true); // Set state indicating token was sent
//           toast.success("Reset link sent to your email!");
//         }
//       } else {
//         setMessage(data.message || "Error sending reset link. Please try again.");
//         toast.error(data.message || "Error sending reset link.");
//       }
//     } catch (error) {
//       console.error("Network Error:", error); // Detailed error logging
//       setMessage('Error sending reset link. Please try again.');
//       toast.error("Network error, please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleResetPasswordSubmit = async (e) => {
//     e.preventDefault();
//     const token = atob(localStorage.getItem('encodedToken')); 

//     try {
//       const response = await fetch(`http://localhost:8080/api/auth/reset-password?token=${token}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ newPassword }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMessage(data.message);
//         toast.success("Password updated successfully!");
//       } else {
//         setMessage('Error updating password. Please try again.');
//         toast.error("Error updating password.");
//       }
//     } catch (error) {
//       setMessage('Error updating password. Please try again.');
//       toast.error("Network error, please try again later.");
//     }
//   };

//   // Debugging logs
//   console.log("isTokenSent: ", isTokenSent);

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
//     marginTop: '18px',
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

//   const registerLinkStyle = {
//     color: '#2980B9',
//     textDecoration: 'none',
//     fontSize: '16px',
//     display: 'inline-block',
//     marginTop: '20px',
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
//             alt="Forgot Password Illustration"
//             style={{ width: '100%', borderRadius: '10px' }}
//           />
//         </div>

//         {/* Form Section */}
//         <div style={formStyle}>
//         <h2>{isTokenSent ? 'Reset Your Password' : 'Forgot Your Password?'}</h2>

// {/* Forgot Password Form */}
// {!isTokenSent ? (
//   <form onSubmit={handleForgotPasswordSubmit}>
//     <div>
//       <label>Email</label>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//     </div>

//     <button type="submit" disabled={isSubmitting}>
//       {isSubmitting ? 'Sending...' : 'Send Reset Link'}
//     </button>
//   </form>
// ) : (
//   <form onSubmit={handleResetPasswordSubmit}>
//     <div>
//       <label>New Password</label>
//       <input
//         type="password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         required
//       />
//     </div>

//     <button type="submit">
//       Update Password
//     </button>
//   </form>
// )}
//           {/* Message after submit */}
//           {message && <p className="text-center" style={{ color: '#e74c3c' }}>{message}</p>}

//           {/* Divider */}
//           <div style={dividerStyle}>
//             <div style={dividerLineStyle}></div>
//             <p style={orTextStyle}>OR</p>
//             <div style={dividerLineStyle}></div>
//           </div>

//           {/* Register Link */}
//           <div style={linksContainerStyle}>
//             <a
//               href="/register"
//               style={registerLinkStyle}
//               onMouseEnter={(e) => (e.target.style.textDecoration = registerLinkHoverStyle.textDecoration)}
//               onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
//             >
//               Don't have an account? Register
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ForgotPasswordForm;

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
