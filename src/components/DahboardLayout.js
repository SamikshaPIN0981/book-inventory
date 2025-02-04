// import React from 'react';
// import { Box, Typography, Button, Divider, Avatar } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import LogoutIcon from '@mui/icons-material/Logout';
// import SearchIcon from '@mui/icons-material/Search';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import { Link } from 'react-router-dom'; // Import Link

// const DahboardLayout = () => {
//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ECF0F1' }}>
//       {/* Sidebar */}
//       <Box sx={{ width: '250px', backgroundColor: '#2C3E50', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', color: '#ECF0F1' }}>
//         <Typography variant="h5" sx={{ textAlign: 'center', color: '#FF6347', fontWeight: 'bold' }}>
//           Book Inventory
//         </Typography>
//         <Divider sx={{ margin: '20px 0', backgroundColor: '#ECF0F1' }} />
//         <Box>
//           <Button startIcon={<HomeIcon />} sx={{ justifyContent: 'flex-start', width: '100%', marginBottom: '10px', color: '#ECF0F1', textTransform: 'none' }}>
//             Home
//           </Button>

//           {/* Modified Books Button with Link to Add New Book */}
//           <Link to="/addbook" style={{ textDecoration: 'none' }}>
//             <Button startIcon={<LibraryBooksIcon />} sx={{ justifyContent: 'flex-start', width: '100%', marginBottom: '10px', color: '#ECF0F1', textTransform: 'none' }}>
//              Books
//             </Button>
//           </Link>

//           <Button startIcon={<InventoryIcon />} sx={{ justifyContent: 'flex-start', width: '100%', marginBottom: '10px', color: '#ECF0F1', textTransform: 'none' }}>
//           Authors
//           </Button>
//           <Button startIcon={<SettingsIcon />} sx={{ justifyContent: 'flex-start', width: '100%', marginBottom: '10px', color: '#ECF0F1', textTransform: 'none' }}>
//            Genres
//           </Button>
//           <Button startIcon={<LogoutIcon />} sx={{ justifyContent: 'flex-start', width: '100%', marginTop: 'auto', color: '#ECF0F1', textTransform: 'none' }}>
//             Log out
//           </Button>
//         </Box>
//       </Box>

//       {/* Main Content */}
//       <Box sx={{ flex: 1, padding: '20px', color: '#2C3E50' }}>
//         {/* Header */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//           <Typography variant="h4" fontWeight="bold" color="#2C3E50">
//             Dashboard
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <SearchIcon sx={{ marginRight: '10px', color: '#FF6347' }} />
//             <Avatar sx={{ backgroundColor: '#FF6347', color: '#ECF0F1' }}>A</Avatar>
//           </Box>
//         </Box>

//         {/* Overview Cards */}
//         <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
//           {[
//             { title: 'Books in Stock', value: '1,200', color: '#FF6347', percentage: '+5%' },
//             { title: 'Total Books', value: '800', color: '#FF6347', percentage: '+10%' },
//             { title: 'Books Added', value: '500', color: '#FF6347', percentage: '+20%' },
//           ].map((card, index) => (
//             <Box
//               key={index}
//               sx={{
//                 backgroundColor: 'rgba(236, 240, 241, 0.8)',  // Transparent background with slight opacity
//                 padding: '20px',
//                 borderRadius: '8px',
//                 boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
//                 borderLeft: `5px solid ${card.color}`,
//               }}
//             >
//               <Typography variant="h6" fontWeight="bold" color="#2C3E50">
//                 {card.title}
//               </Typography>
//               <Typography variant="h4" fontWeight="bold" color="#2C3E50">
//                 {card.value}
//               </Typography>
//               <Typography variant="body2" color="#FF6347">
//                 {card.percentage} last month
//               </Typography>
//             </Box>
//           ))}
//         </Box>

