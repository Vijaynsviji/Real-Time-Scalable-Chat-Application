


import React from 'react'
import { debounce } from '../../../../utils/HelperFunctions';
import { apiBaseUrl } from '../../../../config/api';
import axios from 'axios';
import InputComp from '../../../UI/InputComp/InputComp';
import type { ContactCardProp } from '../contactlist';


interface NewChat{
  setSearchedContact: React.Dispatch<React.SetStateAction<ContactCardProp[]>>
}

function NewChat({setSearchedContact}:NewChat) {
    const [searchValue,setSearchValue] = React.useState("");
    const debounceSearch = React.useMemo(()=>debounce(handleSearch,1000),[]);


    async function handleSearch (value:string){
        try{
            const response = await axios.get(apiBaseUrl + "/users",{params:{
                email:value
            }});
            if(response.status==200){
                const data = response?.data?.data;
                const dataToList= typeof data=="object" ? [data] : data;
                const contactUser:ContactCardProp[]  = dataToList?.map((item:any)=>{
                    return {
                        id: item?.user_id,
                        isOnline: "",
                        email:item?.email,
                        Name: item?.first_name,
                        unReadMessageCount: 0,
                        lastMessage: "",
                        lastMessageDate: null
                    }
                })
                setSearchedContact(contactUser);
            }

        }catch(e){
            console.error(e);
            setSearchedContact([]);
        }
    }  

    const handleType = (value:string)=>{
        debounceSearch(value);
        setSearchValue(value);
    }
    return (
      <div className='p-[20px] border-b border-[var(--border)]'>
          <InputComp  handleChange={handleType} value={searchValue}  placeHolder='Search Conversation' inputType='text' hideLable={true}/>
      </div>
    );
}

export default NewChat;