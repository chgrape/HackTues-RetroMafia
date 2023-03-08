import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const url = 'https://jsonplaceholder.typicode.com/posts'

function PassPage() {
    const [passwords, setPasswords] = useState([]);

    const fetchPasswords = async () =>{
        const response = await fetch(url,{
            method: "GET",
        });
        const data = await JSON.stringify(response);
        console.log(data);
    }



    return (
        <>
            <Typography variant="h1" onClick={fetchPasswords}>Fetch</Typography>
        </>
    )
}

export default PassPage