//         {/* Books List */}
//         <Box sx={{ marginBottom: '20px', backgroundColor: 'rgba(236, 240, 241, 0.8)', padding: '20px', borderRadius: '8px', boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)' }}>
//   <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold', color: '#2C3E50' }}>
//     Books List
//   </Typography>
//   <Box
//     sx={{
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//       gap: '20px',
//     }}
//   >
//     {[
//       { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: '$10', stock: '300', category: 'Classic' },
//       { name: '1984', author: 'George Orwell', price: '$15', stock: '500', category: 'Dystopian' },
//       { name: 'To Kill a Mockingbird', author: 'Harper Lee', price: '$12', stock: '200', category: 'Fiction' },
//       { name: 'Moby Dick', author: 'Herman Melville', price: '$18', stock: '100', category: 'Adventure' },
//       { name: 'Pride and Prejudice', author: 'Jane Austen', price: '$8', stock: '400', category: 'Romance' },
//       { name: 'The Hobbit', author: 'J.R.R. Tolkien', price: '$14', stock: '350', category: 'Fantasy' },
//       { name: 'The Hobbit', author: 'J.R.R. Tolkien', price: '$14', stock: '350', category: 'Fantasy' },
//       { name: 'The Catcher in the Rye', author: 'J.D. Salinger', price: '$13', stock: '250', category: 'Classic' },
//     ].map((book, index) => (
//       <Box
//         key={index}
//         sx={{
//           background: 'rgba(75, 156, 211, 0.6)',  // Transparent background with blue-green color
//           padding: '20px',
//           borderRadius: '12px',
//           boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
//           backdropFilter: 'blur(10px)', // Added blur effect for better readability
//           transition: 'all 0.3s ease-in-out',
//           '&:hover': {
//             transform: 'translateY(-5px)',
//             boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
//           },
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold" color="#FFF">
//           {book.name}
//         </Typography>
//         <Typography color="#FFF">Author: {book.author}</Typography>
//         <Typography color="#FFF">Price: {book.price}</Typography>
//         <Typography color="#FFF">Stock: {book.stock}</Typography>
//         <Typography color="#FFF">Category: {book.category}</Typography>
//       </Box>
//     ))}
//   </Box>
// </Box>
//      {/* Footer */}
//       {/* Footer */}
//       {/* <Box sx={{ padding: '10px', backgroundColor: '#2C3E50', color: '#ECF0F1', textAlign: 'center' }}>
//         <Typography variant="body2" color="inherit">
//           &copy; 2025 Book Inventory | All Rights Reserved
//         </Typography>
//       </Box> */}

//       </Box>
//     </Box>
//   );
// };

// export default DahboardLayout;


// import React, { useState } from 'react';
// import { Box, Typography, Button, Divider, Avatar } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import LogoutIcon from '@mui/icons-material/Logout';
// import SearchIcon from '@mui/icons-material/Search';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import AddBook from './AddBook'; // Import the AddBook component
// import AddAuthor from './AddAuthor';
// import Logout from './Logout';
// import Book from './Book';




// const DashboardLayout = () => {
//   const [selectedMenu, setSelectedMenu] = useState('home'); // State to track selected menu

//   const handleMenuClick = (menu) => {
//     setSelectedMenu(menu); // Update selected menu when a button is clicked
//   };

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ECF0F1' }}>
//       {/* Sidebar */}
//       <Box sx={{ width: '250px', backgroundColor: '#2C3E50', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', color: '#ECF0F1' }}>
//         <Typography variant="h5" sx={{ textAlign: 'center', color: '#FF6347', fontWeight: 'bold' }}>
//           Book Inventory
//         </Typography>
//         <Divider sx={{ margin: '20px 0', backgroundColor: '#ECF0F1' }} />
//         <Box>
//           <Button
//             startIcon={<HomeIcon />}
//             sx={{ justifyContent: 'flex-start', width: '100%', marginBottom: '10px', color: '#ECF0F1', textTransform: 'none' }}
//             onClick={() => handleMenuClick('home')} // Switch to home content
//           >
//             Home
//           </Button>

