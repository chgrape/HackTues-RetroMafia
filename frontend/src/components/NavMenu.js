import React, {useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import InfoIcon from '@mui/icons-material/Info';
import { Typography, Menu, MenuItem, MenuList, Divider } from '@mui/material';

function NavMenu(props){
    

    return(
        <Menu id="dropdown" anchorEl={props.open} open={props.anchor} onClose={props.closeHandler} PaperProps={{
            sx: {width:230, maxWidth: "100%"}
         }}>
             <MenuList>
                 <MenuItem onClick={props.closeHandler}>
                     <AccountCircleIcon sx={{pr: 2}} />
                     <Typography variant="inherit">Profile</Typography>
                 </MenuItem>
                 <Divider />
                 <MenuItem onClick={props.closeHandler}>
                     <PasswordIcon sx={{pr: 2}} />
                     <Typography variant="inherit">Passwords</Typography>
                 </MenuItem>
                 <Divider />
                 <MenuItem onClick={props.closeHandler}>
                     <InfoIcon sx={{pr: 2}} />
                     <Typography variant="inherit">About</Typography>
                 </MenuItem>
             </MenuList>
         </Menu>
    );
}

export default NavMenu;