import express, {CookieOptions} from "express";

import UserSchema from '../../models/dao/user'
import {PostRegisterUserRequest, PostRegisterUserResponse} from "../../models/dto/user";
import constants from "../../constants/constants";

const Register = async (req: express.Request, res: express.Response) => {
    const {first_name, last_name, email, password}: PostRegisterUserRequest = req.body

    try {
        const newUser = new UserSchema({
            first_name,
            last_name,
            email,
            password
        })

        const existingUser = await UserSchema.findOne({email})
        if (existingUser) {
            return res.status(400).json({
                status: 'failed',
                message: 'Email has already been used'
            })
        }

        const savedUser = await newUser.save()
        const userData: PostRegisterUserResponse = {
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
            email: savedUser.email
        }

        const options: CookieOptions = {
            maxAge: 60 * 60 * 6000,
            httpOnly: constants.COOKIE_HTTP_ONLY === 'true',
            secure: constants.COOKIE_SECURE === 'true',
            sameSite: 'none'
        }

        const token = savedUser.generateAccessJWT()
        console.log(token)

        res.cookie('SessionID', token, options)
        res.status(200).json({
            status: 'success',
            data: userData,
            message: 'Registered successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }

    res.end()
}

export default Register