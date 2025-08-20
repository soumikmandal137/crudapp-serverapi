import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import theme from "./theme/Theme";
import Route from "./route/Routes"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={Route}/>
    </ThemeProvider>
  );
}

export default App;