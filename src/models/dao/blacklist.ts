import mongoose from 'mongoose'

type BlacklistDocument = mongoose.Document & {
    token: string
}

type BlacklistModel = mongoose.Model<BlacklistDocument>

const blacklistSchema = new mongoose.Schema<BlacklistDocument, BlacklistModel>({
        token: {
            type: String,
            required: true,
            ref: 'User'
        },
    },
    {timestamps: true}
)

export default mongoose.model('blacklist', blacklistSchema)