////package com.pinnacle.login.service;
////
////
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.stereotype.Service;
////
////import com.pinnacle.login.model.Author;
////import com.pinnacle.login.repository.AuthorRepository;
////
////import java.util.List;
////import java.util.Optional;
////
////@Service
////public class AuthorService {
////
////    @Autowired
////    private AuthorRepository authorRepository;
////
////    // Create or Update Author
////    public Author saveOrUpdateAuthor(Author author) {
////        return authorRepository.save(author);
////    }
////
////    // Get all Authors
////    public List<Author> getAllAuthors() {
////        return authorRepository.findAll();
////    }
////
////    // Get Author by ID
////    public Optional<Author> getAuthorById(Long id) {
////        return authorRepository.findById(id);
////    }
////
////    // Delete Author
////    public void deleteAuthor(Long id) {
////        authorRepository.deleteById(id);
////    }
////}
//
//
//package com.pinnacle.login.service;
//
//import com.pinnacle.login.model.Author;
//import com.pinnacle.login.model.User;
//import com.pinnacle.login.repository.AuthorRepository;
//import com.pinnacle.login.repository.UserRepository;
//import com.pinnacle.login.userdto.AuthorDTO;
//import com.pinnacle.login.userdto.UserDTO;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@Service
//public class AuthorService {
//
//    @Autowired
//    private AuthorRepository authorRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    // Convert Entity to DTO
//    private AuthorDTO convertToDTO(Author author) {
//        AuthorDTO dto = new AuthorDTO();
//        dto.setAuthorId(author.getAuthorId());
//        dto.setAuthorName(author.getAuthorName());
//        dto.setBiography(author.getBiography());
//        dto.setCreatedAt(author.getCreatedAt());
//        dto.setUpdatedAt(author.getUpdatedAt());
//
//        // Check if User is null before setting UserDTO
//        if (author.getUser() != null) {
//            UserDTO userDTO = new UserDTO();
//            userDTO.setId(author.getUser().getId());
//            userDTO.setName(author.getUser().getName());
//            userDTO.setEmail(author.getUser().getEmail());
//            dto.setUser(userDTO);
//        } else {
//            dto.setUser(null); // Handle cases where user is null
//        }
//
//        return dto;
//    }
//
//
//    // Convert DTO to Entity
//    private Author convertToEntity(AuthorDTO dto) {
//        Author author = new Author();
//        author.setAuthorId(dto.getAuthorId());
//        author.setAuthorName(dto.getAuthorName());
//        author.setBiography(dto.getBiography());
//        Optional<User> user = userRepository.findById(dto.getUser().getId());
//        user.ifPresent(author::setUser);
//
//        return author;
//    }
//
////    public List<AuthorDTO> getAllAuthors() {
////        return authorRepository.findAll().stream()
////                .map(this::convertToDTO)
////                .collect(Collectors.toList());
////    }
//    
//    public List<AuthorDTO> getAllAuthors() {
//        List<AuthorDTO> authorDTOs = authorRepository.findAll().stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//        System.out.println("Fetched Authors: " + authorDTOs);
//        return authorDTOs;
//    }
//
//
//    public AuthorDTO getAuthorById(Long id) {
//        Author author = authorRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Author not found with ID: " + id));
//        return convertToDTO(author);
//    }
//
//    public AuthorDTO createAuthor(AuthorDTO dto) {
//        Author author = convertToEntity(dto);
//        Author savedAuthor = authorRepository.save(author);
//        return convertToDTO(savedAuthor);
//    }
//
//    public AuthorDTO updateAuthor(Long id, AuthorDTO dto) {
//        Author author = authorRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Author not found with ID: " + id));
//        author.setAuthorName(dto.getAuthorName());
//        author.setBiography(dto.getBiography());
//        Optional<User> user = userRepository.findById(dto.getUser().getId());
//        user.ifPresent(author::setUser);
//
//        Author updatedAuthor = authorRepository.save(author);
//        return convertToDTO(updatedAuthor);
//    }
//
//    public void deleteAuthor(Long id) {
//        Author author = authorRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Author not found with ID: " + id));
//        authorRepository.delete(author);
//    }
//}


package com.pinnacle.login.service;


import com.pinnacle.login.model.Author;
import com.pinnacle.login.model.User;
import com.pinnacle.login.repository.AuthorRepository;
import com.pinnacle.login.repository.UserRepository;
import com.pinnacle.login.userdto.AuthorDTO;
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
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private UserRepository userRepository;

    // Convert Entity to DTO
    private AuthorDTO convertToDTO(Author author) {
        AuthorDTO dto = new AuthorDTO();
        dto.setAuthorId(author.getAuthorId());
        dto.setAuthorName(author.getAuthorName());
        dto.setBiography(author.getBiography());
        dto.setCreatedAt(author.getCreatedAt());
        dto.setUpdatedAt(author.getUpdatedAt());

        if (author.getUser() != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(author.getUser().getId());
            userDTO.setName(author.getUser().getName());
            userDTO.setEmail(author.getUser().getEmail());
            dto.setUser(userDTO);
        } else {
            dto.setUser(null);
        }

        return dto;
    }

    // Convert DTO to Entity
    private Author convertToEntity(AuthorDTO dto) {
        Author author = new Author();
        author.setAuthorId(dto.getAuthorId());
        author.setAuthorName(dto.getAuthorName());
        author.setBiography(dto.getBiography());

        if (dto.getUserId() != null) {
            Optional<User> user = userRepository.findById(dto.getUserId());
            user.ifPresent(author::setUser);
        }

        return author;
    }

    // Get all Authors
    public List<AuthorDTO> getAllAuthors() {
        return authorRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get Authors by User ID
    public List<AuthorDTO> getAuthorsByUserId(Long userId) {
        List<Author> authors = authorRepository.findByUserId(userId);
        return authors.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get Author by ID
    public AuthorDTO getAuthorById(Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Author not found with ID: " + id));
        return convertToDTO(author);
    }

    // Create Author
    public AuthorDTO createAuthor(AuthorDTO dto) {
        Author author = convertToEntity(dto);
        Author savedAuthor = authorRepository.save(author);
        return convertToDTO(savedAuthor);
    }

    // Update Author
    public AuthorDTO updateAuthor(Long id, AuthorDTO dto) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Author not found with ID: " + id));

        author.setAuthorName(dto.getAuthorName());
        author.setBiography(dto.getBiography());

        if (dto.getUserId() != null) {
            Optional<User> user = userRepository.findById(dto.getUserId());
            user.ifPresent(author::setUser);
        }

        Author updatedAuthor = authorRepository.save(author);
        return convertToDTO(updatedAuthor);
    }

    // Delete Author
    public void deleteAuthor(Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Author not found with ID: " + id));
        authorRepository.delete(author);
    }
    

    public void saveAuthorsFromCSV(MultipartFile file, Long userId) throws Exception {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        User user = userOptional.get();

        List<Author> authors = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            for (CSVRecord record : csvParser) {
                String authorName = record.get("authorName");
                String biography = record.get("biography");

                if (authorName == null || authorName.isBlank()) {
                    throw new RuntimeException("Author name is missing in CSV record: " + record.getRecordNumber());
                }

                Author author = new Author();
                author.setAuthorName(authorName);
                author.setBiography(biography);
                author.setUser(user);

                authors.add(author);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error reading CSV file: " + e.getMessage(), e);
        }

        authorRepository.saveAll(authors);
    }

}