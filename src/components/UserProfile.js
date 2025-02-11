// import React, { useState, useEffect } from 'react';

// const UserProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: 'Diksha',
//     lastName: 'Loke',
//     dateOfBirth: '',
//     gender: '',
//     address: '',
//     phone: '',
//     nationality: '',
//     maritalStatus: '',
//     occupation: '',
//   });
//   const [profileImageFile, setProfileImageFile] = useState(null); // state for profile image

//   // Fetch user profile data
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');

//     if (!token) {
//       setError('Authentication token is missing');
//       setLoading(false);
//       return;
//     }

//     fetch('http://localhost:8080/api/profile', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         if (response.status === 401) {
//           throw new Error('Unauthorized. Please log in again.');
//         }
//         if (response.status === 404) {
//           throw new Error('User profile not found.');
//         }
//         if (!response.ok) {
//           throw new Error('Failed to fetch user profile.');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setProfile(data);
//         setFormData({
//           firstName: data.firstName || 'Diksha',
//           lastName: data.lastName || 'Loke',
//           dateOfBirth: data.dateOfBirth || '',
//           gender: data.gender || '',
//           address: data.address || '',
//           phone: data.phone || '',
//           nationality: data.nationality || '',
//           maritalStatus: data.maritalStatus || '',
//           occupation: data.occupation || '',
//         });
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle profile image change
//   const handleImageChange = (e) => {
//     setProfileImageFile(e.target.files[0]);
//   };

//   // Handle form submission for editing
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create a new FormData object
//     const formDataToSend = new FormData();

//     // Append user profile fields to FormData
//     formDataToSend.append('firstName', formData.firstName);
//     formDataToSend.append('lastName', formData.lastName);
//     formDataToSend.append('dateOfBirth', formData.dateOfBirth);
//     formDataToSend.append('gender', formData.gender);
//     formDataToSend.append('address', formData.address);
//     formDataToSend.append('phone', formData.phone);
//     formDataToSend.append('nationality', formData.nationality);
//     formDataToSend.append('maritalStatus', formData.maritalStatus);
//     formDataToSend.append('occupation', formData.occupation);

//     // If a profile image exists, append it to the FormData
//     if (profileImageFile) {
//         formDataToSend.append('profileImage', profileImageFile);
//     }

//     // Retrieve the token from localStorage
//     const token = localStorage.getItem('authToken');

//     try {
//         // Send the PUT request with Authorization header and FormData
//         const response = await fetch('http://localhost:8080/api/profile/update', {
//             method: 'PUT',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 // Do not manually set 'Content-Type' when using FormData, it will be handled by the browser
//             },
//             body: formDataToSend,  // Send the form data
//         });

//         const data = await response.json();

//         if (response.ok) {
//             setProfile(data);  // Update the profile in the state
//             setEditing(false); // Stop editing
//         } else {
//             setError(data.message);  // Display error message
//         }
//     } catch (error) {
//         setError(error.message);  // Display error message
//     }
// };

//   // Inline Styles
//   const profileContainerStyle = {
//     width: '70%',
//     margin: '0 auto',
//     padding: '30px',
//     backgroundColor: '#f4f7fc',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     fontFamily: 'Arial, sans-serif',
//   };

//   const profileHeaderStyle = {
//     textAlign: 'center',
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: '30px',
//   };

//   const profileInfoStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '20px',
//   };

//   const profileInfoTextStyle = {
//     fontSize: '1.1rem',
//     color: '#34495e',
//     textAlign: 'center',
//   };

//   const profileImageStyle = {
//     width: '150px',
//     height: '150px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//     border: '3px solid #1abc9c',
//   };

//   const editProfileBtnStyle = {
//     display: 'block',
//     margin: '20px auto',
//     padding: '10px 20px',
//     backgroundColor: '#1abc9c',
//     color: 'white',
//     fontSize: '1.1rem',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//   };

//   const editProfileBtnHoverStyle = {
//     backgroundColor: '#16a085',
//   };

//   const editFormStyle = {
//     marginTop: '30px',
//     padding: '20px',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   };

//   const formFieldStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     marginBottom: '20px',
//     border: '2px solid #ccc',
//     padding: '10px',
//     borderRadius: '5px',
//     backgroundColor: '#fafafa',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     margin: '5px 0',
//     fontSize: '1rem',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//   };

