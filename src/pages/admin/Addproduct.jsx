import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/Axiosintance";
import { toast } from "sonner";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const Addproduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
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
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (photo) {
        formData.append("image", photo);
      }
      const response = await API.post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response", response);
      if (response?.status === 200) {
        toast(response?.data?.message);
        reset();
        setPhoto(null);
        setPhotoURL("");
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
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
        {id ? "UPDATE" : "SAVE"}
      </Button>
    </Box>
  );
};

export default Addproduct;
