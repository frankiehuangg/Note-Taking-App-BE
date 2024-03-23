import express, {CookieOptions} from "express";
import bcrypt from "bcrypt";

import UserSchema from '../../models/dao/user'
import {PostLoginUserRequest} from "../../models/dto/user"

const Login = async (req: express.Request, res: express.Response) => {
    const {email}: PostLoginUserRequest = req.body;

    try {
        const user = await UserSchema.findOne({email}).select('+password')
        if (!user) {
            return res.status(401).json({
                status: 'failed',
                data: [],
                message: 'Invalid email or password'
            })
        }

        const isPasswordValid = await bcrypt.compare(`${req.body.password}`, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'failed',
                data: [],
                message: 'Invalid email or password'
            })
        }

        const options: CookieOptions = {
            maxAge: 20 * 60 * 60,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }

        const token = user.generateAccessJWT()
        console.log(token)

        res.cookie('SessionID', token, options)
        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            code: 500,
            data: [],
            message: 'Internal server error'  + err
        })
    }

    res.end()
}

export default Login