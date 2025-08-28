import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import theme from "./theme/Theme";
import Route from "./route/Routes"
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const client =new QueryClient()


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right"/>
      <QueryClientProvider client={client}>
      <RouterProvider router={Route}/>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;