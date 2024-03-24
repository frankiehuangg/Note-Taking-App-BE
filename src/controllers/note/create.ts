import express from "express";

import NoteSchema from '../../models/dao/note'
import {PostCreateNoteRequest, PostCreateNoteResponse} from "../../models/dto/note";

const CreateNote = async (req: express.Request, res: express.Response) => {
    const {userID, title, content, type}: PostCreateNoteRequest = req.body

    try {
        const newNote = new NoteSchema({
            userID,
            title,
            content,
            type
        })

        const savedNote = await newNote.save()
        const noteData: PostCreateNoteResponse = {
            note: {
                // @ts-expect-error This is ensured
                modified_at: savedNote.updatedAt,
                id: savedNote.id,
                title: savedNote.title,
                content: savedNote.content,
                type: savedNote.type
            }
        }

        res.status(200).json({
            status: 'success',
            data: noteData,
            message: 'Note created successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

export default CreateNote