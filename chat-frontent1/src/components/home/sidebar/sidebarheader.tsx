



import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import AddCommentIcon from '@mui/icons-material/AddComment';
import type { ContactCardProp } from './contactlist';

interface SideBarHeader{
  showSearchContact: boolean,
  handleCloseNewContact: ()=>void
}

function SideBarHeader({showSearchContact,handleCloseNewContact}:SideBarHeader) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = () => {
    navigate('/profile')
    setAnchorEl(null);
  };
  const handleLogOutClick = ()=>{
    navigate("/signin");
    setAnchorEl(null);

  }
  return (
    <div className=' border-b-[2px] border-[var(--border)] flex justify-between items-center h-25 p-[20px]'>
      <h2 className='text-3xl font-bold'>{!showSearchContact ? "Message": "New Contact" }</h2>

      <div className='flex gap-[10px] items-center'>
        <IconButton onClick={handleCloseNewContact}>
      <AddCommentIcon   />
      </IconButton>

       <IconButton onClick={handleClick} aria-label="more">
        <MoreVertIcon />
      </IconButton>
      </div>



       <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={()=>{setAnchorEl(null)}}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleMenuItemClick}>
          <div className='flex gap-[10px] text-1xl'>

            <AccountCircleIcon sx={{fontSize:'30px'}} />Profile
          </div>
        </MenuItem>
        <MenuItem onClick={handleLogOutClick}>
          <div className=' flex gap-[10px] text-1xl'>

            <LogoutIcon sx={{fontSize:'30px'}}/>  Logout
          </div>
        </MenuItem>
      </Menu>

     
    </div>
  )
}

export default SideBarHeader