
// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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
//   TablePagination,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";

// const BASE_URL = "http://localhost:8080/api/books";

// const BookSection = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [books, setBooks] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [currentBook, setCurrentBook] = useState(null);
//   const [newBook, setNewBook] = useState({
//     title: "",
//     price: "",
//     quantity: "",
//     isbn: "",
//     author: { authorId: "" },
//     genre: { genreId: "" },
//     user: { id: "" },
//   });
//   const [searchQuery, setSearchQuery] = useState("");



//   const [page, setPage] = useState(0); // Current page
//   const [rowsPerPage] = useState(7); // Entries per page (7)
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete dialog
//   const [bookToDelete, setBookToDelete] = useState(null); // Book to delete

//   const fetchAuthorsAndGenres = async () => {
//     try {
//       const [authorsResponse, genresResponse] = await Promise.all([
//         fetch("http://localhost:8080/api/authors"),
//         fetch("http://localhost:8080/api/genres"),
//       ]);
//       if (authorsResponse.ok) {
//         const authorsData = await authorsResponse.json();
//         setAuthors(authorsData);
//       } else {
//         console.error("Error fetching authors");
//       }
//       if (genresResponse.ok) {
//         const genresData = await genresResponse.json();
//         setGenres(genresData);
//       } else {
//         console.error("Error fetching genres");
//       }
//     } catch (error) {
//       console.error("Error fetching authors or genres:", error);
//     }
//   };

//   const fetchBooks = async () => {
//     const token = localStorage.getItem("authToken");
//     let userId;
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         userId = decodedToken.sub;
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }
//     if (!userId) {
//       console.error("User ID not found.");
//       return;
//     }
//     try {
//       const response = await fetch(`${BASE_URL}/user/${userId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setBooks(data);
//       } else {
//         const errorData = await response.json();
//         console.error("Error fetching books:", errorData);
//       }
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//     fetchAuthorsAndGenres();
//   }, []);