//   const buttonStyle = {
//     padding: '10px 20px',
//     backgroundColor: '#1abc9c',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '1rem',
//     cursor: 'pointer',
//   };

//   const cancelBtnStyle = {
//     backgroundColor: '#e74c3c',
//   };

//   const cancelBtnHoverStyle = {
//     backgroundColor: '#c0392b',
//   };

//   // If loading, show loading message
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // If error occurs, show error message
//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div style={profileContainerStyle}>
//       <h1 style={profileHeaderStyle}>User Profile</h1>

//       {profile && !editing ? (
//         <div>
//           <div style={profileInfoStyle}>
//             {profile.profileImageBase64 && (
//               <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <img
//                   src={`data:image/jpeg;base64,${profile.profileImageBase64}`}
//                   alt="Profile"
//                   style={profileImageStyle}
//                 />
//               </div>
//             )}
//             <p style={profileInfoTextStyle}><strong>First Name:</strong> {profile.firstName}</p>
//             <p style={profileInfoTextStyle}><strong>Last Name:</strong> {profile.lastName}</p>
//             <p style={profileInfoTextStyle}><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
//             <p style={profileInfoTextStyle}><strong>Gender:</strong> {profile.gender}</p>
//             <p style={profileInfoTextStyle}><strong>Address:</strong> {profile.address}</p>
//             <p style={profileInfoTextStyle}><strong>Phone:</strong> {profile.phone}</p>
//             <p style={profileInfoTextStyle}><strong>Nationality:</strong> {profile.nationality}</p>
//             <p style={profileInfoTextStyle}><strong>Marital Status:</strong> {profile.maritalStatus}</p>
//             <p style={profileInfoTextStyle}><strong>Occupation:</strong> {profile.occupation}</p>
//           </div>

//           <button
//             style={editProfileBtnStyle}
//             onClick={() => setEditing(true)}
//             onMouseOver={(e) => e.target.style.backgroundColor = editProfileBtnHoverStyle.backgroundColor}
//             onMouseOut={(e) => e.target.style.backgroundColor = '#1abc9c'}
//           >
//             Edit Profile
//           </button>
//         </div>
//       ) : (
//         <div style={editFormStyle}>
//           <h2>Edit Profile</h2>
//           <form onSubmit={handleSubmit}>
//             <div style={formFieldStyle}>
//               <label htmlFor="firstName">First Name:</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="lastName">Last Name:</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="dateOfBirth">Date of Birth:</label>
//               <input
//                 type="date"
//                 id="dateOfBirth"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="gender">Gender:</label>
//               <select
//                 id="gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 style={inputStyle}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="address">Address:</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="phone">Phone:</label>
//               <input
//                 type="text"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="nationality">Nationality:</label>
//               <input
//                 type="text"
//                 id="nationality"
//                 name="nationality"
//                 value={formData.nationality}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="maritalStatus">Marital Status:</label>
//               <input
//                 type="text"
//                 id="maritalStatus"
//                 name="maritalStatus"
//                 value={formData.maritalStatus}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="occupation">Occupation:</label>
//               <input
//                 type="text"
//                 id="occupation"
//                 name="occupation"
//                 value={formData.occupation}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="profileImage">Profile Image:</label>
//               <input
//                 type="file"
//                 id="profileImage"
//                 name="profileImage"
//                 onChange={handleImageChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={{ display: 'flex', gap: '10px' }}>
//               <button type="submit" style={buttonStyle}>Save Changes</button>
//               <button
//                 type="button"
//                 style={{ ...buttonStyle, ...cancelBtnStyle }}
//                 onClick={() => setEditing(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;



// import React, { useState, useEffect } from 'react';

// const UserProfile = () => {



//   // Inline Styles
//   const profileContainerStyle = {
//     width: '70%',
//     margin: '0 auto',
//     padding: '30px',
//     backgroundColor: '#f4f7fc',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     fontFamily: 'Arial, sans-serif',
//   };

//   const profileHeaderStyle = {
//     textAlign: 'center',
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: '30px',
//   };

//   const profileInfoStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '20px',
//   };

//   const profileInfoTextStyle = {
//     fontSize: '1.1rem',
//     color: '#34495e',
//     textAlign: 'center',
//   };

//   const profileImageStyle = {
//     width: '150px',
//     height: '150px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//     border: '3px solid #1abc9c',
//   };

