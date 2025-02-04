
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

// const GenreSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [genres, setGenres] = useState([]);
//   const [newGenre, setNewGenre] = useState({
//     genreId: "",
//     genreName: "",
//     description: "",
//   });
//   const [editingGenre, setEditingGenre] = useState(null); // State to handle editing a genre
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // To handle delete confirmation dialog
//   const [genreToDelete, setGenreToDelete] = useState(null); // The genre to be deleted

//   // Fetch genres from the backend
//   const fetchGenres = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/genres");
//       const data = await response.json();
//       setGenres(data);
//     } catch (error) {
//       console.error("Error fetching genres:", error);
//     }
//   };

//   useEffect(() => {
//     fetchGenres(); // Fetch genres when the component mounts
//   }, []);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleToggleForm = () => {
//     setShowAddForm(!showAddForm);
//     setNewGenre({ genreId: "", genreName: "", description: "" });
//     setEditingGenre(null); // Clear editing state when toggling forms
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewGenre({ ...newGenre, [name]: value });
//   };

//   const handleSaveCategory = async () => {
//     if (!newGenre.genreName || !newGenre.genreName.trim()) {
//       alert("Please provide a genre name!");
//       return;
//     }

//     try {
//       let response;
//       if (editingGenre) {
//         // Edit genre
//         response = await fetch(
//           `http://localhost:8080/api/genres/${editingGenre.genreId}`,
//           {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newGenre),
//           }
//         );
//       } else {
//         // Add new genre
//         response = await fetch("http://localhost:8080/api/genres", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newGenre),
//         });
//       }

//       if (response.ok) {
//         fetchGenres(); // Refresh the genres list after adding or editing
//         setShowAddForm(false); // Close the form
//         setNewGenre({ genreId: "", genreName: "", description: "" });
//         setEditingGenre(null); // Reset editing state
//       } else {
//         console.error("Failed to save genre");
//       }
//     } catch (error) {
//       console.error("Error saving genre:", error);
//     }
//   };

//   // Delete genre
//   const handleDeleteCategory = async () => {
//     if (genreToDelete) {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/genres/${genreToDelete.genreId}`,
//           {
//             method: "DELETE",
//           }
//         );
//         if (response.ok) {
//           fetchGenres(); // Refresh genres list after deletion
//           setOpenDeleteDialog(false); // Close the dialog
//         } else {
//           console.error("Failed to delete genre");
//         }
//       } catch (error) {
//         console.error("Error deleting genre:", error);
//       }
//     }
//   };

//   // Open the delete confirmation dialog
//   const openDeleteDialogBox = (genre) => {
//     setGenreToDelete(genre);
//     setOpenDeleteDialog(true);
//   };

//   // Filter genres based on search query
//   const filteredGenres = genres.filter((genre) =>
//     genre.genreName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleEditCategory = (genre) => {
//     setEditingGenre(genre);
//     setNewGenre({
//       genreId: genre.genreId,
//       genreName: genre.genreName,
//       description: genre.description,
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
//           label="Search Genres"
//           variant="outlined"
//           fullWidth
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//         <Button
//           variant="contained"
//           onClick={fetchGenres} // Trigger search when clicking the button
//           sx={{
//             backgroundColor: "#FF6347",
//             "&:hover": { backgroundColor: "#FF4500" },
//           }}
//         >
//           Search
//         </Button>
//       </Box>

//       {/* Add New Category Button */}
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
//           {showAddForm ? "Back to Categories" : "Add New Category"}
//         </Button>
//       </Box>

