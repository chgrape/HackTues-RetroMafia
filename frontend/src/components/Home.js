import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import Navbar from './Navbar'

function Home() {
  return (
    <>
      <Container maxWidth="sm">
        <Typography marginTop="40px" align="center" variant="h2" gutterBottom>Home</Typography>
        <Typography align="center" variant="h5" color="textSecondary">Retro Mafia is a password manager that uses Machine Learning thechnology to recommened strong passwords for your accounts and brings all your profiles' passwords in one accessible place.</Typography>
      </Container>
    </>
  )
}

export default Home