//   const editProfileBtnStyle = {
//     display: 'block',
//     margin: '20px auto',
//     padding: '10px 20px',
//     backgroundColor: '#1abc9c',
//     color: 'white',
//     fontSize: '1.1rem',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//   };

//   const editProfileBtnHoverStyle = {
//     backgroundColor: '#16a085',
//   };

//   const editFormStyle = {
//     marginTop: '30px',
//     padding: '20px',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   };

//   const formFieldStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     marginBottom: '20px',
//     border: '2px solid #ccc',
//     padding: '10px',
//     borderRadius: '5px',
//     backgroundColor: '#fafafa',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     margin: '5px 0',
//     fontSize: '1rem',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//   };

//   const buttonStyle = {
//     padding: '10px 20px',
//     backgroundColor: '#1abc9c',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '1rem',
//     cursor: 'pointer',
//   };

//   const cancelBtnStyle = {
//     backgroundColor: '#e74c3c',
//   };

//   const cancelBtnHoverStyle = {
//     backgroundColor: '#c0392b',
//   };

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: 'Diksha',
//     lastName: 'Loke',
//     dateOfBirth: '',
//     gender: '',
//     address: '',
//     phone: '',
//     nationality: '',
//     maritalStatus: '',
//     occupation: '',
//   });
//   const [profileImageFile, setProfileImageFile] = useState(null); // state for profile image


//   // Separate function to fetch profile data
//   const getProfile = async () => {
//     const token = localStorage.getItem('authToken');

//     if (!token) {
//       setError('Authentication token is missing');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/api/profile', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 401) {
//         throw new Error('Unauthorized. Please log in again.');
//       }
//       if (response.status === 404) {
//         throw new Error('User profile not found.');
//       }
//       if (!response.ok) {
//         throw new Error('Failed to fetch user profile.');
//       }

//       const data = await response.json();
//       setProfile(data);
//       setFormData({
//         firstName: data.firstName || 'Diksha',
//         lastName: data.lastName || 'Loke',
//         dateOfBirth: data.dateOfBirth || '',
//         gender: data.gender || '',
//         address: data.address || '',
//         phone: data.phone || '',
//         nationality: data.nationality || '',
//         maritalStatus: data.maritalStatus || '',
//         occupation: data.occupation || '',
//       });
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   // Fetch user profile data
//   useEffect(() => {
//     getProfile();
//   }, []);

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle profile image change
//   const handleImageChange = (e) => {
//     setProfileImageFile(e.target.files[0]);
//   };

//   // Handle form submission for editing
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create a new FormData object to handle multipart form submission
//     const formDataToSend = new FormData();

//     // Append userProfile fields
//     formDataToSend.append('firstName', formData.firstName);
//     formDataToSend.append('lastName', formData.lastName);
//     formDataToSend.append('dateOfBirth', formData.dateOfBirth);
//     formDataToSend.append('gender', formData.gender);
//     formDataToSend.append('address', formData.address);
//     formDataToSend.append('phone', formData.phone);
//     formDataToSend.append('nationality', formData.nationality);
//     formDataToSend.append('maritalStatus', formData.maritalStatus);
//     formDataToSend.append('occupation', formData.occupation);

//     // If a profile image is selected, append it to FormData
//     if (profileImageFile) {
//       formDataToSend.append('profileImage', profileImageFile);
//     }

//     // Retrieve the token from localStorage
//     const token = localStorage.getItem('authToken');

//     try {
//       // Send the PUT request with Authorization header and FormData
//       const response = await fetch('http://localhost:8080/api/profile/update', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           // Content-Type is automatically set by the browser when using FormData
//         },
//         body: formDataToSend,  // Send the form data
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setProfile(data);  // Update profile state with the response data
//         setEditing(false); // Stop editing mode
//         getProfile();

//       } else {
//         setError(data.message);  // Show error message if not successful
//       }
//     } catch (error) {
//       setError(error.message);  // Show error message if there was an error in the request
//     }
//   };


//   // If loading, show loading message
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // If error occurs, show error message
//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div style={profileContainerStyle}>
//       <h1 style={profileHeaderStyle}>User Profile</h1>