//       {showAddForm ? (
//         // Add Category Form
//         <Box
//           sx={{
//             backgroundColor: "rgba(236, 240, 241, 0.8)",
//             padding: "20px",
//             borderRadius: "8px",
//             boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "20px" }}>
//             {editingGenre ? "Edit Category" : "Add New Category"}
//           </Typography>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//             <TextField
//               label="Genre Name"
//               name="genreName"
//               value={newGenre.genreName}
//               onChange={handleInputChange}
//               fullWidth
//             />
//             <TextField
//               label="Description"
//               name="description"
//               value={newGenre.description}
//               onChange={handleInputChange}
//               fullWidth
//             />
//             <Button
//               variant="contained"
//               onClick={handleSaveCategory}
//               sx={{
//                 backgroundColor: "#FF6347",
//                 "&:hover": { backgroundColor: "#FF4500" },
//               }}
//             >
//               {editingGenre ? "Update Category" : "Save Category"}
//             </Button>
//           </Box>
//         </Box>
//       ) : (
//         // Genres Table
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
//                 <TableCell>Genre ID</TableCell>
//                 <TableCell>Genre Name</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Created At</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredGenres.map((genre) => (
//                 <TableRow key={genre.genreId}>
//                   <TableCell>{genre.genreId}</TableCell>
//                   <TableCell>{genre.genreName}</TableCell>
//                   <TableCell>{genre.description}</TableCell>
//                   <TableCell>{genre.createdAt}</TableCell>
//                   <TableCell sx={{ display: "flex", gap: "10px" }}>
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       sx={{
//                         color: "#FF6347",
//                         borderColor: "#FF6347",
//                       }}
//                       onClick={() => handleEditCategory(genre)} // Open edit form
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
//                       onClick={() => openDeleteDialogBox(genre)} // Open delete confirmation dialog
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
//           {"Are you sure you want to delete this genre?"}
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteCategory} color="secondary">
//             Confirm Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default GenreSection;

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

const GenreSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState({
    genreId: "",
    genreName: "",
  });
  const [editingGenre, setEditingGenre] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState(null);
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

  const fetchGenres = async () => {
    try {
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
      const response = await fetch(`http://localhost:8080/api/genres/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseBody = await response.text();
      if (response.ok && responseBody) {
        const data = JSON.parse(responseBody);
        setGenres(data);
      } else {
        console.error("Error fetching genres or empty response.");
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, [userId]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleToggleForm = () => {
    setShowAddForm(!showAddForm);
    setNewGenre({ genreId: "", genreName: "" });
    setEditingGenre(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewGenre({ ...newGenre, [name]: value });
  };

  const handleSaveGenre = async () => {
    if (!newGenre.genreName || !newGenre.genreName.trim()) {
      alert("Please provide a genre name!");
      return;
    }
    try {
      let response;
      if (editingGenre) {
        response = await fetch(
          `http://localhost:8080/api/genres/${editingGenre.genreId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newGenre),
          }
        );
      } else {
        response = await fetch("http://localhost:8080/api/genres", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newGenre),
        });
      }

      if (response.ok) {
        fetchGenres();
        setShowAddForm(false);
        setNewGenre({ genreId: "", genreName: "" });
        setEditingGenre(null);
      } else {
        console.error("Failed to save genre");
      }
    } catch (error) {
      console.error("Error saving genre:", error);
    }
  };

  const handleDeleteGenre = async () => {
    if (genreToDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/genres/${genreToDelete.genreId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          fetchGenres();
          setOpenDeleteDialog(false);
        } else {
          console.error("Failed to delete genre");
        }
      } catch (error) {
        console.error("Error deleting genre:", error);
      }
    }
  };

  const openDeleteDialogBox = (genre) => {
    setGenreToDelete(genre);
    setOpenDeleteDialog(true);
  };

  const filteredGenres = genres.filter((genre) =>
    genre.genreName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditGenre = (genre) => {
    setEditingGenre(genre);
    setNewGenre({
      genreId: genre.genreId,
      genreName: genre.genreName,
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

  // Get paginated genres
  const paginatedGenres = filteredGenres.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
      const response = await fetch("http://localhost:8080/api/genres/bulk-upload-genres", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        fetchGenres();
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
    const headers = ["Genre ID", "Genre Name", "Created At"];
    csvRows.push(headers.join(","));

    paginatedGenres.forEach((genre) => {
      const row = [
        genre.genreId,
        genre.genreName,
        new Date(genre.createdAt).toLocaleDateString(),
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "genres.csv");
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
          label="Search Genres"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          onClick={fetchGenres}
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
          {showAddForm ? "Back to Genres" : "Add New Genre"}
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
          Bulk Upload Genres (CSV)
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

      {/* Render Add Genre Form or Table */}
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
            {editingGenre ? "Edit Genre" : "Add New Genre"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <TextField
              label="Genre Name"
              name="genreName"
              value={newGenre.genreName}
              onChange={handleInputChange}
              fullWidth
              sx={{
                backgroundColor: "#FFFFFF",
              }}
            />
            <Button
              variant="contained"
              onClick={handleSaveGenre}
              sx={{
                backgroundColor: "#003366",
                "&:hover": { backgroundColor: "#FF4500" },
              }}
            >
              {editingGenre ? "Update Genre" : "Save Genre"}
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
                <TableCell align="center" sx={{ color: "#140202", fontWeight: "bold" }}>Genre ID</TableCell>
                <TableCell align="center" sx={{ color: "#140202", fontWeight: "bold" }}>Genre Name</TableCell>
                <TableCell align="center" sx={{ color: "#140202", fontWeight: "bold" }}>Created At</TableCell>
                <TableCell align="center" sx={{ color: "#140202", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedGenres.map((genre) => (
                <TableRow key={genre.genreId}>
                  <TableCell align="center">{genre.genreId}</TableCell>
                  <TableCell align="center">{genre.genreName}</TableCell>
                  <TableCell align="center">{new Date(genre.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        marginRight: "8px",
                        backgroundColor: "#003366",
                        "&:hover": { backgroundColor: "#FF4500" },
                      }}
                      onClick={() => handleEditGenre(genre)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        backgroundColor: "#c62828",
                        "&:hover": { backgroundColor: "#FF4500" },
                      }}
                      onClick={() => openDeleteDialogBox(genre)}
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
            count={filteredGenres.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {/* Delete Genre Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this genre?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteGenre} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GenreSection;
