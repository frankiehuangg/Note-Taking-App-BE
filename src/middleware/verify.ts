import jwt from "jsonwebtoken";
import express from "express";
import BlacklistSchema from '../models/dao/blacklist'
import constants from "../constants/constants";

const Verify = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authHeader = req.headers['cookie']
        if (!authHeader) return res.sendStatus(401)

        const cookie = authHeader.split(';').find(pair => pair.includes('SessionID=')).split('=')[1]
        const accessToken = cookie.split(';')[0]
        const isBlacklisted = await BlacklistSchema.findOne({token: accessToken})
        if (isBlacklisted) {
            return res.status(401).json({
                message: 'This session has expired, please logged in again'
            })
        }

        jwt.verify(cookie, constants.SECRET_ACCESS_TOKEN, async (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .json({'message': 'This session has expired'})
            }

            // @ts-expect-error This is ensured
            const {id} = decoded

            req.body.userID = id
            next()
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

export default Verify