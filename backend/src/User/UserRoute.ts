import router from 'express';
import * as userController from './UserController.js';


const userRouter = router();


userRouter.get("/users",userController.getUsers);


export default userRouter;