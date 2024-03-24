import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import constants from "../../constants/constants";

type UserDocument = mongoose.Document & {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    generateAccessJWT(): string,
}

type UserModel = mongoose.Model<UserDocument>

const userSchema = new mongoose.Schema<UserDocument, UserModel>(
    {
        first_name: {
            type: String,
            required: true,
            max: 25
        },
        last_name: {
            type: String,
            required: true,
            max: 25
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
            max: 25,
        },
    },
    {timestamps: true}
)

userSchema.pre('save', async function (this: UserDocument, next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (err) {
        return next(err)
    }
})

userSchema.methods.generateAccessJWT = function () {
    const payload = {
        id: this._id.toString()
    }

    return jwt.sign(payload, constants.SECRET_ACCESS_TOKEN)
}

export default mongoose.model('users', userSchema)