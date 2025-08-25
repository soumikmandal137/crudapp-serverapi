import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../../api/Axiosintance";

const Product = () => {
  const navigate = useNavigate();
  const [productList, setproductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewDetails, setViewDetails] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await API.get("/products");
        setproductList(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      await API.delete(`/products/${deleteId}`);
      setproductList(productList.filter((item) => item.id !== deleteId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Product List
      </Typography>

      {!isLoading ? (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Image</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productList?.map((value) => (
                <TableRow key={value.id}>
                  <TableCell>{value.id}</TableCell>
                  <TableCell>{value.title}</TableCell>
                  <TableCell>{value.description}</TableCell>
                  <TableCell>
                    {value.image && (
                      <img
                        src={value.image}
                        alt={value.title}
                        width={50}
                        height={50}
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => navigate(`/admin/edit/${value.id}`)}>
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => {
                        setOpenDialog(true);
                        setDeleteId(value.id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      onClick={() => {
                        setOpenViewDialog(true);
                        setViewDetails(value);
                      }}
                    >
                      <RemoveRedEye />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Title: {viewDetails?.title}</Typography>
            <Typography>Description: {viewDetails?.description}</Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete();
              setOpenDialog(false);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
