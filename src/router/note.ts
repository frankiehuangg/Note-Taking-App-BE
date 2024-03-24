import express from "express";
import {check} from "express-validator";
import CreateNote from "../controllers/note/create";
import Verify from "../middleware/verify";
import RetrieveNote from "../controllers/note/retrieve";
import UpdateNote from "../controllers/note/update";
import RemoveNote from "../controllers/note/delete";

const router = express.Router()

router.post('/note',
    check('title')
        .not()
        .isEmpty()
        .withMessage('Note title is required')
        .trim()
        .escape(),
    check('content')
        .not()
        .isEmpty()
        .withMessage('Note content is required')
        .trim()
        .escape(),
    check('type')
        .trim()
        .escape(),
    Verify,
    CreateNote
)

router.get('/note',
    Verify,
    RetrieveNote
)

router.patch('/note',
    check('title')
        .not()
        .isEmpty()
        .withMessage('Note title is required')
        .trim()
        .escape(),
    check('content')
        .not()
        .isEmpty()
        .withMessage('Note content is required')
        .trim()
        .escape(),
    check('type')
        .trim()
        .escape(),
    Verify,
    UpdateNote
)

router.delete('/note/:id',
    check('id')
        .not()
        .isEmpty()
        .withMessage('Note id is required')
        .trim()
        .escape(),
    Verify,
    RemoveNote
)

export default router