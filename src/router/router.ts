import express from 'express'

import constants from '../constants/constants'
import Auth from './auth'
import Verify from "../middleware/verify";

const app = express()
const backendPort = constants.BE_PORT

app.get('/api/v1/', (req: express.Request, res: express.Response) => {
    res.send(`Server is running on port ${backendPort}`)
})

app.get('/api/v1/user', Verify, (req: express.Request, res: express.Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to your dashboard'
    })
})

app.use('/api/v1', Auth)

export default app