//       {profile && !editing ? (
//         <div>
//           <div style={profileInfoStyle}>
//             {profile.profileImageBase64 && (
//               <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <img
//                   src={`data:image/jpeg;base64,${profile.profileImageBase64}`}
//                   alt="Profile"
//                   style={profileImageStyle}
//                 />
//               </div>
//             )}
//             <p style={profileInfoTextStyle}><strong>First Name:</strong> {profile.firstName}</p>
//             <p style={profileInfoTextStyle}><strong>Last Name:</strong> {profile.lastName}</p>
//             <p style={profileInfoTextStyle}><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
//             <p style={profileInfoTextStyle}><strong>Gender:</strong> {profile.gender}</p>
//             <p style={profileInfoTextStyle}><strong>Address:</strong> {profile.address}</p>
//             <p style={profileInfoTextStyle}><strong>Phone:</strong> {profile.phone}</p>
//             <p style={profileInfoTextStyle}><strong>Nationality:</strong> {profile.nationality}</p>
//             <p style={profileInfoTextStyle}><strong>Marital Status:</strong> {profile.maritalStatus}</p>
//             <p style={profileInfoTextStyle}><strong>Occupation:</strong> {profile.occupation}</p>
//           </div>

//           <button
//             style={editProfileBtnStyle}
//             onClick={() => setEditing(true)}
//             onMouseOver={(e) => e.target.style.backgroundColor = editProfileBtnHoverStyle.backgroundColor}
//             onMouseOut={(e) => e.target.style.backgroundColor = '#1abc9c'}
//           >
//             Edit Profile
//           </button>
//         </div>
//       ) : (
//         <div style={editFormStyle}>
//           <h2>Edit Profile</h2>
//           <form onSubmit={handleSubmit}>
//             <div style={formFieldStyle}>
//               <label htmlFor="firstName">First Name:</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="lastName">Last Name:</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="dateOfBirth">Date of Birth:</label>
//               <input
//                 type="date"
//                 id="dateOfBirth"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="gender">Gender:</label>
//               <select
//                 id="gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 style={inputStyle}
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="address">Address:</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="phone">Phone:</label>
//               <input
//                 type="text"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="nationality">Nationality:</label>
//               <input
//                 type="text"
//                 id="nationality"
//                 name="nationality"
//                 value={formData.nationality}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="maritalStatus">Marital Status:</label>
//               <input
//                 type="text"
//                 id="maritalStatus"
//                 name="maritalStatus"
//                 value={formData.maritalStatus}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="occupation">Occupation:</label>
//               <input
//                 type="text"
//                 id="occupation"
//                 name="occupation"
//                 value={formData.occupation}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="profileImage">Profile Image:</label>
//               <input
//                 type="file"
//                 id="profileImage"
//                 name="profileImage"
//                 onChange={handleImageChange}
//                 style={inputStyle}
//               />
//             </div>
//             <button
//               type="submit"
//               // style={saveBtnStyle}
//               // onMouseOver={(e) => e.target.style.backgroundColor = saveBtnHoverStyle.backgroundColor}
//               onMouseOut={(e) => e.target.style.backgroundColor = '#2ecc71'}
//             >
//               Save Changes
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }  

// export default UserProfile;


// import React, { useState, useEffect } from 'react';

// const UserProfile = () => {
//   const profileContainerStyle = {
//     width: '70%',
//     margin: '0 auto',
//     padding: '30px',
//     backgroundColor: '#f4f7fc',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     fontFamily: 'Arial, sans-serif',
//   };

//   const profileHeaderStyle = {
//     textAlign: 'center',
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: '30px',
//   };

//   const profileInfoStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '20px',
//   };

//   const profileInfoTextStyle = {
//     fontSize: '1.1rem',
//     color: '#34495e',
//     textAlign: 'center',
//   };

//   const profileImageStyle = {
//     width: '150px',
//     height: '150px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//     border: '3px solid #1abc9c',
//   };

//   const editProfileBtnStyle = {
//     display: 'block',
//     margin: '20px auto',
//     padding: '10px 20px',
//     backgroundColor: '#1abc9c',
//     color: 'white',
//     fontSize: '1.1rem',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//   };

//   const editProfileBtnHoverStyle = {
//     backgroundColor: '#16a085',
//   };

//   const editFormStyle = {
//     marginTop: '30px',
//     padding: '20px',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   };

//   const formFieldStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     marginBottom: '20px',
//     border: '2px solid #ccc',
//     padding: '10px',
//     borderRadius: '5px',
//     backgroundColor: '#fafafa',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     margin: '5px 0',
//     fontSize: '1rem',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//   };

//   const buttonStyle = {
//     padding: '10px 20px',
//     backgroundColor: '#1abc9c',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '1rem',
//     cursor: 'pointer',
//   };

