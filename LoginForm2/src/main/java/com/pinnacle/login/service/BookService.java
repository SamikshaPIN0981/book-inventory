package com.pinnacle.login.service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pinnacle.login.model.Author;
import com.pinnacle.login.model.Book;
import com.pinnacle.login.model.Genre;
import com.pinnacle.login.model.User;
import com.pinnacle.login.repository.AuthorRepository;
import com.pinnacle.login.repository.BookRepository;
import com.pinnacle.login.repository.GenreRepository;
import com.pinnacle.login.repository.UserRepository;
import com.pinnacle.login.userdto.AuthorDTO;
import com.pinnacle.login.userdto.BookDTO;
import com.pinnacle.login.userdto.GenreDTO;
import com.pinnacle.login.userdto.UserDTO;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private UserRepository userRepository;

   
    public BookDTO saveBook(BookDTO bookDTO) {
        // Check if the userId is not null in the bookDTO
        if (bookDTO.getUserId() == null) {
            throw new RuntimeException("User ID is missing in the request");
        }

        // Fetch the User entity using the userId from the bookDTO
        User user = userRepository.findById(bookDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch the Author entity using the authorId from bookDTO
        Author author = authorRepository.findById(bookDTO.getAuthor().getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found"));

        // Fetch the Genre entity using the genreId from bookDTO
        Genre genre = genreRepository.findById(bookDTO.getGenre().getGenreId())
                .orElseThrow(() -> new RuntimeException("Genre not found"));

        // Now, create the Book entity and set the Author and Genre objects
        Book book = new Book();
        book.setBookId(bookDTO.getBookId());
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(author);  // Set the Author object
        book.setGenre(genre);  // Set the Genre object
        book.setQuantity(bookDTO.getQuantity());
        book.setPrice(bookDTO.getPrice());
        book.setIsbn(bookDTO.getIsbn());
        book.setUser(user);  // Set the User entity
        
        // Set timestamps
        LocalDateTime now = LocalDateTime.now();
        book.setCreatedAt(now);
        book.setUpdatedAt(now);

        // Save the book to the repository and return the DTO
        Book savedBook = bookRepository.save(book);
        return convertToDTO(savedBook);  // Assuming convertToDTO is a method that converts Book to BookDTO
    }

    // Get a book by ID
    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        return convertToDTO(book);
    }

    // Get all books
    public List<BookDTO> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Update a book by ID
//    public BookDTO updateBook(Long id, BookDTO bookDTO) {
//        Book existingBook = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
//
//        // Fetch Author and Genre from DB using their IDs
//        Author author = authorRepository.findById(bookDTO.getAuthor().getAuthorId())
//                .orElseThrow(() -> new RuntimeException("Author not found"));
//        Genre genre = genreRepository.findById(bookDTO.getGenre().getGenreId())
//                .orElseThrow(() -> new RuntimeException("Genre not found"));
//
//        // Fetch User from DB using the provided userId
//        User user = userRepository.findById(bookDTO.getUser().getId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // Update book properties
//      //  existingBook.setBookId(bookDTO.getBookId());
//        existingBook.setTitle(bookDTO.getTitle());
//        existingBook.setQuantity(bookDTO.getQuantity());
//        existingBook.setPrice(bookDTO.getPrice());
//        existingBook.setIsbn(bookDTO.getIsbn());
//        existingBook.setAuthor(author); // Set fetched Author
//        existingBook.setGenre(genre);   // Set fetched Genre
//        existingBook.setUser(user);     // Set fetched User
//        existingBook.setUpdatedAt(LocalDateTime.now());
//
//        
//        Book updatedBook = bookRepository.save(existingBook);
//        return convertToDTO(updatedBook);
//    }

    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        // Fetch the existing book by ID
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + id));

        // Update the book properties with the values from the DTO
        book.setTitle(bookDTO.getTitle());
        book.setPrice(bookDTO.getPrice());
        book.setQuantity(bookDTO.getQuantity());
        book.setIsbn(bookDTO.getIsbn());

        // Fetch Author and Genre by ID, and update the book with these values
        if (bookDTO.getAuthor().getAuthorId() != null) {
            Author author = authorRepository.findById(bookDTO.getAuthor().getAuthorId())
                    .orElseThrow(() -> new RuntimeException("Author not found with ID: " + bookDTO.getAuthor().getAuthorId()));
            book.setAuthor(author);
        }

        if (bookDTO.getGenre().getGenreId() != null) {
            Genre genre = genreRepository.findById(bookDTO.getGenre().getGenreId())
                    .orElseThrow(() -> new RuntimeException("Genre not found with ID: " + bookDTO.getGenre().getGenreId()));
            book.setGenre(genre);
        }

        // Fetch User by ID and associate with the book
        if (bookDTO.getUser().getId() != null) {
            User user = userRepository.findById(bookDTO.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + bookDTO.getUser().getId()));
            book.setUser(user);
        }

        // Set the updated time
        book.setUpdatedAt(LocalDateTime.now());

        // Save the updated book to the database
        Book updatedBook = bookRepository.save(book);

        // Return the converted DTO
        return convertToDTO(updatedBook);
    }

    // Delete a book by ID
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    // Convert Book entity to BookDTO
    private BookDTO convertToDTO(Book book) {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setBookId(book.getBookId());
        bookDTO.setTitle(book.getTitle());
        bookDTO.setQuantity(book.getQuantity());
        bookDTO.setPrice(book.getPrice());
        bookDTO.setIsbn(book.getIsbn());

        // Convert Author and Genre to their DTOs
        AuthorDTO authorDTO = new AuthorDTO();
        if (book.getAuthor() != null) {
            authorDTO.setAuthorId(book.getAuthor().getAuthorId());
            authorDTO.setAuthorName(book.getAuthor().getAuthorName());
            authorDTO.setBiography(book.getAuthor().getBiography());
            authorDTO.setUserId(book.getAuthor().getUser() != null ? book.getAuthor().getUser().getId() : null);
            authorDTO.setCreatedAt(book.getAuthor().getCreatedAt());
            authorDTO.setUpdatedAt(book.getAuthor().getUpdatedAt());
        }

        GenreDTO genreDTO = new GenreDTO();
        if (book.getGenre() != null) {
            genreDTO.setGenreId(book.getGenre().getGenreId());
            genreDTO.setGenreName(book.getGenre().getGenreName());
            genreDTO.setDescription(book.getGenre().getDescription());
            genreDTO.setCreatedAt(book.getGenre().getCreatedAt());
            genreDTO.setUpdatedAt(book.getGenre().getUpdatedAt());
            genreDTO.setUserId(book.getGenre().getUser() != null ? book.getGenre().getUser().getId() : null);
        }

        bookDTO.setAuthor(authorDTO); // Set AuthorDTO
        bookDTO.setGenre(genreDTO);   // Set GenreDTO

        // Convert User to UserDTO
        UserDTO userDTO = new UserDTO();
        userDTO.setId(book.getUser().getId()); // Ensure the User ID is correctly set
        // If the User entity has more properties that you want to include in the DTO:
        userDTO.setName(book.getUser().getName()); // Assuming `name` exists
        userDTO.setEmail(book.getUser().getEmail()); // Assuming `email` exists
        // Continue setting other properties if necessary.

        bookDTO.setUser(userDTO); // Set UserDTO

        return bookDTO;
    }

	

	public List<BookDTO> getBooksByUserId(Long userId) {
		// TODO Auto-generated method stub
		List<Book> authors = bookRepository.findByUserId(userId);
        return authors.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
	}
}
