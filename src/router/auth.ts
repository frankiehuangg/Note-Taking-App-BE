import express from "express";
import {check} from "express-validator";
import Register from "../controllers/auth/register";
import Validate from "../middleware/validate";
import Login from "../controllers/auth/login";
import Logout from "../controllers/auth/logout";

const router = express.Router()

router.post('/register',
    check('email')
        .isEmail()
        .withMessage('Enter a valid email address')
        .normalizeEmail(),
    check('first_name')
        .not()
        .isEmpty()
        .withMessage("You first name is required")
        .trim()
        .escape(),
    check("last_name")
        .not()
        .isEmpty()
        .withMessage("You last name is required")
        .trim()
        .escape(),
    check("password")
        .notEmpty()
        .isLength({min: 8})
        .withMessage("Must be at least 8 chars long"),
    Validate,
    Register
)

router.post('/login',
    check('email')
        .isEmail()
        .withMessage('Enter a valid email address')
        .normalizeEmail(),
    check('password')
        .not()
        .isEmpty(),
    Validate,
    Login
)

router.post('/logout',
    Logout
)

export default router;