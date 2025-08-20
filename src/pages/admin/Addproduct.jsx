import { schema } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import * as yup from "yup";

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  title: yup.string().required("Name is required"),
  description: yup.string().email("Invalid email").required("Email is required"),
});

const Addproduct = () => {
const navigate = useNavigate();
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
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",

    },
  });






    const onSubmit = async (data) => {
    try {
      if (id) {
        await API.put(`/students/${id}`, data);
        alert("Student updated successfully");
      } else {
        await API.post("/students", data);
        alert("Student added successfully");
      }
      reset();
      navigate("/admin/list");
    } catch (error) {
      console.error(error);
      alert("Error saving student");
    }
  };



  return (
  <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
       Add Product
      </Typography>

      <Box sx={{ display: "flex", gap: 4 }}>
        <TextField
          label="Title"
          fullWidth
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Description"
          fullWidth
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Box>



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

<Button fullWidth type="submit" variant="contained" >
        { "SAVE"}
      </Button>


      </Box>
  )
}

export default Addproduct;