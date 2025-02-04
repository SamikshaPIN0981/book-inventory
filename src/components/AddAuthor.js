// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";

// const AuthorSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [authors, setAuthors] = useState([]);
//   const [newAuthor, setNewAuthor] = useState({
//     authorId: "",
//     authorName: "",
//     biography: "",
//   });
//   const [editingAuthor, setEditingAuthor] = useState(null); // State to handle editing an author
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // To handle delete confirmation dialog
//   const [authorToDelete, setAuthorToDelete] = useState(null); // The author to be deleted

//   // Fetch authors from the backend
//   const fetchAuthors = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/authors");
//       const data = await response.json();
//       setAuthors(data);
//     } catch (error) {
//       console.error("Error fetching authors:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAuthors(); // Fetch authors when the component mounts
//   }, []);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleToggleForm = () => {
//     setShowAddForm(!showAddForm);
//     setNewAuthor({ authorId: "", authorName: "", biography: "" });
//     setEditingAuthor(null); // Clear editing state when toggling forms
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewAuthor({ ...newAuthor, [name]: value });
//   };

//   const handleSaveAuthor = async () => {
//     if (!newAuthor.authorName || !newAuthor.authorName.trim()) {
//       alert("Please provide an author name!");
//       return;
//     }

//     try {
//       let response;
//       if (editingAuthor) {
//         // Edit author
//         response = await fetch(
//           `http://localhost:8080/api/authors/${editingAuthor.authorId}`,
//           {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newAuthor),
//           }
//         );
//       } else {
//         // Add new author
//         response = await fetch("http://localhost:8080/api/authors", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newAuthor),
//         });
//       }

//       if (response.ok) {
//         fetchAuthors(); // Refresh the authors list after adding or editing
//         setShowAddForm(false); // Close the form
//         setNewAuthor({ authorId: "", authorName: "", biography: "" });
//         setEditingAuthor(null); // Reset editing state
//       } else {
//         console.error("Failed to save author");
//       }
//     } catch (error) {
//       console.error("Error saving author:", error);
//     }
//   };

//   // Delete author
//   const handleDeleteAuthor = async () => {
//     if (authorToDelete) {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/authors/${authorToDelete.authorId}`,
//           {
//             method: "DELETE",
//           }
//         );
//         if (response.ok) {
//           fetchAuthors(); // Refresh authors list after deletion
//           setOpenDeleteDialog(false); // Close the dialog
//         } else {
//           console.error("Failed to delete author");
//         }
//       } catch (error) {
//         console.error("Error deleting author:", error);
//       }
//     }
//   };

//   // Open the delete confirmation dialog
//   const openDeleteDialogBox = (author) => {
//     setAuthorToDelete(author);
//     setOpenDeleteDialog(true);
//   };

//   // Filter authors based on search query
//   const filteredAuthors = authors.filter((author) =>
//     author.authorName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleEditAuthor = (author) => {
//     setEditingAuthor(author);
//     setNewAuthor({
//       authorId: author.authorId,
//       authorName: author.authorName,
//       biography: author.biography,
//     });
//     setShowAddForm(true); // Show the form in edit mode
//   };

//   return (
//     <Box sx={{ padding: "20px" }}>
//       {/* Search Bar */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: "20px",
//           gap: "10px",
//         }}
//       >
//         <TextField
//           label="Search Authors"
//           variant="outlined"
//           fullWidth
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//         <Button
//           variant="contained"
//           onClick={fetchAuthors} // Trigger search when clicking the button
//           sx={{
//             backgroundColor: "#FF6347",
//             "&:hover": { backgroundColor: "#FF4500" },
//           }}
//         >
//           Search
//         </Button>
//       </Box>

//       {/* Add New Author Button */}
//       <Box sx={{ marginBottom: "20px" }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleToggleForm}
//           sx={{
//             backgroundColor: "#FF6347",
//             "&:hover": { backgroundColor: "#FF4500" },
//           }}
//         >
//           {showAddForm ? "Back to Authors" : "Add New Author"}
//         </Button>
//       </Box>

