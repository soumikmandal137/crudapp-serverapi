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

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
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

  const onSubmitdata = (data) => {
    console.log({ ...data, photo });
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: "",
      lastname:"",
      email: "",
      password: "",
      profilepicture:"",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (!fetchdata?.some((value) => value.email === data.email)) {
        await API.post("/users", data);
        alert("User signed up successfully!");
        navigate("/login");
        reset();
        setfetchdata([]);
      } else {
        alert("This email is already registered.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchdataFromAPI = async () => {
      try {
        const response = await API.get("/users");
        setfetchdata(response?.data || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchdataFromAPI();
  }, []);

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
            {...register("firstname")}
            error={!!errors.firstname}
            helperText={errors.firstname?.message}
          />


        <TextField
            label="Lastname"
            type="text"
            fullWidth
            margin="normal"
            {...register("lastname")}
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
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
