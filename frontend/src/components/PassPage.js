import { Typography } from '@mui/material'
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

    useEffect(()=>{
        fetchPasswords()
    }, [])

    return (
        <>
            <Typography sx={{display:"flex", justifyContent:"center", fontSize: 20, p:5}}>Password page</Typography>
            
            {passwords.map((pass)=>{return <Typography key={pass.id} variant="h5" sx={{display:"flex", justifyContent:"center"}} >Password for {pass.title} - {pass.userId}</Typography>})}
        </>
    )
}

export default PassPage