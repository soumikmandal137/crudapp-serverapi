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
import TableComponent from "../../components/Tablecomponents";
import { productList } from "../../hooks/reactquery/useProducts";
import { Edit, Delete } from '@mui/icons-material';



const Product = () => {
  const navigate = useNavigate();
  // const [productList, setproductList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewDetails, setViewDetails] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page,setPage] = useState(1);
    const [isDeleting, setIsDeleting] = useState(false);



  const handleEdit = (id) => navigate(`/admin/edit/${id}`);
  


const perpage=5


const { data, isLoading, isError, error } = productList(page, perpage);
const products =data?.data
const totalPages =data?.totalPages
console.log("data",data);


  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setIsLoading(true);
  //     try {
  //       const res = await API.get("/products", { page, perpage });
  //       console.log("res", res);

  //       setproductList(res.data);
  //     } catch (err) {
  //       console.error("Error fetching products:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  // const handleDelete = async () => {
  //   try {
  //     await API.delete(`/products/${deleteId}`);
  //     setproductList(productList.filter((item) => item.id !== deleteId));
  //   } catch (err) {
  //     console.error("Delete failed:", err);
  //   }
  // };


const columns = [
  { field: "_id", headerName: "ID" },
  { field: "title", headerName: "Title" },
  { field: "description", headerName: "Description" },
  { field: "status", headerName: "Status" },
];


  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await API.delete(`/products/remove${deleteId}`);

    
      queryClient.invalidateQueries(["products"]);

      console.log("Deleted product:", deleteId);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };




  const renderActions = (row) => (
    <>
      <Edit
        color="primary"
        style={{ cursor: 'pointer', marginRight: 8 }}
        onClick={() => handleEdit(row._id)}
      />
      <Delete
        color="error"
        style={{ cursor: isDeleting ? 'not-allowed' : 'pointer' }}
        onClick={() => handleDelete(row._id)}
      />
    </>
  );





  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Product List
      </Typography>

      {/* {!isLoading ? (
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
      )} */}



<TableComponent
        columns={columns}
        rows={products}
        actions={renderActions}
        page={page}
        totalPages={totalPages}
        onPageChange={(_, value) => setPage(value)}
        loading={isDeleting}
      />



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
