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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import API from "../../api/Axiosintance";
import { RemoveRedEye } from "@mui/icons-material";

const Product = () => {
   const [studentList, setstudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    const [openviewDialog, setOpenviewDialog] = useState(false);
      const [viewDetails, setViewDetails] = useState({});
      const [openDialog, setOpenDialog] = useState(false);


        const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    
 <Box>
      <Typography variant="h5" gutterBottom>
        Student List
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
              {studentList?.map((value) => (
                <TableRow key={value.id}>
                  <TableCell>{value.id}</TableCell>
                  <TableCell>{value.title}</TableCell>
                  <TableCell>{value.description}</TableCell>
                
                  <TableCell>
                    {value.image && (
                      <img
                        src={value.image}
                        alt={value.name}
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
                        setDeleteid(value.id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>

                    <Button
                      onClick={() => {
                        setOpenviewDialog(true);
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

      <Dialog
        open={openviewDialog}
        onClose={() => setOpenviewDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Student Details</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>
            Name: {viewDetails?.name}
</Typography>
            Email:{viewDetails?.email}
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              handledelete();
              handleCloseDialog();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>


  )
}

export default Product