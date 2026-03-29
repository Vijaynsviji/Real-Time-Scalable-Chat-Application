import React from "react";
import ContactList, { type Contact, type ContactCardProp } from "./contactlist";
import SideBarHeader from "./sidebarheader";
import SideBarSearch from "./sidebarsearch";
import { debounce } from "../../../utils/HelperFunctions";
import axios from "axios";
import { apiBaseUrl } from "../../../config/api";
import NewChat from "./newchat/newchat";
import { staticContactData } from "./sidebardata";


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


    const handleCloseNewContact = ()=>{
        setShowSearchContact(prev=>!prev);
        setSearchedContact([]);
    }
 
    return (<>
        <SideBarHeader showSearchContact={showSearchContact} handleCloseNewContact={handleCloseNewContact} />
        {!showSearchContact&&<SideBarSearch debounceSearch={debounceSearch} />}
        {showSearchContact && <NewChat setSearchedContact={setSearchedContact}/>}

        <ContactList selectedContact={selectedContact} handleChangeSelectedContact={handleChangeSelectedContact} allUserConverations={staticContactData} /> 
    </>
    );
}