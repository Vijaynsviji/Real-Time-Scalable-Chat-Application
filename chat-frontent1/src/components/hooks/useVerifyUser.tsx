



import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl, wsAPIBaseURL } from '../../config/api';
import { useDispatch } from 'react-redux';
import { setCurrentUser, type CurrentUser } from '../../store/slicers/users';

function useVerifyUser() {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [socketObject,setSocketObject] = React.useState<WebSocket | null>(null);
    const dispatch = useDispatch();

    const validateUser = async(token:string)=>{
        try{
            if(!token){
                navigate('/signin');
                return;
            }

            const response = await axios.post(apiBaseUrl + "/verify",{ token: token});

            if(response.status!=200){
                navigate('/signin');
            }

            const socket = new WebSocket(`${wsAPIBaseURL}?token=` + token);

            if(socket){
                setSocketObject(socket);
            }
            const currentUser = response?.data;
            dispatch(setCurrentUser(currentUser?.data));
        }catch(e){
            console.error(e);
            navigate('/signin');
            return;
        }
    }

    React.useEffect(()=>{
        validateUser(token || "");
    },[]);

  return {validateUser,socketObject};
}

export default useVerifyUser;