//           <Button
//             startIcon={<LibraryBooksIcon />}
//             sx={{
//               justifyContent: 'flex-start',
//               width: '100%',
//               marginBottom: '10px',
//               color: '#ECF0F1',
//               textTransform: 'none',
//             }}
//             onClick={() => handleMenuClick('books')} // Switch to books content
//           >
//             Books
//           </Button>

//           <Button
//             startIcon={<InventoryIcon />}
//             sx={{ justifyContent: 'flex-start', width: '100%', marginBottom: '10px', color: '#ECF0F1', textTransform: 'none' }}
//             onClick={() => handleMenuClick('authors')} // Switch to authors content
//           >
//             Authors
//           </Button>
//           <Button
//             startIcon={<SettingsIcon />}
//             sx={{ justifyContent: 'flex-start', width: '100%', marginBottom: '10px', color: '#ECF0F1', textTransform: 'none' }}
//             onClick={() => handleMenuClick('genre')} // Switch to settings content
//           >
//             Genres
//           </Button>
//           <Button
//             startIcon={<LogoutIcon />}
//             sx={{ justifyContent: 'flex-start', width: '100%', marginTop: 'auto', color: '#ECF0F1', textTransform: 'none' }}
//             onClick={() => handleMenuClick('logout')} // Switch to logout content
//           >
//             Log out
//           </Button>
//         </Box>
//       </Box>

//       {/* Main Content */}
//       <Box sx={{ flex: 1, padding: '20px', color: '#2C3E50' }}>
//         {/* Header */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//           <Typography variant="h4" fontWeight="bold" color="#2C3E50">
//             Dashboard
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <SearchIcon sx={{ marginRight: '10px', color: '#FF6347' }} />
//             <Avatar sx={{ backgroundColor: '#FF6347', color: '#ECF0F1' }}>A</Avatar>
//           </Box>
//         </Box>

//         {/* Conditional Rendering Based on Selected Menu */}
//         {selectedMenu === 'home' && (
//           <Box>
//             {/* Overview Cards */}
//             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
//               {[
//                 { title: 'Total Books', value: '1,200', color: '#FF6347', icon: <LibraryBooksIcon /> },
//                 { title: 'Total Authors', value: '50', color: '#FF6347', icon: <Avatar sx={{ backgroundColor: '#FF6347' }}>A</Avatar> },
//                 { title: 'Total Genres', value: '10', color: '#FF6347', icon: <InventoryIcon /> },
//                 { title: 'Total Users', value: '500', color: '#FF6347', icon: <HomeIcon /> },
//               ].map((card, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     backgroundColor: 'rgba(236, 240, 241, 0.8)',  // Transparent background with slight opacity
//                     padding: '20px',
//                     borderRadius: '8px',
//                     boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
//                     borderLeft: `5px solid ${card.color}`,
//                   }}
//                 >
//                   <Typography variant="h6" fontWeight="bold" color="#2C3E50">
//                     {card.title}
//                   </Typography>
//                   <Typography variant="h4" fontWeight="bold" color="#2C3E50">
//                     {card.value}
//                   </Typography>
//                   <Typography variant="body2" color="#FF6347">
//                     {card.percentage} last month
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>

