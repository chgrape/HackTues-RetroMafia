import React, {useState} from 'react'
import DehazeIcon from '@mui/icons-material/Dehaze'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import NavMenu from './NavMenu';

function Navbar() {
    const [open, setOpen] = useState(false);
    const anchor = Boolean(open);

    const handleClick = event =>{
        setOpen(event.currentTarget)
    }

    const handleClose = event =>{
        setOpen(null)
    }

    return (
        <div>
            <Box sx={{flexGrow:1}}>
                <AppBar color="primary" position="sticky">
                    <Toolbar>
                        <Typography  sx={{flexGrow:1}}>RETRO MAFIA</Typography>
                        <IconButton size="large" color="inherit" id="dropdown-button" onClick={handleClick}
                                    aria-control={anchor ? 'dropdown' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={anchor ? "true" : undefined}
                                    sx={{mr:10}}>
                            <DehazeIcon />
                        </IconButton>
                        <NavMenu closeHandler={handleClose} open={open} anchor={anchor} />
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}

export default Navbar;
  