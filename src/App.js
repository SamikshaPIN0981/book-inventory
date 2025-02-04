import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
//import Sidebar from './components/Sidebar';
// import DashboardLayout from './components/DashboardLayout';
import DahboardLayout from './components/DahboardLayout';
import AddBook from './components/AddBook';

function App() {
  return (
    <Router>
      <div className="App">
        
        <ToastContainer  position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/> {/* Ensure this is inside Router */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot" element={<ForgotPasswordForm />} />
           {/* Dashboard Route */}
           <Route path="/dashboard" element={<DahboardLayout />} />
           <Route path="/addbook" element={<AddBook />} /> {/* Add AddBook route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
