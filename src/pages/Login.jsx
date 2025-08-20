import React from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputLabel,
  Link
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/Axiosintance"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

  

const Login = () => {
  
const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


const onSubmit = async (data) => {
    try {
       const response = await API.get(`/users?email=${data.email}`);
      if (response.data.length === 0) {
        alert("No account found. Please sign up first.");
        navigate("/signup");
        return;
      }

      const user = response.data[0];
      if (user.password === data.password) {
        localStorage.setItem("loginData", JSON.stringify(user));
        alert("Login successful!");
        navigate("/admin/list");
      } else {
        alert("Password does not match");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };




  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel>Email</InputLabel>
          <TextField
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <InputLabel>Password</InputLabel>
          <TextField
            fullWidth
            type="password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
      <Link href="/signup" underline="hover">
  Sign up
</Link>
        </Typography>
      </Paper>
    </Box>
  )
}

export default Login