import express from "express";

import NoteSchema from '../../models/dao/note'
import {GetRetrieveNoteResponse} from "../../models/dto/note";

const RetrieveNote = async (req: express.Request, res: express.Response) => {
    try {
        const userID = req.body.userID
        const offset = parseInt(<string>req.query.offset)
        const size = parseInt(<string>req.query.size)

        const notes = await NoteSchema
            .find({userID})
            .skip((offset - 1) * size)
            .limit(size)
            .exec()
        if (notes.length === 0) {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid user id'
            })
        }

        const notesData: GetRetrieveNoteResponse = {notes: []}
        for (let i = 0; i < notes.length; i++) {
            notesData.notes.push({
                // @ts-expect-error This is ensured
                modified_at: notes[i].updatedAt,
                id: notes[i].id,
                title: notes[i].title,
                content: notes[i].content,
                type: notes[i].type
            })
        }

        res.status(200).json({
            status: 'success',
            data: notesData,
            message: 'Notes retrieved successfully'
        })

        // const noteData: PostGetNoteResponse = notes
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

export default RetrieveNote