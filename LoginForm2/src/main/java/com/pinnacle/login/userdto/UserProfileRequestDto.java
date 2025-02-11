package com.pinnacle.login.userdto;

import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;

public class UserProfileRequestDto {
	private Long userId;
	private String firstName;
	private String lastName;
	private LocalDate dateOfBirth;
	private String gender;
	private String address;
	private String phone;
	private String nationality;
	private String maritalStatus;
	private String occupation;
//	private MultipartFile profileImage;
	 private String profileImageBase64; 

	public String getProfileImageBase64() {
		return profileImageBase64;
	}

	public void setProfileImageBase64(String profileImageBase64) {
		this.profileImageBase64 = profileImageBase64;
	}

	// Getters and Setters
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getMaritalStatus() {
		return maritalStatus;
	}

	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

//	public MultipartFile getProfileImage() {
//		return profileImage;
//	}
//
//	public void setProfileImage(MultipartFile profileImage) {
//		this.profileImage = profileImage;
//	}
}