//             {/* Books List */}
//             <Box sx={{ marginBottom: '20px', backgroundColor: 'rgba(236, 240, 241, 0.8)', padding: '20px', borderRadius: '8px', boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)' }}>
//               <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold', color: '#2C3E50' }}>
//                 Books List
//               </Typography>
//               <Box
//                 sx={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//                   gap: '20px',
//                 }}
//               >
//                 {[
//                   { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: '$10', stock: '300', category: 'Classic' },
//                   { name: '1984', author: 'George Orwell', price: '$15', stock: '500', category: 'Dystopian' },
//                   { name: 'To Kill a Mockingbird', author: 'Harper Lee', price: '$12', stock: '200', category: 'Fiction' },
//                   { name: 'Moby Dick', author: 'Herman Melville', price: '$18', stock: '100', category: 'Adventure' },
//                   { name: 'Pride and Prejudice', author: 'Jane Austen', price: '$8', stock: '400', category: 'Romance' },
//                   { name: 'The Hobbit', author: 'J.R.R. Tolkien', price: '$14', stock: '350', category: 'Fantasy' },
//                   { name: 'The Catcher in the Rye', author: 'J.D. Salinger', price: '$13', stock: '250', category: 'Classic' },
//                 ].map((book, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       background: 'rgba(75, 156, 211, 0.6)',  // Transparent background with blue-green color
//                       padding: '20px',
//                       borderRadius: '12px',
//                       boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
//                       backdropFilter: 'blur(10px)', // Added blur effect for better readability
//                       transition: 'all 0.3s ease-in-out',
//                       '&:hover': {
//                         transform: 'translateY(-5px)',
//                         boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
//                       },
//                     }}
//                   >
//                     <Typography variant="h6" fontWeight="bold" color="#FFF">
//                       {book.name}
//                     </Typography>
//                     <Typography color="#FFF">Author: {book.author}</Typography>
//                     <Typography color="#FFF">Price: {book.price}</Typography>
//                     <Typography color="#FFF">Stock: {book.stock}</Typography>
//                     <Typography color="#FFF">Category: {book.category}</Typography>
//                   </Box>
//                 ))}
//               </Box>
//             </Box>
//           </Box>
//         )}

//         {selectedMenu === 'books' && (
//           <Box>
//             {/* AddBook Form displayed when Books menu is selected */}
//             {/* <AddBook /> */}
//             {/* Books Section */}
//             <Book />
//           </Box>
//         )}

//         {selectedMenu === 'authors' && (
//           <Box>
//             <Typography variant="h6" fontWeight="bold" color="#2C3E50">
//               {/* Authors Section */}
//             </Typography>
//             {/* Author Content */}
//             <AddAuthor />
//           </Box>
//         )}

//         {selectedMenu === 'genre' && (
//           <Box>
//             <Typography variant="h6" fontWeight="bold" color="#2C3E50">
//               {/* Genres Section */}
//             </Typography>
//             {/* <Book/>  */}
//             <AddBook />
//             {/* Settings Content */}
//           </Box>
//         )}

