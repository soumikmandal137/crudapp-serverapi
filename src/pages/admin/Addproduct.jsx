import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/Axiosintance";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const Addproduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [editData, setEditData] = useState({});


      useEffect(() => {
    const fetchIdData = async () => {
      setLoading(true);
      try {
        const response = await API.get(`/products/${id}`);
        console.log(response);
        setEditData(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdData();
  }, []);

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

  const handleCheckboxChange = (event, fieldName) => {
    const currentValues = watch(fieldName) || [];
    if (event.target.checked) {
      setValue(fieldName, [...currentValues, event.target.name]);
    } else {
      setValue(
        fieldName,
        currentValues.filter((val) => val !== event.target.name)
      );
    }
  };

  useEffect(() => {
    if (id) {
      const fetchIdData = async () => {
        setLoading(true);
        try {
          const response = await API.get(`/products/${id}`);
          setEditData(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchIdData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      API.get(`/products/${id}`)
        .then((res) => {
          setEditData(res.data);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to fetch product data");
        });
    }
  }, [id]);

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
        await API.put(`/products/${id}`, data);
        alert("product updated successfully");
      } else {
        await API.post("/products", data);
        alert("product added successfully");
      }
      reset();
      navigate("/admin/list");
    } catch (error) {
      console.error(error);
      alert("Error saving product");
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      Object.keys(editData).forEach((key) => {
        // console.log(key, editData[key]);
        setValue(key, editData[key]);
      });
    }
  }, [editData, setValue]);

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
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
        {id ? "UPDATE" : "SAVE"}
      </Button>
    </Box>
  );
};

export default Addproduct;

















