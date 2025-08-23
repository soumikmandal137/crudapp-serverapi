import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputLabel,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/Axiosintance";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import { toast } from "sonner";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await API.post("/user/signin", data);
      console.log(response);

      if (response?.status === 200) {
        toast(response?.data?.message);
        Cookies.set("token", response.data.token, {
          expires: 3,
          sameSite: "strict",
        });
        reset();
        setTimeout(() => {
          navigate("/admin/list");
        }, 2000);
      } else {
        toast(response?.data?.message);
      }
    } catch (error) {
      toast(error?.response?.data?.message);
    } finally {
      setLoading(false);
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

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Login..." : "Login"}
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
  );
};

export default Login;