//   const cancelBtnStyle = {
//     backgroundColor: '#e74c3c',
//   };

//   const cancelBtnHoverStyle = {
//     backgroundColor: '#c0392b',
//   };

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [creating, setCreating] = useState(false); // For creating profile
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     gender: '',
//     address: '',
//     phone: '',
//     nationality: '',
//     maritalStatus: '',
//     occupation: '',
//   });
//   const [profileImageFile, setProfileImageFile] = useState(null);

//   // Separate function to fetch profile data
//   const getProfile = async () => {
//     const token = localStorage.getItem('authToken');

//     if (!token) {
//       setError('Authentication token is missing');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/api/profile', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 401) {
//         throw new Error('Unauthorized. Please log in again.');
//       }
//       if (response.status === 404) {
//         setLoading(false);
//         setCreating(true); // Show profile creation form if not found
//         return;
//       }
//       if (!response.ok) {
//         throw new Error('Failed to fetch user profile.');
//       }

//       const data = await response.json();
//       setProfile(data);
//       setFormData({
//         firstName: data.firstName || '',
//         lastName: data.lastName || '',
//         dateOfBirth: data.dateOfBirth || '',
//         gender: data.gender || '',
//         address: data.address || '',
//         phone: data.phone || '',
//         nationality: data.nationality || '',
//         maritalStatus: data.maritalStatus || '',
//         occupation: data.occupation || '',
//       });
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   // Create a user profile if not found
//   const createProfile = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append('firstName', formData.firstName);
//     formDataToSend.append('lastName', formData.lastName);
//     formDataToSend.append('dateOfBirth', formData.dateOfBirth);
//     formDataToSend.append('gender', formData.gender);
//     formDataToSend.append('address', formData.address);
//     formDataToSend.append('phone', formData.phone);
//     formDataToSend.append('nationality', formData.nationality);
//     formDataToSend.append('maritalStatus', formData.maritalStatus);
//     formDataToSend.append('occupation', formData.occupation);

//     if (profileImageFile) {
//       formDataToSend.append('profileImage', profileImageFile);
//     }

//     const token = localStorage.getItem('authToken');
//     try {
//       const response = await fetch('http://localhost:8080/api/profile/create', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setProfile(data);
//         setCreating(false);
//         getProfile();
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   // Fetch user profile data
//   useEffect(() => {
//     getProfile();
//   }, []);

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle profile image change
//   const handleImageChange = (e) => {
//     setProfileImageFile(e.target.files[0]);
//   };

//   // Handle form submission for editing
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append('firstName', formData.firstName);
//     formDataToSend.append('lastName', formData.lastName);
//     formDataToSend.append('dateOfBirth', formData.dateOfBirth);
//     formDataToSend.append('gender', formData.gender);
//     formDataToSend.append('address', formData.address);
//     formDataToSend.append('phone', formData.phone);
//     formDataToSend.append('nationality', formData.nationality);
//     formDataToSend.append('maritalStatus', formData.maritalStatus);
//     formDataToSend.append('occupation', formData.occupation);

//     if (profileImageFile) {
//       // formDataToSend.append('profileImage', formData.profileImageFile);
//       formDataToSend.append('profileImage', profileImageFile);

//     }

//     const token = localStorage.getItem('authToken');

//     try {
//       const response = await fetch('http://localhost:8080/api/profile/update', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setProfile(data);
//         setEditing(false);
//         getProfile();
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div style={profileContainerStyle}>
//       <h1 style={profileHeaderStyle}>User Profile</h1>

//       {profile && !editing && !creating ? (
//         <div>
//           <div style={profileInfoStyle}>
//             {profile.profileImageBase64 && (
//               <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <img
//                   src={`data:image/jpeg;base64,${profile.profileImageBase64}`}
//                   alt="Profile"
//                   style={profileImageStyle}
//                 />
//               </div>
//             )}
//             <p style={profileInfoTextStyle}><strong>First Name:</strong> {profile.firstName}</p>
//             <p style={profileInfoTextStyle}><strong>Last Name:</strong> {profile.lastName}</p>
//             <p style={profileInfoTextStyle}><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
//             <p style={profileInfoTextStyle}><strong>Gender:</strong> {profile.gender}</p>
//             <p style={profileInfoTextStyle}><strong>Address:</strong> {profile.address}</p>
//             <p style={profileInfoTextStyle}><strong>Phone:</strong> {profile.phone}</p>
//             <p style={profileInfoTextStyle}><strong>Nationality:</strong> {profile.nationality}</p>
//             <p style={profileInfoTextStyle}><strong>Marital Status:</strong> {profile.maritalStatus}</p>
//             <p style={profileInfoTextStyle}><strong>Occupation:</strong> {profile.occupation}</p>
//             {/* <p style={profileImageFile}><strong>Occupation:</strong> {profile.profileImageBase64}</p> */}
//           </div>

