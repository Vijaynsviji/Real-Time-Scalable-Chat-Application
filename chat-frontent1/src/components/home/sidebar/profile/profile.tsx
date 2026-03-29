

import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AvatarComp from '../../../UI/Avatar/Avatar';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ButtonComp from '../../../UI/ButtonComp/ButtonComp';

function ProfileComp() {
    const navigate = useNavigate();

    const handleBackClick = ()=>{
        navigate(-1);
    }
  return (
    <div className="bg-[var(--light-color-100)] box-border">
        <div className="border-[2px] box-border border-solid border-[var(--border)] h-[calc(100vh-40px)] m-[20px] rounded-[20px] grid grid-cols-[1fr_2fr]">
            <div className="box-border flex flex-col overflow-hidden border-r-[2px] border-[var(--border)]">
                    <div className='text-3xl p-[15px] flex justify-between  border-b border-solid border-[var(--border)]'>
                        Profile
                       <IconButton onClick={handleBackClick} ><ArrowBackIosIcon  /></IconButton> 
                        </div>
                    <div className='flex flex-col p-[15px] gap-[30px]'>
                        <div className='flex justify-center'>
                            <AvatarComp size={{width:'120px',height: '120px'}}  /> 
                        </div>
                        <div className='flex flex-col'>
                            <p>Name</p>
                            <TextField
                            // slotProps={
                                
                            // }
                             id="standard-basic"  
                             variant="standard" />
                        </div>
                        <div className='flex flex-col'>
                            <p>Email</p>
                            <TextField id="standard-basic"  variant="standard" />
                        </div>

                        <div>
                            <ButtonComp fontSize='1xl' name="Save" />
                        </div>
                    </div>
            </div>
            <div className="box-border flex flex-col justify-center items-center  overflow-y-hidden">
                <AccountCircleIcon sx={{fontSize: '100px'}} />
                <p className='text-3xl'>Profile</p>
            </div>
        </div>
    </div>
  )
}

export default ProfileComp