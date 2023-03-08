import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Navbar from "./components/Navbar"
import PassPage from "./components/PassPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const theme = createTheme({
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
        <BrowserRouter>
          <Routes>
              <Route path="/passwords" element={<PassPage />} />
              {/* <Route path="profile" element={<ProfilePage />} />
              <Route path="about" element={<AboutPage />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
