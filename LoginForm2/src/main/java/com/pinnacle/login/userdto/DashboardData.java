package com.pinnacle.login.userdto;

public class DashboardData {

    private long totalBooks;
    private long totalAuthors;
    private long totalCategories;
    private long totalUsers;

    // Constructor, getters, and setters
    public DashboardData(long totalBooks, long totalAuthors, long totalCategories, long totalUsers) {
        this.totalBooks = totalBooks;
        this.totalAuthors = totalAuthors;
        this.totalCategories = totalCategories;
        this.totalUsers = totalUsers;
    }

    public long getTotalBooks() {
        return totalBooks;
    }

    public void setTotalBooks(long totalBooks) {
        this.totalBooks = totalBooks;
    }

    public long getTotalAuthors() {
        return totalAuthors;
    }

    public void setTotalAuthors(long totalAuthors) {
        this.totalAuthors = totalAuthors;
    }

    public long getTotalCategories() {
        return totalCategories;
    }

    public void setTotalCategories(long totalCategories) {
        this.totalCategories = totalCategories;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }
}