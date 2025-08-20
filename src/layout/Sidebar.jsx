import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/list">
            <ListItemText primary="Product List" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/add">
            <ListItemText primary="Add Product" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
