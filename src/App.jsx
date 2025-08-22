import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import theme from "./theme/Theme";
import Route from "./route/Routes"
import { Toaster } from 'sonner';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right"/>
      <RouterProvider router={Route}/>
    </ThemeProvider>
  );
}

export default App;