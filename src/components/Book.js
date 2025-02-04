
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
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
 


  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage] = useState(7); // Entries per page (7)

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
        [name]: { [`${name}Id`]: value },
      });
    } else {
      setNewBook({ ...newBook, [name]: value });
    }
  };

  const handleSaveBook = async () => {
    if (!newBook.title.trim()) {
      alert("Please provide a book title!");
      return;
    }
    if (!newBook.author.authorId || !newBook.genre.genreId) {
      alert("Please select both an author and a genre!");
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
          fetchBooks();
          handleToggleForm();
        } else {
          const errorData = await response.json();
          console.error("Error saving book:", errorData);
          alert(errorData.message || "Error saving the book.");
        }
      } catch (error) {
        console.error("Error saving book:", error);
      }
    } else {
      console.error("User ID is missing.");
    }
  };


  const handleDeleteBook = async (bookId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${BASE_URL}/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchBooks();
      } else {
        console.error("Error deleting book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
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
                          "&:hover": { backgroundColor: "#3578D9" }, // Slightly darker blue on hover
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
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
                        Delete
                      </Button>





                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
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


// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
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
//   const [file, setFile] = useState(null); // For CSV file selection

//   const [page, setPage] = useState(0); // Current page
//   const [rowsPerPage] = useState(7); // Entries per page (7)

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

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleBulkUpload = async () => {
//     const token = localStorage.getItem("authToken");
//     if (!file) {
//       alert("Please select a CSV file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("http://localhost:8080/api/books/upload-csv", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         fetchAuthorsAndGenres();
//         alert("Bulk upload successful!");
//       } else {
//         console.error("Failed to upload CSV.");
//       }
//     } catch (error) {
//       console.error("Error uploading CSV:", error);
//     }
//   };

//   // CSV Export function
//   const exportToCSV = () => {
//     const csvRows = [];
//     const headers = ["Book ID", "Title", "Author", "Genre", "Price", "quantity",];
//     csvRows.push(headers.join(","));

//     books.forEach((book) => {
//       const row = [
//         book.bookId,
//         book.title,
//         book.author.authorName,
//         book.genre.genreName,
//         book.price,
//         book.quantity,
//         book.isbn
//       ];
//       csvRows.push(row.join(","));
//     });

//     const csvContent = csvRows.join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute("download", "books.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

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
//         [name]: { [`${name}Id`]: value },
//       });
//     } else {
//       setNewBook({ ...newBook, [name]: value });
//     }
//   };

//   const handleSaveBook = async () => {
//     if (!newBook.title.trim()) {
//       alert("Please provide a book title!");
//       return;
//     }
//     if (!newBook.author.authorId || !newBook.genre.genreId) {
//       alert("Please select both an author and a genre!");
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
//           fetchBooks();
//           handleToggleForm();
//         } else {
//           const errorData = await response.json();
//           console.error("Error saving book:", errorData);
//           alert(errorData.message || "Error saving the book.");
//         }
//       } catch (error) {
//         console.error("Error saving book:", error);
//       }
//     } else {
//       console.error("User ID is missing.");
//     }
//   };

//   const handleDeleteBook = async (bookId) => {
//     const token = localStorage.getItem("authToken");
//     try {
//       const response = await fetch(`${BASE_URL}/${bookId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok) {
//         fetchBooks();
//       } else {
//         console.error("Error deleting book");
//       }
//     } catch (error) {
//       console.error("Error deleting book:", error);
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

//       {/* CSV Upload and Export */}
//       <Box sx={{ marginBottom: "20px" }}>
//         <input type="file" accept=".csv" onChange={handleFileChange} />
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleBulkUpload}
//           sx={{ marginLeft: "10px" }}
//         >
//           Upload CSV
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={exportToCSV}
//           sx={{ marginLeft: "10px" }}
//         >
//           Export to CSV
//         </Button>
//       </Box>

//       {/* Table of Books */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="books table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Book ID</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Author</TableCell>
//               <TableCell>Genre</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedBooks.map((book) => (
//               <TableRow key={book.bookId}>
//                 <TableCell>{book.bookId}</TableCell>
//                 <TableCell>{book.title}</TableCell>
//                 <TableCell>{book.author.authorName}</TableCell>
//                 <TableCell>{book.genre.genreName}</TableCell>
//                 <TableCell>{book.price}</TableCell>
//                 <TableCell>{book.quantity}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => handleToggleForm(book)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => handleDeleteBook(book.bookId)}
//                     sx={{ marginLeft: "10px" }}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         rowsPerPageOptions={[7]}
//         component="div"
//         count={filteredBooks.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//       />

//       {/* Add/Edit Book Form */}
//       {showForm && (
//         <Box sx={{ marginTop: "20px" }}>
//           <Typography variant="h6">{currentBook ? "Edit Book" : "Add New Book"}</Typography>
//           <TextField
//             label="Title"
//             variant="outlined"
//             fullWidth
//             value={newBook.title}
//             onChange={handleInputChange}
//             name="title"
//             sx={{ marginBottom: "10px" }}
//           />
//           <TextField
//             label="Price"
//             variant="outlined"
//             fullWidth
//             value={newBook.price}
//             onChange={handleInputChange}
//             name="price"
//             sx={{ marginBottom: "10px" }}
//           />
//           <TextField
//             label="Quantity"
//             variant="outlined"
//             fullWidth
//             value={newBook.quantity}
//             onChange={handleInputChange}
//             name="quantity"
//             sx={{ marginBottom: "10px" }}
//           />
//           <TextField
//             label="ISBN"
//             variant="outlined"
//             fullWidth
//             value={newBook.isbn}
//             onChange={handleInputChange}
//             name="isbn"
//             sx={{ marginBottom: "10px" }}
//           />
//           <select
//             name="author"
//             value={newBook.author.authorId}
//             onChange={handleInputChange}
//             style={{ marginBottom: "10px", width: "100%" }}
//           >
//             <option value="">Select Author</option>
//             {authors.map((author) => (
//               <option key={author.authorId} value={author.authorId}>
//                 {author.authorName}
//               </option>
//             ))}
//           </select>
//           <select
//             name="genre"
//             value={newBook.genre.genreId}
//             onChange={handleInputChange}
//             style={{ marginBottom: "10px", width: "100%" }}
//           >
//             <option value="">Select Genre</option>
//             {genres.map((genre) => (
//               <option key={genre.genreId} value={genre.genreId}>
//                 {genre.genreName}
//               </option>
//             ))}
//           </select>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSaveBook}
//             sx={{ marginTop: "20px" }}
//           >
//             Save
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default BookSection;
