package com.pinnacle.login.model;



import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Arrays;

@Entity
public class UserProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "user_id",referencedColumnName = "id", nullable = false)
	private User user;

	private String firstName;
	private String lastName;
	private LocalDate dateOfBirth;
	private String gender;
	private String address;
	private String phone;
	private String nationality;
	private String maritalStatus;
	private String occupation;
//	 private String profileImageBase64; 
	private String profileImageBase64;

	public String getProfileImageBase64() {
		return profileImageBase64;
	}

	public void setProfileImageBase64(String profileImageBase64) {
		this.profileImageBase64 = profileImageBase64;
	}

	@Lob
	@Column(name = "profile_image", columnDefinition = "LONGBLOB")
	private byte[] profileImage;

	// Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public byte[] getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(byte[] profileImage) {
		this.profileImage = profileImage;
	}

	@Override
	public String toString() {
		return "UserProfile{" + "id=" + id + ", firstName='" + firstName + '\'' + ", lastName='" + lastName + '\''
				+ ", dateOfBirth=" + dateOfBirth + ", gender='" + gender + '\'' + ", address='" + address + '\''
				+ ", phone='" + phone + '\'' + ", nationality='" + nationality + '\'' + ", maritalStatus='"
				+ maritalStatus + '\'' + ", occupation='" + occupation + '\'' + ", profileImage="
				+ Arrays.toString(profileImage) + '}';
	}
}
