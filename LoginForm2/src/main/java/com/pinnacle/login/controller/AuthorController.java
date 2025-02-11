////package com.pinnacle.login.controller;
////
////
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.http.ResponseEntity;
////import org.springframework.web.bind.annotation.*;
////
////import com.pinnacle.login.model.Author;
////import com.pinnacle.login.service.AuthorService;
////
////import java.util.List;
////import java.util.Optional;
////
////@RestController
////@RequestMapping("/api/authors")
////public class AuthorController {
////
////    @Autowired
////    private AuthorService authorService;
////
////    // Create or Update Author
////    @PostMapping
////    public ResponseEntity<Author> createOrUpdateAuthor(@RequestBody Author author) {
////        Author savedAuthor = authorService.saveOrUpdateAuthor(author);
////        return ResponseEntity.ok(savedAuthor);
////    }
////
////    // Get all Authors
////    @GetMapping
////    public List<Author> getAllAuthors() {
////        return authorService.getAllAuthors();
////    }
////
////    // Get Author by ID
////    @GetMapping("/{id}")
////    public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
////        Optional<Author> author = authorService.getAuthorById(id);
////        return author.map(ResponseEntity::ok)
////                .orElseGet(() -> ResponseEntity.notFound().build());
////    }
////
////    // Delete Author
////    @DeleteMapping("/{id}")
////    public ResponseEntity<Void> deleteAuthor(@PathVariable Long id) {
////        authorService.deleteAuthor(id);
////        return ResponseEntity.noContent().build();
////    }
////}
//
//
//package com.pinnacle.login.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.pinnacle.login.model.Author;
//import com.pinnacle.login.service.AuthorService;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/authors")
//public class AuthorController {
//
//    @Autowired
//    private AuthorService authorService;
//
//    // Create Author
//    @PostMapping
//    public ResponseEntity<Author> createAuthor(@RequestBody Author author) {
//        Author savedAuthor = authorService.saveOrUpdateAuthor(author);
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedAuthor);
//    }
//
//    // Update Author
//    @PutMapping("/{id}")
//    public ResponseEntity<Author> updateAuthor(@PathVariable Long id, @RequestBody Author authorDetails) {
//        Optional<Author> optionalAuthor = authorService.getAuthorById(id);
//
//        if (optionalAuthor.isPresent()) {
//            Author existingAuthor = optionalAuthor.get();
//            existingAuthor.setAuthorName(authorDetails.getAuthorName());
//            existingAuthor.setBiography(authorDetails.getBiography());
//            existingAuthor.setUser(authorDetails.getUser());
//
//            Author updatedAuthor = authorService.saveOrUpdateAuthor(existingAuthor);
//            return ResponseEntity.ok(updatedAuthor);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    // Get all Authors
//    @GetMapping
//    public ResponseEntity<List<Author>> getAllAuthors() {
//        List<Author> authors = authorService.getAllAuthors();
//        return ResponseEntity.ok(authors);
//    }
//
//    // Get Author by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
//        Optional<Author> optionalAuthor = authorService.getAuthorById(id);
//
//        if (optionalAuthor.isPresent()) {
//            return ResponseEntity.ok(optionalAuthor.get());
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    // Delete Author
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteAuthor(@PathVariable Long id) {
//        Optional<Author> optionalAuthor = authorService.getAuthorById(id);
//
//        if (optionalAuthor.isPresent()) {
//            authorService.deleteAuthor(id);
//            return ResponseEntity.noContent().build();
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//}
//


package com.pinnacle.login.controller;

import com.pinnacle.login.service.AuthorService;
import com.pinnacle.login.userdto.AuthorDTO;
import com.pinnacle.login.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;




@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;
    
  
    @Autowired
    private JwtUtil jwtUtil;

//    @GetMapping
//    public ResponseEntity<List<AuthorDTO>> getAllAuthors() {
//        return ResponseEntity.ok(authorService.getAllAuthors());
//    }
    @PostMapping("/bulk-upload")
    public ResponseEntity<String> uploadAuthorsViaCSV(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        // Extract token from the Authorization header
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        token = token.substring(7); // Remove "Bearer " prefix

        // Extract user ID from the token
        Long userId = jwtUtil.extractUserId(token);

        try {
            authorService.saveAuthorsFromCSV(file, userId);
            return ResponseEntity.ok("Authors uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing CSV file: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<AuthorDTO>> getAllAuthors() {
        System.out.println("AuthorService: " + authorService);
        return ResponseEntity.ok(authorService.getAllAuthors());
    }


    @GetMapping("/{id}")
    public ResponseEntity<AuthorDTO> getAuthorById(@PathVariable Long id) {
        return ResponseEntity.ok(authorService.getAuthorById(id));
    }

//    @PostMapping
//    public ResponseEntity<AuthorDTO> createAuthor(@RequestBody AuthorDTO authorDTO) {
//        return ResponseEntity.ok(authorService.createAuthor(authorDTO));
//    }
    
    @PostMapping
    public ResponseEntity<AuthorDTO> createAuthor(@RequestBody AuthorDTO authorDTO, HttpServletRequest request) {
        // Extract token from the Authorization header
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        token = token.substring(7); // Remove "Bearer " prefix

        // Extract user ID from the token
        Long userId = jwtUtil.extractUserId(token);

        // Associate the author with the user
        authorDTO.setUserId(userId);

        // Save the author
        return ResponseEntity.ok(authorService.createAuthor(authorDTO));
    }
    
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AuthorDTO>> getAuthorsByUserId(@PathVariable Long userId) {
        List<AuthorDTO> authors = authorService.getAuthorsByUserId(userId);
        if (authors.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(authors);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuthorDTO> updateAuthor(@PathVariable Long id, @RequestBody AuthorDTO authorDTO) {
        return ResponseEntity.ok(authorService.updateAuthor(id, authorDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable Long id) {
        authorService.deleteAuthor(id);
        return ResponseEntity.noContent().build();
    }
}
