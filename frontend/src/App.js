import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Navbar from "./components/Navbar"
import PassPage from "./components/PassPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";

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
          <Route path="/passwords" element={<PassPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
  );
}

export default App;
