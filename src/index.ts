import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import app from './router/router'
import constants from "./constants/constants";
import mongoose from "mongoose";

// Configure server
const server = express()

// Header information
server.use(cors())
server.disable('x-powered-by')
server.use(cookieParser())
server.use(express.urlencoded({extended: false}))
server.use(express.json())

// Start Mongoose
console.log(constants.MONGODB_URI)
mongoose
    .connect(constants.MONGODB_URI)
    .then(() => console.log(`Connected to database`))
    .catch((err) => console.log(err))

// Configure routes
server.use(app)

// Start server
server.listen(constants.BE_PORT, () => {
    console.log(`Server running on http://localhost:${constants.BE_PORT}`)
})