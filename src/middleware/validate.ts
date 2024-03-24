import { validationResult } from 'express-validator'
import express from "express";

const Validate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    next()
}

export default Validate