//         {selectedMenu === 'logout' && (
//           <Box>
//             <Typography variant="h6" fontWeight="bold" color="#2C3E50">
//               Logging Out...
//               <Logout />
//             </Typography>
//             {/* Logout Content */}
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default DashboardLayout;

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import { FaBook, FaUserAlt, FaRegLightbulb } from 'react-icons/fa';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleIcon from '@mui/icons-material/People';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import AddBook from './AddBook';
import AddAuthor from './AddAuthor';
import Logout from './Logout';
import Book from './Book';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [dashboardData, setDashboardData] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    totalCategories: 0,
  });
  const [clickedCard, setClickedCard] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/dashboard')
      .then((response) => response.json())
      .then((data) => setDashboardData(data))
      .catch((error) => console.error('Error fetching dashboard data:', error));
  }, []);

  const handleMenuClick = (menu) => setSelectedMenu(menu);

  const handleCardClick = (index) => setClickedCard(index);

  // Bar chart data and options
  const chartData = {
    labels: ['Books', 'Authors', 'Genres'],
    datasets: [
      {
        label: 'Dashboard Metrics',
        data: [
          dashboardData.totalBooks,
          dashboardData.totalAuthors,
          dashboardData.totalCategories,
        ],
        backgroundColor: '#FF6347',
        borderColor: '#FFF',
        borderWidth: 2,
        barThickness: 40,
        hoverBackgroundColor: '#FF4500',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#2C3E50',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#2C3E50',
        titleColor: '#FFF',
        bodyColor: '#FFF',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#2C3E50',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#2C3E50',
        },
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4F6F8' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: '250px',
          backgroundColor: '#1F3A5B',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          color: '#ECF0F1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ textAlign: 'center', color: '#FF6347', fontWeight: 'bold' }}>
          Book Inventory
        </Typography>
        <Divider sx={{ margin: '20px 0', backgroundColor: '#ECF0F1' }} />
        <Box sx={{ width: '100%' }}>
          <Button
            startIcon={<HomeIcon />}
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              marginBottom: '10px',
              color: '#ECF0F1',
              textTransform: 'none',
            }}
            onClick={() => handleMenuClick('home')}
          >
            Home
          </Button>
          <Button
            startIcon={<LibraryBooksIcon />}
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              marginBottom: '10px',
              color: '#ECF0F1',
              textTransform: 'none',
            }}
            onClick={() => handleMenuClick('books')}
          >
            Books
          </Button>
          <Button
            startIcon={<PeopleIcon />}
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              marginBottom: '10px',
              color: '#ECF0F1',
              textTransform: 'none',
            }}
            onClick={() => handleMenuClick('authors')}
          >
            Authors
          </Button>
          <Button
            startIcon={<AddBoxIcon />}
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              marginBottom: '10px',
              color: '#ECF0F1',
              textTransform: 'none',
            }}
            onClick={() => handleMenuClick('genres')}
          >
            Genres
          </Button>
          <Button
            startIcon={<LogoutIcon />}
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              marginTop: 'auto',
              color: '#ECF0F1',
              textTransform: 'none',
            }}
            onClick={() => handleMenuClick('logout')}
          >
            Log out
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: '20px', color: '#2C3E50' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
          <Typography variant="h4" fontWeight="bold" color="#003366">
            Welcome to Tech Titan's Book Inventory
          </Typography>
        </Box>

        {selectedMenu === 'home' && (
          <Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                marginBottom: '20px',
              }}
            >
              {[
                { title: 'Total Books', value: dashboardData.totalBooks, color: '#FF6347', icon: <FaBook size={24} color="#FFF" /> },
                { title: 'Total Authors', value: dashboardData.totalAuthors, color: '#4CAF50', icon: <FaUserAlt size={24} color="#FFF" /> },
                { title: 'Total Genres', value: dashboardData.totalCategories, color: '#2196F3', icon: <FaRegLightbulb size={24} color="#FFF" /> },
              ].map((card, index) => (
                <Box
                  key={index}
                  sx={{
                    background: `linear-gradient(135deg, ${card.color} 0%, rgba(0, 0, 0, 0.1) 100%)`,
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                    borderLeft: `5px solid ${card.color}`,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <IconButton sx={{ color: '#FFF', marginRight: '10px' }}>{card.icon}</IconButton>
                    <Typography variant="h6" fontWeight="bold" color="#FFF">
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" color="#FFF">
                    {card.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Bar Chart */}
            <Box sx={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)' }}>
              <Typography variant="h6" fontWeight="bold" marginBottom="20px" color="#003366">
                Dashboard Metrics
              </Typography>
              <Box sx={{ height: '300px' }}>
                <Bar data={chartData} options={chartOptions} />
              </Box>
            </Box>
          </Box>
        )}

        {selectedMenu === 'books' && <Book />}
        {selectedMenu === 'authors' && <AddAuthor />}
        {selectedMenu === 'genres' && <AddBook />}
        {selectedMenu === 'logout' && <Logout />}

        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#2C3E50',
            color: '#ECF0F1',
            padding: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">
            ❤️ 2025 Tech Titan's Inventory. All Rights Reserved.{' '}
            <Typography component="span" sx={{ color: '#FF6347', fontWeight: 'bold' }}>
              Powered by Tech Titan
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;


