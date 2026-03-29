import { afterEach, describe, expect, test, vi } from 'vitest';

import * as authService from '../../Auth/AuthService.js';
import { signin, signup, userSignIn, userSignUp } from '../../Auth/AuthController.js';
import { GetReturnMessageObject } from '../../Utils/helperfunctions.js';
import { Status } from '../../Utils/types.js';
import { email } from 'zod';



describe("Auth Controller Tests", () => {

    describe("Sign Up", () => {

        afterEach(() => {
            vi.clearAllMocks();
        });


        test("Valid User Info, Should Return 200 and with Valid Response", async () => {


            const user: userSignUp = {
                first_name: "Vijay",
                last_name: " N S",
                email: "vijay@gmail.com",
                password: "12345689"
            }
            const resposneData = { first_name: user?.first_name, last_name: user?.last_name, email: user?.email };

            const req = {
                body: user
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;


            const spy = vi.spyOn(authService, 'signupUser').mockResolvedValue(
                GetReturnMessageObject(200, Status.Success, resposneData, "SignUp Success")
            );



            const Expected = {
                status: 200,
                json: {
                    message: "SignUp Success",
                    data: resposneData,
                }
            }

            const Actual = await signup(req, res);

            // expect(Actual).toStrictEqual(Expected);
            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith({
                message: "SignUp Success",
                data: resposneData,
            });
            expect(spy).toHaveBeenCalledTimes(1);

        })

        test("In Valid User Info, Should Return 404 and with Valid Response", async () => {


            const user: any = {
                first_name: "Vijay",
                last_name: " N S",
            }

            const req = {
                body: user
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;


            const Expected = {
                status: 404,
                json: {
                    message: "Please Validate Your Input",
                }
            }

            const Actual = await signup(req, res);

            // expect(Actual).toStrictEqual(Expected);
            expect(res.status).toHaveBeenCalledWith(404);

            expect(res.json).toHaveBeenCalledWith({
                message: "Please Validate Your Input",
            });

        })

    })

    describe("Sign In", () => {

        afterEach(() => {
            vi.clearAllMocks();
        });


        test("Valid User Info, Should Return 200 and with Valid Response", async () => {


            const user: userSignIn = {
                email: "vijay@gmail.com",
                password: "12345689"
            }
            // const resposneData = { first_name: user?.first_name, last_name: user?.last_name, email: user?.email };

            const req = {
                body: user
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;


            const spy = vi.spyOn(authService, 'signInUser').mockResolvedValue(
                GetReturnMessageObject(200, Status.Success, {}, "SignIn Success")
            );



            const Actual = await signin(req, res);

            // expect(Actual).toStrictEqual(Expected);
            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith({
                message: "SignIn Success",
                data: {},
            });
            expect(spy).toHaveBeenCalledTimes(1);

        })

        test("Valid User Info, Should Return 200 and with Valid Response", async () => {

            const user: userSignIn = {
                email: "vijay@gmail.com",
                password: "123456"
            }
            // const resposneData = { first_name: user?.first_name, last_name: user?.last_name, email: user?.email };

            const req = {
                body: user
            } as any;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as any;




            const Actual = await signin(req, res);

            // expect(Actual).toStrictEqual(Expected);
            expect(res.status).toHaveBeenCalledWith(404);

            expect(res.json).toHaveBeenCalledWith({
                message: "Please Validate Your Input",
            });

        })

    })

})