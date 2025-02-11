//package com.pinnacle.login.controller;
////
////
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.pinnacle.login.model.Book;
//import com.pinnacle.login.model.User;
//import com.pinnacle.login.repository.UserRepository;
//import com.pinnacle.login.service.BookService;
//import com.pinnacle.login.userdto.BookDTO;
//import com.pinnacle.login.util.JwtUtil;
//
//import jakarta.servlet.http.HttpServletRequest;
//
//
//import java.util.List;
//
//
//
//@RestController
//@RequestMapping("/api/books")
//public class BookController {
//
//    @Autowired
//    private BookService bookService;
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    // Create a new book
//    //@PostMapping
////    public ResponseEntity<BookDTO> createBook(@RequestBody BookDTO bookDTO, HttpServletRequest request) {
////        String token = request.getHeader("Authorization");
////        if (token == null || !token.startsWith("Bearer ")) {
////            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
////        }
////        token = token.substring(7);
////        Long userId = jwtUtil.extractUserId(token);
////
////        bookDTO.setUserId(userId);
////        BookDTO createdBook = bookService.saveBook(bookDTO);
////        return ResponseEntity.ok(createdBook);
////    }
//
// // Create a new book
//    @Autowired
//    private UserRepository userRepository;
//    
//    @PostMapping
//    public ResponseEntity<BookDTO> createBook(@RequestBody BookDTO bookDTO, HttpServletRequest request) {
//        String token = request.getHeader("Authorization");
//        if (token == null || !token.startsWith("Bearer ")) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//        token = token.substring(7);
//        Long userId = jwtUtil.extractUserId(token);
//
//        // Ensure bookDTO contains a valid userId
//        bookDTO.setUserId(userId); // Set userId instead of user
//        BookDTO createdBook = bookService.saveBook(bookDTO);
//        return ResponseEntity.ok(createdBook);
//    }
//
//
//    // Get a book by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<BookDTO> getBookById(@PathVariable("id") Long id) {
//        return ResponseEntity.ok(bookService.getBookById(id));
//    }
//
//    // Get books by user ID
//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<BookDTO>> getBooksByUserId(@PathVariable Long userId) {
//        List<BookDTO> books = bookService.getBooksByUserId(userId);
//        if (books.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok(books);
//    }
//
//    // Get all books
//    @GetMapping
//    public ResponseEntity<List<BookDTO>> getAllBooks() {
//        return ResponseEntity.ok(bookService.getAllBooks());
//    }
//
//    // Update a book by ID
//    @PutMapping("/{id}")
//    public ResponseEntity<BookDTO> updateBook(@PathVariable("id") Long id, @RequestBody BookDTO bookDTO) {
//        return ResponseEntity.ok(bookService.updateBook(id, bookDTO));
//    }
//
//    // Delete a book by ID
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteBook(@PathVariable("id") Long id) {
//        bookService.deleteBook(id);
//        return ResponseEntity.noContent().build();
//    }
//}
//

package com.pinnacle.login.controller;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.pinnacle.login.model.Book;
import com.pinnacle.login.repository.UserRepository;
import com.pinnacle.login.service.BookService;
import com.pinnacle.login.userdto.AuthorDTO;
import com.pinnacle.login.userdto.BookDTO;
import com.pinnacle.login.userdto.GenreDTO;
import com.pinnacle.login.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    // Create a new book
    @PostMapping
    public ResponseEntity<BookDTO> createBook(@RequestBody BookDTO bookDTO, HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        token = token.substring(7);
        Long userId = jwtUtil.extractUserId(token);

        // Ensure bookDTO contains a valid userId
        bookDTO.setUserId(userId); // Set userId for the book

        // Create the book from the DTO and save it
        BookDTO createdBook = bookService.saveBook(bookDTO);

        return ResponseEntity.ok(createdBook);
    }

    // Get a book by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    // Get books by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookDTO>> getBooksByUserId(@PathVariable Long userId) {
        List<BookDTO> books = bookService.getBooksByUserId(userId);
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(books);
    }

    // Get all books
    @GetMapping
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    // Update a book by ID
    @PutMapping("/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable("id") Long id, @RequestBody BookDTO bookDTO) {
        return ResponseEntity.ok(bookService.updateBook(id, bookDTO));
    }

    // Delete a book by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/upload-csv")
    public ResponseEntity<String> uploadBooksFromCsv(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        token = token.substring(7); // Extract the token
        Long userId = jwtUtil.extractUserId(token); // Assuming jwtUtil is properly set up

        try {
            // Parse the CSV file
            List<BookDTO> books = parseCsvFile(file, userId);

            // Save each book using the existing service
            for (BookDTO bookDTO : books) {
                bookService.saveBook(bookDTO); // Save the book using the existing saveBook logic
            }

            return new ResponseEntity<>("Books uploaded successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing CSV file: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    private List<BookDTO> parseCsvFile(MultipartFile file, Long userId) throws IOException {
        List<BookDTO> books = new ArrayList<>();

        // Parse CSV file
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader())) {
            
            for (CSVRecord record : csvParser) {
                BookDTO bookDTO = new BookDTO();
                bookDTO.setTitle(record.get("title"));
                bookDTO.setQuantity(Integer.parseInt(record.get("quantity")));
                bookDTO.setPrice(new BigDecimal(record.get("price")));
                bookDTO.setIsbn(record.get("isbn"));
                bookDTO.setUserId(userId);  // Set userId from token

                AuthorDTO authorDTO = new AuthorDTO();
                authorDTO.setAuthorId(Long.parseLong(record.get("authorId")));
                bookDTO.setAuthor(authorDTO);

                GenreDTO genreDTO = new GenreDTO();
                genreDTO.setGenreId(Long.parseLong(record.get("genreId")));
                bookDTO.setGenre(genreDTO);

                books.add(bookDTO);
            }
        }

        return books;
    }
}

