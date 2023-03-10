import { Button, Card, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false);

    const nav = useNavigate();

    const handleLogin = async () => {
      const res = await axios.post("http://localhost:8080/login", { email, pass})
      console.log(res.data)
    }

    const validateCookie = async () =>{
      const res = await axios.get("http://localhost:8080/checkcookie", {withCredentials: true})
      const data = await res.json();
      console.log(data.msg)
    }

  return (
    <Grid direction="column" alignItems="center" justify="center">
        <Card>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Typography variant="h2" sx={{p:5}}>Login</Typography>
                <TextField sx={{width: 230}} required label="E-mail" value={email} id="email-form" margin="normal" onChange={(e)=>setEmail(e.target.value)}></TextField>
                <TextField sx={{width: 230}} required label="Password" value={pass} id="password-form" margin="normal" onChange={(e)=>setPass(e.target.value)}
                type={showPass? "text" : "password"}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPass ? <VisibilityOffIcon onClick={(e) => {setShowPass(false)}} /> : <RemoveRedEyeIcon onClick={(e)=>setShowPass(true)} />}
                      </InputAdornment>
                    ),
                  }}></TextField>
                <Button sx={{p:5, fontSize: 16}} onClick={handleLogin}>Login</Button>
                <Button sx={{p:5, fontSize: 16}} onClick={validateCookie}>Validate</Button>
                <Typography sx={{pr:3, pb:5}}>Don't have an account? <Typography component={Link} to={"/register"}>Sign up!</Typography></Typography>
            </Box>
        </Card>
    </Grid>
  )
}
export default LoginPage