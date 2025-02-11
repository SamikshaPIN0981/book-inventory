package com.pinnacle.login.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pinnacle.login.model.Genre;
import com.pinnacle.login.model.User;

public interface GenreRepository extends JpaRepository<Genre, Long> {

	List<Genre> findByUserId(Long userId);
    // Custom query methods can be added here if needed.

	
	
	    Optional<Genre> findByGenreName(String genreName);  // Ensure this method exists
	}


