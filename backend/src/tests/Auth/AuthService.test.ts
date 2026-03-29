import { afterEach, describe, expect, test, vi } from 'vitest';
import { userSignIn, userSignUp } from '../../Auth/AuthController.js';
import * as authRepo  from "../../Auth/AuthRepo.js";
import {signInUser, signupUser} from '../../Auth/AuthService.js';
import { GetReturnMessageObject } from '../../Utils/helperfunctions.js';
import { Status } from '../../Utils/types.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import "dotenv/config";


describe("Auth Service Tests", ()=>{

    describe("Sign Up User Tests",()=>{

        afterEach(() => {
                vi.clearAllMocks();
        });

        test("Valid User Infomration should return Obejct with 200 and Valid Response", async ()=>{

            const userID = uuidv4();
            const user: userSignUp = {
                first_name: "Vijay",
                last_name: " N S",
                email: "vijay@gmail.com",
                password: "123456"
            }

            const spy = vi.spyOn(authRepo, 'findUserPresentOrNot').mockReturnValue(new Promise((resolve)=>resolve(null)));
            const spySaveUser = vi.spyOn(authRepo, "saveUser").mockReturnValue(new Promise((resolve)=>resolve(
                {first_name: user?.first_name,last_name: user?.last_name, email: user?.email,user_id: userID}
            )));

            const Exprected = GetReturnMessageObject(200, Status.Success,{first_name: user?.first_name, last_name: user?.last_name, email: user?.email},"SignUp Success")

            const Actual = await signupUser(user);

            expect(Actual).toStrictEqual(Exprected);
            expect(spy).toHaveBeenCalled();
            expect(spySaveUser).toHaveBeenCalled();

        })

        test("User Info Already Present in Database, Should Return 404 and Valid Response", async ()=>{

            const userID = uuidv4();
            const user: userSignUp = {
                first_name: "Vijay",
                last_name: " N S",
                email: "vijay@gmail.com",
                password: "123456"
            }

            const spy = vi.spyOn(authRepo, 'findUserPresentOrNot').mockResolvedValue({
                ...user,user_id: userID, profileImageUrl: null, created_at: new Date(), 
            });
            const spySaveUser = vi.spyOn(authRepo, "saveUser").mockResolvedValue(
                {first_name: user?.first_name,last_name: user?.last_name, email: user?.email,user_id: userID}
            );

            const Exprected = GetReturnMessageObject(404, Status.Error,null,"User with given email present!");

            const Actual = await signupUser(user);

            expect(Actual).toStrictEqual(Exprected);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spySaveUser).toHaveBeenCalledTimes(0);

        })

        test("While Saving User Info Databse Crashed, Should return 500 and Valid Response", async()=>{
            const userID = uuidv4();
            const user: userSignUp = {
                first_name: "Vijay",
                last_name: " N S",
                email: "vijay@gmail.com",
                password: "123456"
            }

            const spy = vi.spyOn(authRepo, 'findUserPresentOrNot').mockResolvedValue(null);
            const spySaveUser = vi.spyOn(authRepo, "saveUser").mockResolvedValue(null);

            const Exprected =  GetReturnMessageObject(500, Status.Error,null,"Some thing went wrong!!!");

            const Actual = await signupUser(user);

            expect(Actual).toStrictEqual(Exprected);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spySaveUser).toHaveBeenCalledTimes(1);
        })

    })

    describe("Sign In User Tests", ()=>{

        afterEach(() => {
                vi.clearAllMocks();
        });

        test("Valid User Sign In User Info Should Return 200 and Valid Response", async ()=>{

            const userID = uuidv4();
            const saltRounds = Number(process.env["SALT_ROUNDS"]);
            const hashedPassword = await bcrypt.hash("123456",  saltRounds|| 10);
            const userInfo: userSignUp = {
                first_name: "Vijay",
                last_name: " N S",
                email: "vijay@gmail.com",
                password: "123456"
            }
            const user: userSignIn = {
                email: "vijay@gmail.com",
                password: "123456"
            }

            const spy = vi.spyOn(authRepo, 'findUserPresentOrNot').mockResolvedValue({
                 ...userInfo,password:hashedPassword,  user_id: userID, profileImageUrl: null, created_at: new Date(), 
            });

            const Exprected =  GetReturnMessageObject(200, Status.Success,{},"SignIn Success");

            const Actual = await signInUser(user);

            expect(Actual?.statusCode).toStrictEqual(Exprected?.statusCode);
            expect(Actual?.statusText).toStrictEqual(Exprected?.statusText);
            expect(Actual?.status).toStrictEqual(Exprected?.status);
            expect(Actual?.data).not.toBeNull()
            expect(spy).toHaveBeenCalledTimes(1);

        })

         test("InValid User Sign In, Should Return 404 and Valid Response", async ()=>{

            const userID = uuidv4();
            const saltRounds = Number(process.env["SALT_ROUNDS"]);
            const hashedPassword = await bcrypt.hash("123456",  saltRounds|| 10);
            const userInfo: userSignUp = {
                first_name: "Vijay",
                last_name: " N S",
                email: "vijay@gmail.com",
                password: "123456"
            }
            const user: userSignIn = {
                email: "vija@gmail.com", //wrong email
                password: "123456" //wrong password
            }

            const spy = vi.spyOn(authRepo, 'findUserPresentOrNot').mockResolvedValue(null);

            const Exprected =  GetReturnMessageObject(404, Status.Error,null,"User with given email not found!!");

            const Actual = await signInUser(user);

            expect(Actual?.statusCode).toStrictEqual(Exprected?.statusCode);
            expect(Actual?.statusText).toStrictEqual(Exprected?.statusText);
            expect(Actual?.status).toStrictEqual(Exprected?.status);
            expect(Actual?.data).toBeNull()
            expect(spy).toHaveBeenCalledTimes(1);

        })

        test("Valid User Sign In, But Password is Not Right, Should Return 404 and Valid Response", async ()=>{

            const userID = uuidv4();
            const saltRounds = Number(process.env["SALT_ROUNDS"]);
            const hashedPassword = await bcrypt.hash("123456",  saltRounds|| 10);
            const userInfo: userSignUp = {
                first_name: "Vijay",
                last_name: " N S",
                email: "vijay@gmail.com",
                password: "123456"
            }
            const user: userSignIn = {
                email: "vijay@gmail.com",
                password: "1234567" //wrong password
            }

            const spy = vi.spyOn(authRepo, 'findUserPresentOrNot').mockResolvedValue({
                 ...userInfo,password:hashedPassword,  user_id: userID, profileImageUrl: null, created_at: new Date(), 
            });

            const Exprected =  GetReturnMessageObject(404, Status.Error,null,"Please enter correct password!!!");

            const Actual = await signInUser(user);

            expect(Actual?.statusCode).toStrictEqual(Exprected?.statusCode);
            expect(Actual?.statusText).toStrictEqual(Exprected?.statusText);
            expect(Actual?.status).toStrictEqual(Exprected?.status);
            expect(Actual?.data).toBeNull()
            expect(spy).toHaveBeenCalledTimes(1);

        })


    })



})