//           <button
//             style={editProfileBtnStyle}
//             onClick={() => setEditing(true)}
//             onMouseOver={(e) => e.target.style.backgroundColor = editProfileBtnHoverStyle.backgroundColor}
//             onMouseOut={(e) => e.target.style.backgroundColor = '#1abc9c'}
//           >
//             Edit Profile
//           </button>
//         </div>
//       ) : creating ? (
//         <div style={editFormStyle}>
//           <h2>Create Profile</h2>
//           <form onSubmit={createProfile}>
//             <div style={formFieldStyle}>
//               <label htmlFor="firstName">First Name:</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="lastName">Last Name:</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="dateOfBirth">Date of Birth:</label>
//               <input
//                 type="date"
//                 id="dateOfBirth"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//   <label htmlFor="gender">Gender:</label>
//   <input
//     type="text"
//     id="gender"
//     name="gender"
//     value={formData.gender}
//     onChange={handleChange}
//     style={inputStyle}
//     //required // Make sure 'required' is included if it's a mandatory field
//     />
//     {/* <option value="Male">Male</option>
//     <option value="Female">Female</option>
//     <option value="Other">Other</option>
//   </select> */}
// </div>

//             <div style={formFieldStyle}>
//               <label htmlFor="address">Address:</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="phone">Phone:</label>
//               <input
//                 type="text"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="nationality">Nationality:</label>
//               <input
//                 type="text"
//                 id="nationality"
//                 name="nationality"
//                 value={formData.nationality}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="maritalStatus">Marital Status:</label>
//               <input
//                 type="text"
//                 id="maritalStatus"
//                 name="maritalStatus"
//                 value={formData.maritalStatus}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//                 {/* <option value="Single">Single</option>
//                 <option value="Married">Married</option>
//                 <option value="Divorced">Divorced</option>
//                 <option value="Widowed">Widowed</option> */}
//               {/* </input> */}
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="occupation">Occupation:</label>
//               <input
//                 type="text"
//                 id="occupation"
//                 name="occupation"
//                 value={formData.occupation}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//   <label htmlFor="profileImage">Profile Image:</label>
//   <input
//     type="file"
//     id="profileImage"
//     name="profileImage"
//     onChange={handleImageChange}
//     style={inputStyle}
//   />
// </div>

//             <div>
//               <button type="submit" style={buttonStyle}>Create Profile</button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div style={editFormStyle}>
//           <h2>Edit Profile</h2>
//           <form onSubmit={handleSubmit}>
//             <div style={formFieldStyle}>
//               <label htmlFor="firstName">First Name:</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="lastName">Last Name:</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="dateOfBirth">Date of Birth:</label>
//               <input
//                 type="date"
//                 id="dateOfBirth"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="gender">Gender:</label>
//               <input
//                 type="text"
//                 id="gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//                 {/* <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option> */}
//               {/* </input> */}
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="address">Address:</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="phone">Phone:</label>
//               <input
//                 type="text"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="nationality">Nationality:</label>
//               <input
//                 type="text"
//                 id="nationality"
//                 name="nationality"
//                 value={formData.nationality}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="maritalStatus">Marital Status:</label>
//               <input
//                 type="text"
//                 id="maritalStatus"
//                 name="maritalStatus"
//                 value={formData.maritalStatus}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//                 {/* <option value="Single">Single</option>
//                 <option value="Married">Married</option>
//                 <option value="Divorced">Divorced</option>
//                 <option value="Widowed">Widowed</option> */}
//               {/* </input> */}
//             </div>
//             <div style={formFieldStyle}>
//               <label htmlFor="occupation">Occupation:</label>
//               <input
//                 type="text"
//                 id="occupation"
//                 name="occupation"
//                 value={formData.occupation}
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>

