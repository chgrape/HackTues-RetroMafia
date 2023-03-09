import React, {useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import InfoIcon from '@mui/icons-material/Info';
import { Typography, Menu, MenuItem, MenuList, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

function NavMenu(props){
    

    return(
        <Menu id="dropdown" anchorEl={props.open} open={props.anchor} onClose={props.closeHandler} PaperProps={{
            sx: {width:230, maxWidth: "100%"}
         }}>
             <MenuList>
                    <MenuItem component={Link} to={"/"} onClick={props.closeHandler}>
                        <InfoIcon sx={{pr: 2}} />
                        <Typography variant="inherit">Home</Typography>
                    </MenuItem>
                <Divider />
                    <MenuItem component={Link} to={"/passwords"} onClick={props.closeHandler}>
                            <PasswordIcon sx={{pr: 2}} />
                            <Typography variant="inherit">Passwords</Typography>
                    </MenuItem>
                <Divider />
                <MenuItem component={Link} to={"/profile"} onClick={props.closeHandler}>
                    <AccountCircleIcon sx={{pr: 2}} />
                    <Typography variant="inherit">Profile</Typography>
                </MenuItem>
             </MenuList>
         </Menu>
    );
}

export default NavMenu;