//       {showAddForm ? (
//         // Add Author Form
//         <Box
//           sx={{
//             backgroundColor: "rgba(236, 240, 241, 0.8)",
//             padding: "20px",
//             borderRadius: "8px",
//             boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "20px" }}>
//             {editingAuthor ? "Edit Author" : "Add New Author"}
//           </Typography>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//             <TextField
//               label="Author Name"
//               name="authorName"
//               value={newAuthor.authorName}
//               onChange={handleInputChange}
//               fullWidth
//             />
//             <TextField
//               label="Biography"
//               name="biography"
//               value={newAuthor.biography}
//               onChange={handleInputChange}
//               fullWidth
//             />
//             <Button
//               variant="contained"
//               onClick={handleSaveAuthor}
//               sx={{
//                 backgroundColor: "#FF6347",
//                 "&:hover": { backgroundColor: "#FF4500" },
//               }}
//             >
//               {editingAuthor ? "Update Author" : "Save Author"}
//             </Button>
//           </Box>
//         </Box>
//       ) : (
//         // Authors Table
//         <TableContainer
//           component={Paper}
//           sx={{
//             backgroundColor: "rgba(236, 240, 241, 0.8)",
//             boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Author ID</TableCell>
//                 <TableCell>Author Name</TableCell>
//                 <TableCell>Biography</TableCell>
//                 <TableCell>Created At</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredAuthors.map((author) => (
//                 <TableRow key={author.authorId}>
//                   <TableCell>{author.authorId}</TableCell>
//                   <TableCell>{author.authorName}</TableCell>
//                   <TableCell>{author.biography}</TableCell>
//                   <TableCell>{author.createdAt}</TableCell>
//                   <TableCell sx={{ display: "flex", gap: "10px" }}>
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       sx={{
//                         color: "#FF6347",
//                         borderColor: "#FF6347",
//                       }}
//                       onClick={() => handleEditAuthor(author)} // Open edit form
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       sx={{
//                         color: "#FF6347",
//                         borderColor: "#FF6347",
//                       }}
//                       onClick={() => openDeleteDialogBox(author)} // Open delete confirmation dialog
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={openDeleteDialog}
//         onClose={() => setOpenDeleteDialog(false)}
//         aria-labelledby="delete-dialog-title"
//         aria-describedby="delete-dialog-description"
//       >
//         <DialogTitle id="delete-dialog-title">
//           {"Are you sure you want to delete this author?"}
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteAuthor} color="secondary">
//             Confirm Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AuthorSection;

// import React, { useState, useEffect } from "react";
// import { jwtDecode } from 'jwt-decode';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TablePagination,
// } from "@mui/material";

// const AuthorSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [authors, setAuthors] = useState([]);
//   const [newAuthor, setNewAuthor] = useState({
//     authorId: "",
//     authorName: "",
//     biography: "",
//   });
//   const [editingAuthor, setEditingAuthor] = useState(null);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [authorToDelete, setAuthorToDelete] = useState(null);

//   // Pagination states
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const token = localStorage.getItem("authToken");
//   let userId;
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       userId = decodedToken.sub;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }
//   }

//   const fetchAuthors = async () => {
//     try {
//       if (!userId) {
//         console.error("User ID not found.");
//         return;
//       }
//       const response = await fetch(`http://localhost:8080/api/authors/user/${userId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const responseBody = await response.text();
//       if (response.ok && responseBody) {
//         const data = JSON.parse(responseBody);
//         setAuthors(data);
//       } else {
//         console.error("Error fetching authors or empty response.");
//       }
//     } catch (error) {
//       console.error("Error fetching authors:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAuthors();
//   }, [userId]);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleToggleForm = () => {
//     setShowAddForm(!showAddForm);
//     setNewAuthor({ authorId: "", authorName: "", biography: "" });
//     setEditingAuthor(null);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewAuthor({ ...newAuthor, [name]: value });
//   };

//   const handleSaveAuthor = async () => {
//     if (!newAuthor.authorName || !newAuthor.authorName.trim()) {
//       alert("Please provide an author name!");
//       return;
//     }
//     try {
//       let response;
//       if (editingAuthor) {
//         response = await fetch(
//           `http://localhost:8080/api/authors/${editingAuthor.authorId}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(newAuthor),
//           }
//         );
//       } else {
//         response = await fetch("http://localhost:8080/api/authors", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(newAuthor),
//         });
//       }

//       if (response.ok) {
//         fetchAuthors();
//         setShowAddForm(false);
//         setNewAuthor({ authorId: "", authorName: "", biography: "" });
//         setEditingAuthor(null);
//       } else {
//         console.error("Failed to save author");
//       }
//     } catch (error) {
//       console.error("Error saving author:", error);
//     }
//   };

//   const handleDeleteAuthor = async () => {
//     if (authorToDelete) {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/authors/${authorToDelete.authorId}`,
//           {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.ok) {
//           fetchAuthors();
//           setOpenDeleteDialog(false);
//         } else {
//           console.error("Failed to delete author");
//         }
//       } catch (error) {
//         console.error("Error deleting author:", error);
//       }
//     }
//   };

//   const openDeleteDialogBox = (author) => {
//     setAuthorToDelete(author);
//     setOpenDeleteDialog(true);
//   };

//   const filteredAuthors = authors.filter((author) =>
//     author.authorName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleEditAuthor = (author) => {
//     setEditingAuthor(author);
//     setNewAuthor({
//       authorId: author.authorId,
//       authorName: author.authorName,
//       biography: author.biography,
//     });
//     setShowAddForm(true);
//   };

//   // Handle Page Change for Pagination
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle Rows per Page Change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to the first page
//   };

//   // Get paginated authors
//   const paginatedAuthors = filteredAuthors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Box sx={{ padding: "20px" }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: "20px",
//           gap: "10px",
//         }}
//       >
//         <TextField
//           label="Search Authors"
//           variant="outlined"
//           fullWidth
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//         <Button
//           variant="contained"
//           onClick={fetchAuthors}
//           sx={{
//             backgroundColor: "#003366",
//             "&:hover": { backgroundColor: "#FF4500" },
//           }}
//         >
//           Search
//         </Button>
//       </Box>

//       <Box sx={{ marginBottom: "20px" }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleToggleForm}
//           sx={{
//             backgroundColor: "#003366",
//             "&:hover": { backgroundColor: "#FF4500" },
//           }}
//         >
//           {showAddForm ? "Back to Authors" : "Add New Author"}
//         </Button>
//       </Box>

//       {showAddForm ? (
//         <Box
//           sx={{
//             backgroundColor: "rgba(236, 240, 241, 0.8)",
//             padding: "20px",
//             borderRadius: "8px",
//             boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "20px" }}>
//             {editingAuthor ? "Edit Author" : "Add New Author"}
//           </Typography>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//             <TextField
//               label="Author Name"
//               name="authorName"
//               value={newAuthor.authorName}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{
//                 backgroundColor: "#FFFFFF",
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     // borderColor: "#FF6347",
//                   },
//                   "&:hover fieldset": {
//                     // borderColor: "#FF4500",
//                   },
//                   "&.Mui-focused fieldset": {
//                     // borderColor: "#FF6347",
//                   },
//                 },
//               }}
//             />
//             <TextField
//               label="Biography"
//               name="biography"
//               value={newAuthor.biography}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{
//                 backgroundColor: "#FFFFFF",
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     // borderColor: "#FF6347",
//                   },
//                   "&:hover fieldset": {
//                     // borderColor: "#FF4500",
//                   },
//                   "&.Mui-focused fieldset": {
//                     // borderColor: "#FF6347",
//                   },
//                 },
//               }}
//             />
//             <Button
//               variant="contained"
//               onClick={handleSaveAuthor}
//               sx={{
//                 backgroundColor: "#003366",
//                 "&:hover": { backgroundColor: "#FF4500" },
//               }}
//             >
//               {editingAuthor ? "Update Author" : "Save Author"}
//             </Button>
//           </Box>
//         </Box>
//       ) : (
//         <TableContainer
//           component={Paper}
//           sx={{
//             backgroundColor: "rgba(236, 240, 241, 0.8)",
//             boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
//             maxWidth: "100%", // Ensures the table container takes up available width
//             margin: "auto",   // Centers the container
//             padding: "16px",  // Optional: Adds some padding for spacing
//           }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow sx={{ background: 'linear-gradient(to right, #FF7E5F, #feb47b)' }}> {/* Gradient Background */}
//                 <TableCell
//                   align="center"
//                   sx={{
//                     color: "#140202",  // Dark text for contrast
//                     fontWeight: "bold",
//                     fontSize: "16px",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     padding: "12px",
//                     borderBottom: "2px solid #ffffff",  // White Border
//                   }}
//                 >
//                   Author ID
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     color: "#140202",
//                     fontWeight: "bold",
//                     fontSize: "16px",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     padding: "12px",
//                     borderBottom: "2px solid #ffffff",
//                   }}
//                 >
//                   Author Name
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     color: "#140202",
//                     fontWeight: "bold",
//                     fontSize: "16px",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     padding: "12px",
//                     borderBottom: "2px solid #ffffff",
//                   }}
//                 >
//                   Biography
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     color: "#140202",
//                     fontWeight: "bold",
//                     fontSize: "16px",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     padding: "12px",
//                     borderBottom: "2px solid #ffffff",
//                   }}
//                 >
//                   Created At
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     color: "#140202",
//                     fontWeight: "bold",
//                     fontSize: "16px",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     padding: "12px",
//                     borderBottom: "2px solid #ffffff",
//                   }}
//                 >
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {paginatedAuthors.map((author) => (
//                 <TableRow key={author.authorId}>
//                   <TableCell>{author.authorId}</TableCell>
//                   <TableCell>{author.authorName}</TableCell>
//                   <TableCell>{author.biography}</TableCell>
//                   <TableCell>{new Date(author.createdAt).toLocaleDateString()}</TableCell>
//                   <TableCell>
//                     <Box sx={{ display: "flex", gap: "8px" }}>
//                       <Button
//                         variant="outlined"
//                         color="primary"
//                         onClick={() => handleEditAuthor(author)}
//                         sx={{
//                           backgroundColor: "#003366",
//                           color: "#fff",
//                           "&:hover": { backgroundColor: "#3578D9" },
//                         }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         color="secondary"
//                         onClick={() => openDeleteDialogBox(author)}
//                         sx={{
//                           backgroundColor: "#d90b0b",
//                           color: "#fff",
//                           "&:hover": { backgroundColor: "#D10000" },
//                         }}
//                       >
//                         Delete
//                       </Button>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Pagination */}
//           <TablePagination
//             component="div"
//             count={filteredAuthors.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       )}

//       <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             Are you sure you want to delete this author?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteAuthor} color="secondary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AuthorSection;

import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  Input
} from "@mui/material";

const AuthorSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({
    authorId: "",
    authorName: "",
    biography: "",
  });
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);
  const [file, setFile] = useState(null);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const token = localStorage.getItem("authToken");
  let userId;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.sub;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const fetchAuthors = async () => {
    try {
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
      const response = await fetch(`http://localhost:8080/api/authors/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseBody = await response.text();
      if (response.ok && responseBody) {
        const data = JSON.parse(responseBody);
        setAuthors(data);
      } else {
        console.error("Error fetching authors or empty response.");
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, [userId]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleToggleForm = () => {
    setShowAddForm(!showAddForm);
    setNewAuthor({ authorId: "", authorName: "", biography: "" });
    setEditingAuthor(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAuthor({ ...newAuthor, [name]: value });
  };

  const handleSaveAuthor = async () => {
    if (!newAuthor.authorName || !newAuthor.authorName.trim()) {
      alert("Please provide an author name!");
      return;
    }
    try {
      let response;
      if (editingAuthor) {
        response = await fetch(
          `http://localhost:8080/api/authors/${editingAuthor.authorId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newAuthor),
          }
        );
      } else {
        response = await fetch("http://localhost:8080/api/authors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newAuthor),
        });
      }

      if (response.ok) {
        fetchAuthors();
        setShowAddForm(false);
        setNewAuthor({ authorId: "", authorName: "", biography: "" });
        setEditingAuthor(null);
      } else {
        console.error("Failed to save author");
      }
    } catch (error) {
      console.error("Error saving author:", error);
    }
  };

  const handleDeleteAuthor = async () => {
    if (authorToDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/authors/${authorToDelete.authorId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          fetchAuthors();
          setOpenDeleteDialog(false);
        } else {
          console.error("Failed to delete author");
        }
      } catch (error) {
        console.error("Error deleting author:", error);
      }
    }
  };

  const openDeleteDialogBox = (author) => {
    setAuthorToDelete(author);
    setOpenDeleteDialog(true);
  };

  const filteredAuthors = authors.filter((author) =>
    author.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditAuthor = (author) => {
    setEditingAuthor(author);
    setNewAuthor({
      authorId: author.authorId,
      authorName: author.authorName,
      biography: author.biography,
    });
    setShowAddForm(true);
  };

  // Handle Page Change for Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Rows per Page Change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Get paginated authors
  const paginatedAuthors = filteredAuthors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Handle CSV file upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleBulkUpload = async () => {
    if (!file) {
      alert("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/authors/bulk-upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        fetchAuthors();
        alert("Bulk upload successful!");
      } else {
        console.error("Failed to upload CSV.");
      }
    } catch (error) {
      console.error("Error uploading CSV:", error);
    }
  };

  // CSV Export function
  const exportToCSV = () => {
    const csvRows = [];
    const headers = ["Author ID", "Author Name", "Biography", "Created At"];
    csvRows.push(headers.join(","));

    paginatedAuthors.forEach((author) => {
      const row = [
        author.authorId,
        author.authorName,
        author.biography,
        new Date(author.createdAt).toLocaleDateString(),
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "authors.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <TextField
          label="Search Authors"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          onClick={fetchAuthors}
          sx={{
            backgroundColor: "#003366",
            "&:hover": { backgroundColor: "#FF4500" },
          }}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleToggleForm}
          sx={{
            backgroundColor: "#003366",
            "&:hover": { backgroundColor: "#FF4500" },
          }}
        >
          {showAddForm ? "Back to Authors" : "Add New Author"}
        </Button>
      </Box>

      {/* CSV Upload Button */}
      <Box sx={{ marginBottom: "20px" }}>
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          sx={{ marginRight: "10px" }}
        />
        <Button
          variant="contained"
          onClick={handleBulkUpload}
          sx={{
            backgroundColor: "#003366",
            "&:hover": { backgroundColor: "#FF4500" },
          }}
        >
          Bulk Upload Authors (CSV)
        </Button>
      </Box>

      {/* CSV Export Button */}
      <Box sx={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          onClick={exportToCSV}
          sx={{
            backgroundColor: "#003366",
            "&:hover": { backgroundColor: "#FF4500" },
          }}
        >
          Export to CSV
        </Button>
      </Box>

      {/* Render Add Author Form or Table */}
      {showAddForm ? (
        <Box
          sx={{
            backgroundColor: "rgba(236, 240, 241, 0.8)",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "20px" }}>
            {editingAuthor ? "Edit Author" : "Add New Author"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <TextField
              label="Author Name"
              name="authorName"
              value={newAuthor.authorName}
              onChange={handleInputChange}
              fullWidth
              sx={{
                backgroundColor: "#FFFFFF",
              }}
            />
            <TextField
              label="Biography"
              name="biography"
              value={newAuthor.biography}
              onChange={handleInputChange}
              fullWidth
              sx={{
                backgroundColor: "#FFFFFF",
              }}
            />
            <Button
              variant="contained"
              onClick={handleSaveAuthor}
              sx={{
                backgroundColor: "#003366",
                "&:hover": { backgroundColor: "#FF4500" },
              }}
            >
              {editingAuthor ? "Update Author" : "Save Author"}
            </Button>
          </Box>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "rgba(236, 240, 241, 0.8)",
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
            maxWidth: "100%", 
            margin: "auto",  
            padding: "16px",  
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(to right, #FF7E5F, #feb47b)' }}> 
                <TableCell align="center" sx={{ color: "#140202", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>Author ID</TableCell>
                <TableCell align="center" sx={{ color: "#140202", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>Author Name</TableCell>
                <TableCell align="center" sx={{ color: "#140202", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>Biography</TableCell>
                <TableCell align="center" sx={{ color: "#140202", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>Created At</TableCell>
                <TableCell align="center" sx={{ color: "#140202", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAuthors.map((author) => (
                <TableRow key={author.authorId}>
                  <TableCell align="center">{author.authorId}</TableCell>
                  <TableCell align="center">{author.authorName}</TableCell>
                  <TableCell align="center">{author.biography}</TableCell>
                  <TableCell align="center">
                    {new Date(author.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleEditAuthor(author)}
                      sx={{
                        backgroundColor: "#003366",
                        "&:hover": { backgroundColor: "#feb47b" },
                        color: "white",
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => openDeleteDialogBox(author)}
                      sx={{
                        backgroundColor: "#FF5A5F",
                        "&:hover": { backgroundColor: "#FF3C3F" },
                        color: "white",
                        marginLeft: "10px",
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredAuthors.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this author?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAuthor}
            color="secondary"
            sx={{
              backgroundColor: "#FF5A5F",
              "&:hover": { backgroundColor: "#FF3C3F" },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuthorSection;

