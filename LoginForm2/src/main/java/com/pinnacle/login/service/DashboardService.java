package com.pinnacle.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pinnacle.login.repository.AuthorRepository;
import com.pinnacle.login.repository.BookRepository;
import com.pinnacle.login.repository.GenreRepository;
import com.pinnacle.login.repository.UserRepository;
import com.pinnacle.login.userdto.DashboardData;

@Service
public class DashboardService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private GenreRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    public DashboardData getDashboardData() {
        long totalBooks = bookRepository.count();
        long totalAuthors = authorRepository.count();
        long totalCategories = categoryRepository.count();
        long totalUsers = userRepository.count();

        return new DashboardData(totalBooks, totalAuthors, totalCategories, totalUsers);
    }
}