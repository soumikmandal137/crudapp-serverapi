
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";


const Wrapper = () => {
 
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
   
      <Box sx={{ width: "240px", bgcolor: "#f4f4f4" }}>
        <Sidebar />
      </Box>

   
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Wrapper;
