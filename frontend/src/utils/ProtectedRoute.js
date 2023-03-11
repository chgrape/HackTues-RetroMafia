import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Replace with your authentication logic
    
    useEffect(async ()=>{
        const res = await axios.get("http://localhost:8080/authentication")
        if(res.data.hasOwnProperty('authenticated')){
            setIsAuthenticated(res.data.authenticated)
        }
        console.log(isAuthenticated)
    }, [])

    return (
      isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    );
  }

export default ProtectedRoute