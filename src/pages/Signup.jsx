import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Avatar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import API from "../api/Axiosintance";
import { toast } from "sonner";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  first_name: yup.string().required("Firstname is required"),
  last_name: yup.string().required("Lastname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchdata, setfetchdata] = useState([]);

  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      profile_pic: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data);

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (photo) {
        formData.append("profile_pic", photo);
      }

      const response = await API.post("/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response", response)
      if(response?.status === 200){
      toast(response?.data?.message);
      Cookies.set("token", response.data.token,{
        expires: 3,
        sameSite: "strict"
      })
      reset();
      setPhoto(null);
      setPhotoURL("");
      setTimeout(() => {
        navigate("/admin/list");
      }, 2000);
    }else{
       toast(response?.data?.message);
    }
    } catch (error) {
      toast(error?.response?.data?.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9f9f9",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="FirstName"
            fullWidth
            margin="normal"
            {...register("first_name")}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />

          <TextField
            label="Lastname"
            type="text"
            fullWidth
            margin="normal"
            {...register("last_name")}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
            <Avatar
              src={photoURL}
              alt="Student"
              sx={{ width: 100, height: 100, mr: 2 }}
            />
            <Button component="label" variant="outlined">
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </Button>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
