import { TextField, Typography, Box, Button, Card, Grid } from '@mui/material'
import React, { useState } from 'react'

function ProfilePage() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [hasError, setHasError] = useState(0);
    const [hasErrorPass, setHasErrorPass] = useState(0);
    const regex = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;

    const handleEmail = event =>{
        setEmail(event.target.value)
        if(!email.toLowerCase().match('@')){
            setHasError(1);
        }else{
            setHasError(0);
        }
    }

    const handlePass = event =>{
        setPass(event.target.value)
        if(regex.test(pass)){
            setHasErrorPass(0);
        }else{
            setHasErrorPass(1);
        }
    }

    const handleSubmit = event =>{
        event.preventDefault()

        setPass('')
        setEmail('')

        console.log(email, pass);
    }

    return (
        <>
        <Grid direction="column" alignItems="center" justify="center" xs={3} sm={6}>
            <Card>
                <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <Typography variant="h2" sx={{p:5}}>Login</Typography>
                    
                    <TextField sx={{width: 230}} error={hasError} helperText={hasError ? "Invalid email" : undefined} required label="E-mail" value={email} id="email-form" margin="normal" onChange={handleEmail}></TextField>
                    <TextField sx={{width: 230}} error={hasErrorPass} helperText={hasErrorPass ? "Password must contain  number and 1 special character" : undefined} required label="Password" value={pass} id="password-form" margin="normal" onChange={handlePass}></TextField>

                    <Button sx={{p:5}} onClick={handleSubmit}>Submit</Button>
                </Box>
            </Card>
            </Grid>
        </>
    )
}

export default ProfilePage