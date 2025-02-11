package com.pinnacle.login.userdto;

import java.math.BigDecimal;

public class BookResponseDto {

    private String title;
    private String authorName;
    private String genreName;
    private BigDecimal price;
    private String isbn;
	private Long bookId;
	public BookResponseDto(Long bookId, String title, String authorName, String genreName, BigDecimal price, String isbn) {
	    this.bookId = bookId;
	    this.title = title;
	    this.authorName = authorName;
	    this.genreName = genreName;
	    this.price = price;
	    this.isbn = isbn;
	}

	// Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(String genreName) {
        this.genreName = genreName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
}
