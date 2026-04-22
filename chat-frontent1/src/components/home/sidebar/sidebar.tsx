import React from "react";
import ContactList, { type Contact, type ContactCardProp } from "./contactlist";
import SideBarHeader from "./sidebarheader";
import SideBarSearch from "./sidebarsearch";
import { debounce } from "../../../utils/HelperFunctions";
import axios from "axios";
import { apiBaseUrl } from "../../../config/api";
import NewChat from "./newchat/newchat";
import { staticContactData } from "./sidebardata";
import { useSelector } from "react-redux";


interface SideBar{
    selectedContact: Contact | null,
    handleChangeSelectedContact: (id:Contact | null)=>void
}


export default function SideBar({handleChangeSelectedContact,selectedContact}:SideBar) {
    const [searchValue,setSearchValue] = React.useState("");
    const debounceSearch = debounce(()=>{},500);
    const [searchedContact,setSearchedContact] = React.useState<ContactCardProp[]>([]);
    const [allUsers,setAllUsers] = React.useState([]);
    const [showSearchContact,setShowSearchContact] = React.useState(false);
    const currentUserDetails = useSelector((state:any)=> state?.user?.currentUser);


    const handleCloseNewContact = ()=>{
        setShowSearchContact(prev=>!prev);
        setSearchedContact([]);
    }

    React.useEffect(()=>{
        FetchAllConversation();
    },[currentUserDetails])

    /*
        1. The Below Function fetches all the Conversation of the current User (Based on Their Email or Id)
     */
    const FetchAllConversation = async ()=>{
        try{
            if(!currentUserDetails) return;
            const userId = currentUserDetails?.user_id || currentUserDetails?.data?.user_id;
            const response = await axios.get(`${apiBaseUrl}/conversations/${userId}`
        )

            if(response.status==200){
                const conversationList = response?.data;
                setSearchedContact(conversationList?.data);
            }
        }catch(e){
            console.error("Error in FetchAllConversation " + e);
            return [];
        }
    }


 
    return (<>
        <SideBarHeader showSearchContact={showSearchContact} handleCloseNewContact={handleCloseNewContact} />
        {!showSearchContact&&<SideBarSearch debounceSearch={debounceSearch} />}
        {showSearchContact && <NewChat setSearchedContact={setSearchedContact}/>}

        <ContactList selectedContact={selectedContact} handleChangeSelectedContact={handleChangeSelectedContact} allUserConverations={searchedContact} /> 
    </>
    );
}