// <div style={formFieldStyle}>
//   <label htmlFor="profileImage">Profile Image:</label>
//   <input
//     type="file"
//     id="profileImage"
//     name="profileImage"
//     onChange={handleImageChange}
//     style={inputStyle}
//   />
//   </div>

//             <div>
//               <button type="submit" style={buttonStyle}>Save Changes</button>
//               <button
//                 type="button"
//                 style={{ ...buttonStyle, ...cancelBtnStyle }}
//                 onClick={() => setEditing(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const profileContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  };

  const profileCardStyle = {
    width: '80%',
    maxWidth: '900px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '30px',
  };

  const profileHeaderStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#2c3e50',
  };

  const profileInfoStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '30px',
  };

  const profileImageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const profileImageStyle = {
    width: '170px',
    height: '170px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #1abc9c',
  };

  const infoTextStyle = {
    fontSize: '1.1rem',
    color: '#34495e',
    // color:'#003366',
    fontWeight: '500',
  };

  const infoLabelStyle = {
    fontWeight: 'bold',
    color: '#c93e14',
  };

  const editButtonStyle = {
    display: 'block',
    marginTop: '20px',
    padding: '12px 25px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const editButtonHoverStyle = {
    backgroundColor: '#16a085',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 20px',
    marginBottom: '20px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const labelStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#34495e',
  };

  const cancelButtonStyle = {
    backgroundColor: '#e74c3c',
    padding: '12px 25px',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const saveButtonStyle = {
    backgroundColor: '#1abc9c',
    padding: '12px 25px',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    phone: '',
    nationality: '',
    maritalStatus: '',
    occupation: '',
  });
  const [profileImageFile, setProfileImageFile] = useState(null);

  const getProfile = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('Authentication token is missing');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
      }
      if (response.status === 404) {
        setLoading(false);
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch user profile.');
      }

      const data = await response.json();
      setProfile(data);
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        dateOfBirth: data.dateOfBirth || '',
        gender: data.gender || '',
        address: data.address || '',
        phone: data.phone || '',
        nationality: data.nationality || '',
        maritalStatus: data.maritalStatus || '',
        occupation: data.occupation || '',
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setProfileImageFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('dateOfBirth', formData.dateOfBirth);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('nationality', formData.nationality);
    formDataToSend.append('maritalStatus', formData.maritalStatus);
    formDataToSend.append('occupation', formData.occupation);

    if (profileImageFile) {
      formDataToSend.append('profileImage', profileImageFile);
    }

    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch('http://localhost:8080/api/profile/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data);
        setEditing(false);
        getProfile();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={profileContainerStyle}>
      <div style={profileCardStyle}>
        <h2 style={profileHeaderStyle}>User Profile</h2>

        {profile && !editing ? (
          <div>
            <div style={profileInfoStyle}>
              <div style={profileImageContainerStyle}>
                {profile.profileImageBase64 && (
                  <img
                    src={`data:image/jpeg;base64,${profile.profileImageBase64}`}
                    alt="Profile"
                    style={profileImageStyle}
                  />
                )}
              </div>
              <div>
                <p style={infoTextStyle}><span style={infoLabelStyle}>First Name:</span> {profile.firstName}</p>
                <p style={infoTextStyle}><span style={infoLabelStyle}>Last Name:</span> {profile.lastName}</p>
                <p style={infoTextStyle}><span style={infoLabelStyle}>Gender:</span> {profile.gender}</p>
                <p style={infoTextStyle}><span style={infoLabelStyle}>Date of Birth:</span> {profile.dateOfBirth}</p>
                <p style={infoTextStyle}><span style={infoLabelStyle}>Phone:</span> {profile.phone}</p>
                <p style={infoTextStyle}><span style={infoLabelStyle}>Address:</span> {profile.address}</p>
                <p style={infoTextStyle}><span style={infoLabelStyle}>Nationality:</span> {profile.nationality}</p>
                <p style={infoTextStyle}><span style={infoLabelStyle}>occupation:</span> {profile.occupation}</p>
              </div>
            </div>

            <button
              onClick={() => setEditing(true)}
              style={editButtonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#003366'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#003366'}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label style={labelStyle}>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Gender:</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Nationality:</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Marital Status:</label>
              <input
                type="text"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Occupation:</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>


            <div>
              <label style={labelStyle}>Profile Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={inputStyle}
              />
            </div>

            <button type="submit" style={saveButtonStyle}>
              Save Changes
            </button>
            <button
              type="button"
              style={cancelButtonStyle}
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
