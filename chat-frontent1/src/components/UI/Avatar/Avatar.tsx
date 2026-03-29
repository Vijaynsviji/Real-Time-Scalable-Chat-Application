

import React from 'react';
import Avatar from '@mui/material/Avatar';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { Badge } from '@mui/material';

interface AvatarComp {
  size: SxProps<Theme> | undefined,
  isOnline?: Boolean,
  text?: string,
  image?: string
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    color: 'var(--primary-text-600)',
  //   boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  //   '&::after': {
  //     position: 'absolute',
  //     width: '100%',
  //     height: '100%',
  //     borderRadius: '50%',
  //     animation: 'ripple 1.2s infinite ease-in-out',
  //     border: '1px solid currentColor',
  //     content: '""',
  //   },
  // },
  // '@keyframes ripple': {
  //   '0%': {
  //     transform: 'scale(.8)',
  //     opacity: 1,
  //   },
  //   '100%': {
  //     transform: 'scale(2.4)',
  //     opacity: 0,
  //   },
  },
}));


function AvatarComp({text, size, isOnline=false ,image}: AvatarComp) {
  return (
    <div>
      {isOnline && <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar sx={size} alt="Remy Sharp" src={image} >{text}</Avatar>
      </StyledBadge>}
      {!isOnline && <Avatar sx={size} alt="Remy Sharp" src={image} >{text}</Avatar>}
    </div>
  )
}

export default AvatarComp;