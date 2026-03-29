import React from 'react'
import InputComp from './InputComp'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface CustomInputComp{ 
    inputValue: string,
    inputType: React.HTMLInputTypeAttribute | undefined,
    handleChange: (newValue:string)=>void
}

function CustomInputComp({inputValue,inputType,handleChange}: CustomInputComp) {
  return (
    <div className='flex-1 gap-[20px] flex items-center border border-solid border-[var(--border)] rounded-[10px] px-[20px]'>
        <input value={inputValue} type={inputType} onChange={(e)=>{handleChange(e.target.value)}} className={"border-none focus-visible:outline-none " + "bg-[var(--input-bg)] flex-1 text-xl text-[var(--primary-text)] p-[10px] border-solid rounded-[10px] h-[60px]"} />
        <SentimentSatisfiedAltIcon />
        <MoreHorizIcon />
    </div>
  )
}

export default CustomInputComp