//package com.pinnacle.login.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.pinnacle.login.model.Genre;
//import com.pinnacle.login.service.GenreService;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/genres")
//public class GenreController {
//
//    @Autowired
//    private GenreService genreService;
//
//    // Create or Update Genre
//    @PostMapping
//    public ResponseEntity<Genre> createOrUpdateGenre(@RequestBody Genre genre) {
//        try {
//            Genre savedGenre = genreService.saveOrUpdateGenre(genre);
//            return ResponseEntity.ok(savedGenre);
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(409).body(null); // Return 409 Conflict status
//        }
//    }
//
//    // Get all Genres
//    @GetMapping
//    public List<Genre> getAllGenres() {
//        return genreService.getAllGenres();
//    }
//
//    // Get Genre by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Genre> getGenreById(@PathVariable Long id) {
//        Optional<Genre> genre = genreService.getGenreById(id);
//        return genre.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    // Delete Genre
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteGenre(@PathVariable Long id) {
//        genreService.deleteGenre(id);
//        return ResponseEntity.noContent().build();
//    }
//    
// // Update Genre
//    @PutMapping("/{id}")
//    public ResponseEntity<Genre> updateGenre(@PathVariable Long id, @RequestBody Genre genreDetails) {
//        Optional<Genre> optionalGenre = genreService.getGenreById(id);
//
//        if (optionalGenre.isPresent()) {
//            Genre existingGenre = optionalGenre.get();
//            existingGenre.setGenreName(genreDetails.getGenreName());
//            existingGenre.setDescription(genreDetails.getDescription());
//
//            // Save the updated genre
//            Genre updatedGenre = genreService.saveOrUpdateGenre(existingGenre);
//            return ResponseEntity.ok(updatedGenre);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//}


package com.pinnacle.login.controller;

import com.pinnacle.login.service.GenreService;
import com.pinnacle.login.service.UserService;
import com.pinnacle.login.userdto.GenreDTO;
import com.pinnacle.login.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
public class GenreController {

    @Autowired
    private GenreService genreService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;

    // Get all Genres
    @GetMapping
    public ResponseEntity<List<GenreDTO>> getAllGenres() {
        return ResponseEntity.ok(genreService.getAllGenres());
    }

    // Get Genre by ID
    @GetMapping("/{id}")
    public ResponseEntity<GenreDTO> getGenreById(@PathVariable Long id) {
        return ResponseEntity.ok(genreService.getGenreById(id));
    }

    // Create Genre
    @PostMapping
//    public ResponseEntity<GenreDTO> createGenre(@RequestBody GenreDTO genreDTO) {
//        return ResponseEntity.ok(genreService.createGenre(genreDTO));
//    }
   // @PostMapping
    public ResponseEntity<GenreDTO> createGenre(@RequestBody GenreDTO genreDTO, HttpServletRequest request) {
        // Extract token from the Authorization header
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        token = token.substring(7); // Remove "Bearer " prefix

        // Extract user ID from the token
        Long userId = jwtUtil.extractUserId(token);

        // Associate the genre with the user
        genreDTO.setUserId(userId);

        // Save the genre
        return ResponseEntity.ok(genreService.createGenre(genreDTO));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GenreDTO>> getGenresByUserId(@PathVariable Long userId) {
        List<GenreDTO> genres = genreService.getGenresByUserId(userId);
        if (genres.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(genres);
    }

    

    // Update Genre
    @PutMapping("/{id}")
    public ResponseEntity<GenreDTO> updateGenre(@PathVariable Long id, @RequestBody GenreDTO genreDTO) {
        return ResponseEntity.ok(genreService.updateGenre(id, genreDTO));
    }

    // Delete Genre
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGenre(@PathVariable Long id) {
        genreService.deleteGenre(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/bulk-upload-genres")
    public ResponseEntity<String> uploadGenresViaCSV(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        // Extract token from the Authorization header
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        token = token.substring(7); // Remove "Bearer " prefix

        // Extract user ID from the token
        Long userId = jwtUtil.extractUserId(token);

        try {
            genreService.saveGenresFromCSV(file, userId);
            return ResponseEntity.ok("Genres uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing CSV file: " + e.getMessage());
        }
    }
}

