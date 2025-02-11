//package com.pinnacle.login.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.dao.OptimisticLockingFailureException;
//import org.springframework.stereotype.Service;
//
//import com.pinnacle.login.model.Genre;
//import com.pinnacle.login.repository.GenreRepository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class GenreService {
//
//    @Autowired
//    private GenreRepository genreRepository;
//
//    // Create or Update Genre
//    public Genre saveOrUpdateGenre(Genre genre) {
//        try {
//            return genreRepository.save(genre);
//        } catch (OptimisticLockingFailureException e) {
//            // Handle the optimistic locking failure (when the row is updated or deleted by another transaction)
//            throw new RuntimeException("Concurrency conflict detected. Please try again.");
//        }
//    }
//
//    // Get all Genres
//    public List<Genre> getAllGenres() {
//        return genreRepository.findAll();
//    }
//
//    // Get Genre by ID
//    public Optional<Genre> getGenreById(Long id) {
//        return genreRepository.findById(id);
//    }
//
//    // Delete Genre
//    public void deleteGenre(Long id) {
//        genreRepository.deleteById(id);
//    }
//}


package com.pinnacle.login.service;

import com.pinnacle.login.model.Genre;
import com.pinnacle.login.model.User;
import com.pinnacle.login.repository.GenreRepository;
import com.pinnacle.login.repository.UserRepository;
import com.pinnacle.login.userdto.GenreDTO;
import com.pinnacle.login.userdto.UserDTO;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GenreService {

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private UserRepository userRepository;

    // Convert Entity to DTO
    private GenreDTO convertToDTO(Genre genre) {
        GenreDTO dto = new GenreDTO();
        dto.setGenreId(genre.getGenreId());
        dto.setGenreName(genre.getGenreName());
        dto.setDescription(genre.getDescription());
        dto.setCreatedAt(genre.getCreatedAt());
        dto.setUpdatedAt(genre.getUpdatedAt());

        if (genre.getUser() != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(genre.getUser().getId());
            userDTO.setName(genre.getUser().getName());
            userDTO.setEmail(genre.getUser().getEmail());
            dto.setUser(userDTO);
        } else {
            dto.setUser(null);
        }

        return dto;
    }

    // Convert DTO to Entity
    private Genre convertToEntity(GenreDTO dto) {
        Genre genre = new Genre();
        genre.setGenreId(dto.getGenreId());
        genre.setGenreName(dto.getGenreName());
        genre.setDescription(dto.getDescription());

        if (dto.getUserId() != null) {
            Optional<User> user = userRepository.findById(dto.getUserId());
            user.ifPresent(genre::setUser);
        }

        return genre;
    }
    
    public List<GenreDTO> getGenresByUserId(Long userId) {
        List<Genre> genres = genreRepository.findByUserId(userId);
        return genres.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    // Get all Genres
    public List<GenreDTO> getAllGenres() {
        return genreRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get Genre by ID
    public GenreDTO getGenreById(Long id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Genre not found"));
        return convertToDTO(genre);
    }

    // Create Genre
    public GenreDTO createGenre(GenreDTO dto) {
        Genre genre = convertToEntity(dto);
        Genre savedGenre = genreRepository.save(genre);
        return convertToDTO(savedGenre);
    }

    // Update Genre
    public GenreDTO updateGenre(Long id, GenreDTO dto) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Genre not found"));

        genre.setGenreName(dto.getGenreName());
        genre.setDescription(dto.getDescription());
        if (dto.getUser() != null) {
            Optional<User> user = userRepository.findById(dto.getUser().getId());
            user.ifPresent(genre::setUser);
        }

        Genre updatedGenre = genreRepository.save(genre);
        return convertToDTO(updatedGenre);
    }

    // Delete Genre
    public void deleteGenre(Long id) {
        genreRepository.deleteById(id);
    }
    
    public void saveGenresFromCSV(MultipartFile file, Long userId) throws Exception {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        User user = userOptional.get();

        List<Genre> genres = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            for (CSVRecord record : csvParser) {
                String genreName = record.get("genreName");
                String description = record.get("description");

                if (genreName == null || genreName.isBlank()) {
                    throw new RuntimeException("Genre name is missing in CSV record: " + record.getRecordNumber());
                }

                Genre genre = new Genre();
                genre.setGenreName(genreName);
                genre.setDescription(description);
                genre.setUser(user);

                genres.add(genre);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error reading CSV file: " + e.getMessage(), e);
        }

        genreRepository.saveAll(genres);
    }
}
