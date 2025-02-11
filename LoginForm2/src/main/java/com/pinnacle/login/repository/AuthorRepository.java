package com.pinnacle.login.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pinnacle.login.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    // Custom query methods can be added here if needed.
	
	Author save(Author author);

	List<Author> findByUserId(Long userId);
}

