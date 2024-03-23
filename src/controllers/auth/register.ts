import express from "express";

import UserSchema from '../../models/dao/user'
import {PostRegisterUserRequest, PostRegisterUserResponse} from "../../models/dto/user";

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
                data: [],
                message: 'Email has already been used'
            })
        }

        const savedUser = await newUser.save()
        const userData: PostRegisterUserResponse = {
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
            email: savedUser.email
        }
        res.status(200).json({
            status: 'success',
            data: userData,
            message: 'Registered successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            code: 500,
            data: [],
            message: 'Internal server error'
        })
    }

    res.end()
}

export default Register