import mongoose from "mongoose";

type NoteDocument = mongoose.Document & {
    userID: string,
    title: string,
    content: string,
    type: string
}

type NoteModel = mongoose.Model<NoteDocument>

const noteSchema = new mongoose.Schema<NoteDocument, NoteModel>(
    {
        userID: {
            type: String,
            required: true,
            max: 25
        },
        title: {
            type: String,
            required: true,
            max: 25
        },
        content: {
            type: String,
            required: true,
            max: 25
        },
        type: {
            type: String,
            required: true,
            default: 'Default',
            max: 25
        },
    },
    {timestamps: true}
)

export default mongoose.model('notes', noteSchema)