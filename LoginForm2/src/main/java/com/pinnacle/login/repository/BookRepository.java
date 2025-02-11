package com.pinnacle.login.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pinnacle.login.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findByUserId(Long userId);

//	com.pinnacle.login.service.Optional<Book> findByTitleAndIdNot(String title, Long id);

	
	}

	

