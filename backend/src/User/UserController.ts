import * as userService from './UserService.js';

export const getUsers = async (req:any,res:any)=>{
    try{
        if(!req || !res) return null;
        
        const requestedEmail = req.query.email;
        console.log(requestedEmail);
        if(!requestedEmail){
           return  res.status(404).json({
                message: "Please enter email to get users!!",
                data:null
            })
        }

        const response =await userService.getUser(requestedEmail);
        console.log(response);
        
        return res.status(response.statusCode).json({
            message: response.statusText,
            data: response.data
        })


    }catch(e){
        console.error("Error in getUsers" + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        })
    }
}

export const updateUserPublicKey = async (req:any, res:any)=>{
    try{
        if(!req || !res) return null;

        const userId = req.params.user_id;

        if(!userId){
            return res.status(500).json({
                message: "Please Give Valid User Id",
                data: null
            }) 
        }

        const publicKey = req.body?.publicKey;

        if(!publicKey){
            return res.status(500).json({
                message: "Please Give public Key also",
                data: null
            })
        }

        const response = await userService.updateUserPublicKey(userId,publicKey);
        return res.status(response?.statusCode).json({
            message: response?.statusText,
            data: response?.data
        })
    }catch(e){
        console.error("Erro in updateUserPublicKey " + e);
        return res.status(500).json({
            message: "Some thing went wrong",
            data: null
        }) 
    }
}