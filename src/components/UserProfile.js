

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
