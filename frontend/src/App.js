import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Navbar from "./components/Navbar"
import PassPage from "./components/PassPage";
import { Routes, Route} from 'react-router-dom'
import Home from "./components/Home";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const theme = createTheme({
    typography:{
      fontFamily: ['Monsterrat', 'sans-serif'].join(','),
      fontWeight: "light"
    },

    palette:{
        primary:{
            main: '#303030',
        },
        secondary:{
            main: '#0066FF',
        }
    }
  })
  
  return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
           <Route path="/passwords" element={<PassPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
  );
}

export default App;
