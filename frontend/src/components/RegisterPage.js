import { TextField, Typography, Box, Button, Card, Grid, InputAdornment, Backdrop } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

function RegisterPage() {
    const [open, setOpen] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConf, setPassConf] = useState('');
    const [hasError, setHasError] = useState(0);
    const [hasErrorPass, setHasErrorPass] = useState(0);
    const [hasErrorPassConf, setHasErrorPassConf] = useState(0);
    const [errMsg, setErrMsg] = useState('');
    const regex = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;
    const regexEmail = /\S+@\S+\.\S+/;

    const handleEmail = event =>{
        setEmail(event.target.value)
    }

    const handlePass = event =>{
        setPass(event.target.value)
    }

    const handlePassConf = event =>{
        setPassConf(event.target.value)
    }

    const  handleSubmit = async (event) =>{
        event.preventDefault()

        setPass('')
        setEmail('')
        setPassConf('')

        if(hasError === 1 || hasErrorPass === 1 || hasErrorPassConf === 1){
            setErrMsg('Invalid email or password');
        }else{
            //setOpen(true);
            setErrMsg('');
        const response = axios.post("http://localhost:8080/user", {email, pass})
        }
    }

    useEffect(()=>{
        if(regexEmail.test(email)){
            setHasError(0);
        }else{
            setHasError(1);
        }
    }, [email])

    useEffect(()=>{
        if(regex.test(pass)){
            setHasErrorPass(0);
        }else{
            setHasErrorPass(1);
        }
    }, [pass])

    useEffect(()=>{
        if(passConf === pass || passConf == ''){
            setHasErrorPassConf(0);
        }else{
            setHasErrorPassConf(1);
        }
    }, [passConf])

    useEffect(()=>{
        setHasError(0);
        setHasErrorPass(0);
        setHasErrorPassConf(0);
    }, [])

    

    return (
        <>
        <Grid direction="column" alignItems="center" justify="center">
            <Card>
                <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <Typography variant="h2" sx={{p:5}}>Register</Typography>
                    
                    <TextField sx={{width: 230}} error={hasError} helperText={hasError ? "Invalid email" : undefined} required label="E-mail" value={email} id="email-form" margin="normal" onChange={handleEmail}></TextField>
                    <TextField sx={{width: 230}} 
                                error={hasErrorPass} 
                                helperText={hasErrorPass ? "Password must contain  number and 1 special character" : undefined} 
                                required 
                                label="Password" 
                                value={pass} 
                                id="password-form" 
                                margin="normal" 
                                type={showPass? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {showPass ? <VisibilityOffIcon onClick={(e) => {setShowPass(false)}} /> : <RemoveRedEyeIcon onClick={(e)=>setShowPass(true)} />}
                                      </InputAdornment>
                                    ),
                                  }}
                                onChange={handlePass}></TextField>
                    <TextField sx={{width: 230}}
                                error={hasErrorPassConf} 
                                helperText={hasErrorPassConf ? "Passwords must be the same" : undefined} 
                                required 
                                label="Repeat password" 
                                value={passConf} 
                                type={showPass? "text" : "password"}
                                id="repeat-form" 
                                margin="normal" onChange={handlePassConf}>
                    </TextField>

                    <Typography sx={{color: "red"}}>{errMsg? errMsg : undefined}</Typography>

                    <Button sx={{p:5, fontSize:16}} onClick={handleSubmit}>Register</Button>
                    
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={()=>{setOpen(false)}}>
                        <Card>
                        <Typography>QR Code goes here</Typography>
                        </Card>
                    </Backdrop>
                        
                    <Typography sx={{pr:3, pb:5}}>Already have an account? <Typography component={Link} to={"/login"}>Log in!</Typography></Typography>
                </Box>
            </Card>
            </Grid>
        </>
    )
}

export default RegisterPage