import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens or user session data
    localStorage.removeItem("authToken");
    // Redirect to the login page
    navigate("/");
  };
  

  const handleCancel = () => {
    // Redirect to the dashboard or previous page
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgba(236, 240, 241, 0.8)",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "#FFF",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ marginBottom: "20px", color: "#FF6347" }}
        >
          Are you sure you want to logout?
        </Typography>
        <Typography
          sx={{ marginBottom: "30px", color: "#555" }}
        >
          You will need to log in again to access your account.
        </Typography>
        <Box sx={{ display: "flex", gap: "15px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#FF6347",
              "&:hover": { backgroundColor: "#FF4500" },
            }}
          >
            Logout
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              color: "#FF6347",
              borderColor: "#FF6347",
              "&:hover": {
                backgroundColor: "rgba(255, 99, 71, 0.1)",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LogoutPage;
