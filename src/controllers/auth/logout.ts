import express from 'express'

import BlacklistSchema from '../../models/dao/blacklist'
import blacklist from '../../models/dao/blacklist'

const Logout = async (req: express.Request, res: express.Response) => {
    try {
        const authHeader = req.headers['cookie']
        if (!authHeader) {
            return res.sendStatus(204)
        }

        const cookie = authHeader.split('=')[1]
        const accessToken = cookie.split(';')[0]
        const isBlacklisted = await blacklist.findOne({token: accessToken,})
        if (isBlacklisted) {
            return res.sendStatus(204)
        }

        const newBlacklist = new BlacklistSchema({
            token: accessToken
        })
        await newBlacklist.save()

        res.setHeader('Clear-Site-Data', 'cookies')
        res.status(200).json({
            message: 'Logged out successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }

    res.end()
}

export default Logout