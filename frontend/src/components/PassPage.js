import { Typography, Button } from '@mui/material'
import Navbar from './Navbar';
import React, { useEffect, useState } from 'react'

const url = 'https://jsonplaceholder.typicode.com/posts'

function PassPage() {
    const [passwords, setPasswords] = useState([]);

    const fetchPasswords = async () =>{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setPasswords(data);
    }

    return (
        <>
            <Button sx={{p:10}} variant="h1" onClick={fetchPasswords}>Fetch</Button>
            {passwords.map((pass)=>{return <Typography key={pass.id} variant="h5" >Password for {pass.title} - {pass.userId}</Typography>})}
        </>
    )
}

export default PassPage