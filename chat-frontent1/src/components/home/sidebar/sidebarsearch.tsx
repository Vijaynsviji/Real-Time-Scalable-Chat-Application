

import React from 'react';
import InputComp from '../../UI/InputComp/InputComp';

interface SideBarSearch{
  debounceSearch: (value:string)=>void
}


function SideBarSearch({debounceSearch}:SideBarSearch) {
    const [searchValue,setSearchValue] = React.useState("");
  
    const handleChange = (value:string)=>{
      setSearchValue(value);
      debounceSearch(value);
    }
  return (
    <div className='p-[20px] border-b border-[var(--border)]'>
        <InputComp  handleChange={handleChange} value={searchValue}  placeHolder='Search Conversation' inputType='text' hideLable={true}/>
    </div>
  )
}

export default SideBarSearch