//   const handleToggleForm = (book = null) => {
//     setShowForm(!showForm);
//     setCurrentBook(book);
//     setNewBook(
//       book || {
//         title: "",
//         price: "",
//         quantity: "",
//         isbn: "",
//         author: { authorId: "" },
//         genre: { genreId: "" },
//         user: { id: "" },
//       }
//     );
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "author" || name === "genre") {
//       setNewBook({
//         ...newBook,
//         [name]: { [`${name}Id`]: value.trim() },
//       });
//     } else {
//       setNewBook({ ...newBook, [name]: value.trim() });
//     }
//   };

//   const handleSaveBook = async () => {
//     const trimmedTitle = newBook.title.trim(); // Trim spaces from input

//     if (!trimmedTitle) {
//       toast.warning("Book title cannot be empty or just spaces!", { position: "top-right" });
//       return;
//     }

//     if (!newBook.author?.authorId || !newBook.genre?.genreId) {
//       toast.warning("Please select both an author and a genre!", { position: "top-right" });
//       return;
//     }

//     const trimmedIsbn = newBook.isbn.trim(); // Define trimmedIsbn first

//     const isbnPattern = /^\d{10}(\d{3})?$/; // ISBN must be 10 or 13 digits
//     if (!isbnPattern.test(trimmedIsbn)) {
//       toast.warning("ISBN must be a valid 10 or 13-digit numeric value!", { position: "top-right" });
//       return;
//     }


//     const token = localStorage.getItem("authToken");
//     let userId = null;
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         userId = decodedToken.sub;
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         toast.error("Invalid token. Please login again.", { position: "top-right" });
//       }
//     }

//     if (userId) {
//       const bookPayload = {
//         ...newBook,
//         author: { authorId: newBook.author.authorId || currentBook.author.authorId },
//         genre: { genreId: newBook.genre.genreId || currentBook.genre.genreId },
//         user: { id: userId },
//       };

//       try {
//         let url = BASE_URL;
//         let method = "POST";

//         // Switch to PUT for editing an existing book
//         if (currentBook && currentBook.id) {
//           url = `${BASE_URL}/${currentBook.id}`;
//           method = "PUT";
//         }

//         const response = await fetch(url, {
//           method: method,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(bookPayload),
//         });

//         if (response.ok) {
//           // if (method === "PUT") {
//           //   toast.success("Book updated successfully!", { position: "top-right" });
//           // } else {
//           //   toast.success("Book added successfully!", { position: "top-right" });
//           // }
//           toast.success(currentBook ? "Book updated successfully!" : "Book added successfully!");
//           fetchBooks();
//           handleToggleForm();
//         } else {
//           const errorData = await response.json();
//           console.error("Error saving book:", errorData);
//           toast.error(errorData.message || "Error saving the book.", { position: "top-right" });
//           // alert(errorData.message || "Error saving the book.");
//         }
//       } catch (error) {
//         console.error("Error saving book:", error);
//         toast.error("Error saving book!", { position: "top-right" });
//       }
//     } else {
//       console.error("User ID is missing.");
//       toast.error("User ID is missing.", { position: "top-right" });
//     }
//   };





//   // const handleDeleteBook = async (bookId) => {
//   //   const token = localStorage.getItem("authToken");
//   //   try {
//   //     const response = await fetch(`${BASE_URL}/${bookId}`, {
//   //       method: "DELETE",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });
//   //     if (response.ok) {
//   //       fetchBooks();
//   //     } else {
//   //       console.error("Error deleting book");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error deleting book:", error);
//   //   }
//   // };

//   const handleDeleteBook = (book) => {
//     // Set the book to delete and open the dialog
//     setBookToDelete(book);
//     setOpenDeleteDialog(true);
//   };

//   const confirmDeleteBook = async () => {
//     const token = localStorage.getItem("authToken");
//     if (!bookToDelete) return;

//     try {
//       const response = await fetch(`${BASE_URL}/${bookToDelete.bookId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok) {
//         toast.success("Book deleted successfully!", { position: "top-right" });
//         fetchBooks(); // Refresh the books list after deletion
//         setOpenDeleteDialog(false); // Close the dialog
//       } else {
//         console.error("Error deleting book");
//         toast.error("Error deleting book", { position: "top-right" });
//       }
//     } catch (error) {
//       console.error("Error deleting book:", error);
//       toast.error("Error deleting book", { position: "top-right" });
//     }
//   };
  
  
//   const filteredBooks = books.filter((book) =>
//     book.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const paginatedBooks = filteredBooks.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <Box sx={{ padding: "20px" }}>
//       {/* Search Bar */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", gap: "10px" }}>
//         <TextField
//           label="Search Books"
//           variant="outlined"
//           fullWidth
//           value={searchQuery}
//           onChange={(event) => setSearchQuery(event.target.value)}
//         />
//         <Button
//           variant="contained"
//           onClick={fetchBooks}
//           sx={{
//             backgroundColor: "#003366", // Vibrant blue for Search button
//             "&:hover": { backgroundColor: "#1976D2" }, // Darker blue on hover
//           }}
//         >
//           Search
//         </Button>
//       </Box>

//       {/* Add New Book Button */}
//       <Box sx={{ marginBottom: "20px" }}>
//         {/* Add New Book Button with Dark Royal Blue */}
//         {/* Add New Book Button with Darker Blue */}
//         <Button
//           variant="contained"
//           onClick={() => handleToggleForm()}
//           sx={{
//             backgroundColor: "#003366", // Dark Blue for Add New Book button
//             "&:hover": { backgroundColor: "#FF4500" }, // Even darker blue on hover
//           }}
//         >
//           {showForm ? "Back to Books" : "Add New Book"}
//         </Button>


//       </Box>

//       {showForm ? (
//         <Box
//           sx={{
//             backgroundColor: "rgba(236, 240, 241, 0.8)",
//             padding: "20px",
//             borderRadius: "8px",
//             boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "20px" }}>
//             {currentBook ? "Edit Book" : "Add New Book"}
//           </Typography>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//             {/* Form Fields */}
//             <TextField
//               label="Book Title"
//               name="title"
//               value={newBook.title}
//               onChange={handleInputChange}
//               fullWidth
//             />
//             <TextField
//               label="Price"
//               name="price"
//               value={newBook.price}
//               onChange={handleInputChange}
//               fullWidth
//             />
//             <TextField
//               label="Quantity"
//               name="quantity"
//               value={newBook.quantity}
//               onChange={handleInputChange}
//               fullWidth
//             />
//             <TextField
//               label="ISBN"
//               name="isbn"
//               value={newBook.isbn}
//               onChange={handleInputChange}
//               fullWidth
//             />
//             <TextField
//               select
//               label="Author"
//               name="author"
//               value={newBook.author.authorId}
//               onChange={handleInputChange}
//               fullWidth
//               SelectProps={{ native: true }}
//               InputLabelProps={{ shrink: true }}
//             >
//               <option value="">Select Author</option>
//               {authors.map((author) => (
//                 <option key={author.authorId} value={author.authorId}>
//                   {author.authorName}
//                 </option>
//               ))}
//             </TextField>
//             <TextField
//               select
//               label="Genre"
//               name="genre"
//               value={newBook.genre.genreId}
//               onChange={handleInputChange}
//               fullWidth
//               SelectProps={{ native: true }}
//               InputLabelProps={{ shrink: true }}
//             >
//               <option value="">Select Genre</option>
//               {genres.map((genre) => (
//                 <option key={genre.genreId} value={genre.genreId}>
//                   {genre.genreName}
//                 </option>
//               ))}
//             </TextField>

//             <Button
//               variant="contained"
//               onClick={handleSaveBook}
//               sx={{
//                 backgroundColor: "#003366",
//                 "&:hover": { backgroundColor: "#FF4500" },
//               }}
//             >
//               Save Book
//             </Button>
//           </Box>
//         </Box>
//       ) : (
//         <>
//           <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
//             <Table sx={{ minWidth: 650 }} aria-label="books table">
//               <TableHead>
//                 <TableRow sx={{ background: 'linear-gradient(to right, #FF7E5F, #feb47b)' }}> {/* Gradient Background */}
//                   <TableCell
//                     align="center"
//                     sx={{
//                       color: "#140202",  // White text for contrast
//                       fontWeight: "bold",
//                       fontSize: "16px",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       padding: "12px",
//                       borderBottom: "2px solid #ffffff",  // White Border
//                     }}
//                   >
//                     Title
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{
//                       color: "#140202",
//                       fontWeight: "bold",
//                       fontSize: "16px",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       padding: "12px",
//                       borderBottom: "2px solid #ffffff",
//                     }}
//                   >
//                     Author
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{
//                       color: "#140202",
//                       fontWeight: "bold",
//                       fontSize: "16px",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       padding: "12px",
//                       borderBottom: "2px solid #ffffff",
//                     }}
//                   >
//                     Genre
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{
//                       color: "#140202",
//                       fontWeight: "bold",
//                       fontSize: "16px",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       padding: "12px",
//                       borderBottom: "2px solid #ffffff",
//                     }}
//                   >
//                     Price
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{
//                       color: "#140202",
//                       fontWeight: "bold",
//                       fontSize: "16px",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       padding: "12px",
//                       borderBottom: "2px solid #ffffff",
//                     }}
//                   >
//                     Quantity
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{
//                       color: "#140202",
//                       fontWeight: "bold",
//                       fontSize: "16px",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       padding: "12px",
//                       borderBottom: "2px solid #ffffff",
//                     }}
//                   >
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>


//               <TableBody>
//                 {paginatedBooks.map((book) => (
//                   <TableRow key={book.bookId} sx={{ backgroundColor: "transparent" }}>
//                     <TableCell align="center">{book.title}</TableCell>
//                     <TableCell align="center">{book.author.authorName}</TableCell>
//                     <TableCell align="center">{book.genre.genreName}</TableCell>
//                     <TableCell align="center">{book.price}</TableCell>
//                     <TableCell align="center">{book.quantity}</TableCell>
//                     <TableCell align="center">
//                       <Button
//                         variant="contained"
//                         sx={{
//                           backgroundColor: "#003366", // Soft blue for Edit button
//                           "&:hover": { backgroundColor: "#FF4500" }, // Slightly darker blue on hover
//                           marginRight: "10px",
//                         }}
//                         onClick={() => handleToggleForm(book)}
//                       >
//                         Edit
//                       </Button>
//                       {/* Delete Button with Light Pink */}
//                       {/* Delete Button with Red */}
//                       {/* Delete Button with Dark Red */}
//                       {/* Delete Button with Blood Red */}
//                       {/* Delete Button with Red */}
//                       <Button
//                         variant="contained"
//                         sx={{
//                           backgroundColor: "#d90b0b", // Pure Red for Delete button
//                           "&:hover": { backgroundColor: "#D10000" }, // Darker red on hover
//                         }}
//                         //  onClick={() => handleDeleteBook(book.bookId)}
//                         onClick={() => handleDeleteBook(book)} // Open confirmation dialog
//                       >
//                         Delete
//                       </Button>


//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>

//             </Table>
//           </TableContainer>
//           {/* Delete Confirmation Dialog */}
//           <Dialog
//             open={openDeleteDialog}
//             onClose={() => setOpenDeleteDialog(false)}
//           >
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogContent>
//               <Typography>Are you sure you want to delete this book?</Typography>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
//                 Cancel
//               </Button>
//               <Button onClick={confirmDeleteBook} color="secondary">
//                 Delete
//               </Button>
//             </DialogActions>
//           </Dialog>

//           <TablePagination
//             component="div"
//             count={filteredBooks.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             rowsPerPageOptions={[7]}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default BookSection;


import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input
} from "@mui/material";

const BASE_URL = "http://localhost:8080/api/books";

const BookSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    quantity: "",
    isbn: "",
    author: { authorId: "" },
    genre: { genreId: "" },
    user: { id: "" },
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState(null);



  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage] = useState(7); // Entries per page (7)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete dialog
  const [bookToDelete, setBookToDelete] = useState(null); // Book to delete

  const fetchAuthorsAndGenres = async () => {
    try {
      const [authorsResponse, genresResponse] = await Promise.all([
        fetch("http://localhost:8080/api/authors"),
        fetch("http://localhost:8080/api/genres"),
      ]);
      if (authorsResponse.ok) {
        const authorsData = await authorsResponse.json();
        setAuthors(authorsData);
      } else {
        console.error("Error fetching authors");
      }
      if (genresResponse.ok) {
        const genresData = await genresResponse.json();
        setGenres(genresData);
      } else {
        console.error("Error fetching genres");
      }
    } catch (error) {
      console.error("Error fetching authors or genres:", error);
    }
  };

  const fetchBooks = async () => {
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
    if (!userId) {
      console.error("User ID not found.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        const errorData = await response.json();
        console.error("Error fetching books:", errorData);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchAuthorsAndGenres();
  }, []);

  const handleToggleForm = (book = null) => {
    setShowForm(!showForm);
    setCurrentBook(book);
    setNewBook(
      book || {
        title: "",
        price: "",
        quantity: "",
        isbn: "",
        author: { authorId: "" },
        genre: { genreId: "" },
        user: { id: "" },
      }
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "author" || name === "genre") {
      setNewBook({
        ...newBook,
        [name]: { [`${name}Id`]: value.trim() },
      });
    } else {
      setNewBook({ ...newBook, [name]: value.trim() });
    }
  };

  const handleSaveBook = async () => {
    const trimmedTitle = newBook.title.trim(); // Trim spaces from input

    if (!trimmedTitle) {
      toast.warning("Book title cannot be empty or just spaces!", { position: "top-right" });
      return;
    }

    if (!newBook.author?.authorId || !newBook.genre?.genreId) {
      toast.warning("Please select both an author and a genre!", { position: "top-right" });
      return;
    }

    const trimmedIsbn = newBook.isbn.trim(); // Define trimmedIsbn first

    const isbnPattern = /^\d{10}(\d{3})?$/; // ISBN must be 10 or 13 digits
    if (!isbnPattern.test(trimmedIsbn)) {
      toast.warning("ISBN must be a valid 10 or 13-digit numeric value!", { position: "top-right" });
      return;
    }


    const token = localStorage.getItem("authToken");
    let userId = null;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.sub;
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token. Please login again.", { position: "top-right" });
      }
    }

    if (userId) {
      const bookPayload = {
        ...newBook,
        author: { authorId: newBook.author.authorId || currentBook.author.authorId },
        genre: { genreId: newBook.genre.genreId || currentBook.genre.genreId },
        user: { id: userId },
      };

      try {
        let url = BASE_URL;
        let method = "POST";

        // Switch to PUT for editing an existing book
        if (currentBook && currentBook.id) {
          url = `${BASE_URL}/${currentBook.id}`;
          method = "PUT";
        }

        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookPayload),
        });

        if (response.ok) {
          // if (method === "PUT") {
          //   toast.success("Book updated successfully!", { position: "top-right" });
          // } else {
          //   toast.success("Book added successfully!", { position: "top-right" });
          // }
          toast.success(currentBook ? "Book updated successfully!" : "Book added successfully!");
          fetchBooks();
          handleToggleForm();
        } else {
          const errorData = await response.json();
          console.error("Error saving book:", errorData);
          toast.error(errorData.message || "Error saving the book.", { position: "top-right" });
          // alert(errorData.message || "Error saving the book.");
        }
      } catch (error) {
        console.error("Error saving book:", error);
        toast.error("Error saving book!", { position: "top-right" });
      }
    } else {
      console.error("User ID is missing.");
      toast.error("User ID is missing.", { position: "top-right" });
    }
  };





  // const handleDeleteBook = async (bookId) => {
  //   const token = localStorage.getItem("authToken");
  //   try {
  //     const response = await fetch(`${BASE_URL}/${bookId}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response.ok) {
  //       fetchBooks();
  //     } else {
  //       console.error("Error deleting book");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting book:", error);
  //   }
  // };

  const handleDeleteBook = (book) => {
    // Set the book to delete and open the dialog
    setBookToDelete(book);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteBook = async () => {
    const token = localStorage.getItem("authToken");
    if (!bookToDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/${bookToDelete.bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        toast.success("Book deleted successfully!", { position: "top-right" });
        fetchBooks(); // Refresh the books list after deletion
        setOpenDeleteDialog(false); // Close the dialog
      } else {
        console.error("Error deleting book");
        toast.error("Error deleting book", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Error deleting book", { position: "top-right" });
    }
  };
  
  // Handle file selection for bulk upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);  // Set selected file to state
  };
  
  // Handle bulk upload
  const handleBulkUpload = async () => {
    const token = localStorage.getItem("authToken");  // Get token from localStorage
  
    if (!token) {
      toast.error("No valid token found. Please log in again.", { position: "top-right" });
      return;
    }
  
    if (!file) {
      alert("Please select a CSV file to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);  // Append file to form data
  
    try {
      const response = await fetch("http://localhost:8080/api/books/upload-csv", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,  // Add token to Authorization header
        },
        body: formData,
      });
  
      const responseText = await response.text();  // Log the response text for debugging
  
      console.log(responseText);  // Output response for debugging
  
      if (response.ok) {
        fetchBooks();  // Fetch books after successful upload
        toast.success("CSV file uploaded successfully!", { position: "top-right" });
      } else {
        toast.error(`Failed to upload CSV: ${responseText}`, { position: "top-right" });
      }
    } catch (error) {
      toast.error(`Error uploading CSV: ${error.message}`, { position: "top-right" });
    }
  };
  

// Export data to CSV
const exportToCSV = () => {
  const csvRows = [];
  const headers = ["Book ID", "Title", "Author", "Genre", "Isbn", "Price"];
  csvRows.push(headers.join(","));

  paginatedBooks.forEach((book) => {
    const row = [
      book.bookId,
      book.title,
      book.author,
      book.genre,
      //new Date(book.publishedDate).toLocaleDateString(),
      book.isbn,
      book.price,
    ];
    csvRows.push(row.join(","));
  });

  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "books.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedBooks = filteredBooks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", gap: "10px" }}>
        <TextField
          label="Search Books"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <Button
          variant="contained"
          onClick={fetchBooks}
          sx={{
            backgroundColor: "#003366", // Vibrant blue for Search button
            "&:hover": { backgroundColor: "#1976D2" }, // Darker blue on hover
          }}
        >
          Search
        </Button>
      </Box>

      {/* Add New Book Button */}
      <Box sx={{ marginBottom: "20px" }}>
        {/* Add New Book Button with Dark Royal Blue */}
        {/* Add New Book Button with Darker Blue */}
        <Button
          variant="contained"
          onClick={() => handleToggleForm()}
          sx={{
            backgroundColor: "#003366", // Dark Blue for Add New Book button
            "&:hover": { backgroundColor: "#FF4500" }, // Even darker blue on hover
          }}
        >
          {showForm ? "Back to Books" : "Add New Book"}
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


      {showForm ? (
        <Box
          sx={{
            backgroundColor: "rgba(236, 240, 241, 0.8)",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "20px" }}>
            {currentBook ? "Edit Book" : "Add New Book"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {/* Form Fields */}
            <TextField
              label="Book Title"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Price"
              name="price"
              value={newBook.price}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Quantity"
              name="quantity"
              value={newBook.quantity}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="ISBN"
              name="isbn"
              value={newBook.isbn}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              select
              label="Author"
              name="author"
              value={newBook.author.authorId}
              onChange={handleInputChange}
              fullWidth
              SelectProps={{ native: true }}
              InputLabelProps={{ shrink: true }}
            >
              <option value="">Select Author</option>
              {authors.map((author) => (
                <option key={author.authorId} value={author.authorId}>
                  {author.authorName}
                </option>
              ))}
            </TextField>
            <TextField
              select
              label="Genre"
              name="genre"
              value={newBook.genre.genreId}
              onChange={handleInputChange}
              fullWidth
              SelectProps={{ native: true }}
              InputLabelProps={{ shrink: true }}
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option key={genre.genreId} value={genre.genreId}>
                  {genre.genreName}
                </option>
              ))}
            </TextField>

            <Button
              variant="contained"
              onClick={handleSaveBook}
              sx={{
                backgroundColor: "#003366",
                "&:hover": { backgroundColor: "#FF4500" },
              }}
            >
              Save Book
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
            <Table sx={{ minWidth: 650 }} aria-label="books table">
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(to right, #FF7E5F, #feb47b)' }}> {/* Gradient Background */}
                  <TableCell
                    align="center"
                    sx={{
                      color: "#140202",  // White text for contrast
                      fontWeight: "bold",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      padding: "12px",
                      borderBottom: "2px solid #ffffff",  // White Border
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#140202",
                      fontWeight: "bold",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      padding: "12px",
                      borderBottom: "2px solid #ffffff",
                    }}
                  >
                    Author
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#140202",
                      fontWeight: "bold",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      padding: "12px",
                      borderBottom: "2px solid #ffffff",
                    }}
                  >
                    Genre
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#140202",
                      fontWeight: "bold",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      padding: "12px",
                      borderBottom: "2px solid #ffffff",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#140202",
                      fontWeight: "bold",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      padding: "12px",
                      borderBottom: "2px solid #ffffff",
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#140202",
                      fontWeight: "bold",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      padding: "12px",
                      borderBottom: "2px solid #ffffff",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>


              <TableBody>
                {paginatedBooks.map((book) => (
                  <TableRow key={book.bookId} sx={{ backgroundColor: "transparent" }}>
                    <TableCell align="center">{book.title}</TableCell>
                    <TableCell align="center">{book.author.authorName}</TableCell>
                    <TableCell align="center">{book.genre.genreName}</TableCell>
                    <TableCell align="center">{book.price}</TableCell>
                    <TableCell align="center">{book.quantity}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#003366", // Soft blue for Edit button
                          "&:hover": { backgroundColor: "#FF4500" }, // Slightly darker blue on hover
                          marginRight: "10px",
                        }}
                        onClick={() => handleToggleForm(book)}
                      >
                        Edit
                      </Button>
                      {/* Delete Button with Light Pink */}
                      {/* Delete Button with Red */}
                      {/* Delete Button with Dark Red */}
                      {/* Delete Button with Blood Red */}
                      {/* Delete Button with Red */}
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#d90b0b", // Pure Red for Delete button
                          "&:hover": { backgroundColor: "#D10000" }, // Darker red on hover
                        }}
                        //  onClick={() => handleDeleteBook(book.bookId)}
                        onClick={() => handleDeleteBook(book)} // Open confirmation dialog
                      >
                        Delete
                      </Button>


                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
          {/* Delete Confirmation Dialog */}
          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this book?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDeleteBook} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <TablePagination
            component="div"
            count={filteredBooks.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[7]}
          />
        </>
      )}
    </Box>
  );
};

export default BookSection;
