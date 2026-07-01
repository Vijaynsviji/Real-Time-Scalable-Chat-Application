import router from 'express';
import * as userController from './UserController.js';


const userRouter = router();


userRouter.get("/users",userController.getUsers);
userRouter.post("/user/:user_id",userController.updateUserPublicKey);


export default userRouter;