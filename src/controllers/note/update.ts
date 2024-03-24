import express from "express";

import NoteSchema from '../../models/dao/note'
import {PatchUpdateNoteRequest, PatchUpdateNoteResponse} from "../../models/dto/note";

const UpdateNote = async (req: express.Request, res: express.Response) => {
    const {id, title, content, type}: PatchUpdateNoteRequest = req.body
    try {
        const note = await NoteSchema.findByIdAndUpdate(id, {
            $set: {
                title: title,
                content: content,
                type: type
            }
        }, {new: true})
        if (!note) {
            return res.status(401).json({
                status: 'failed',
                message: 'Note ID not found'
            })
        }

        const noteData: PatchUpdateNoteResponse = {
            note: {
                // @ts-expect-error This is ensured
                modified_at: note.updatedAt,
                id: note.id,
                title: note.title,
                content: note.content,
                type: note.type
            }
        }

        res.status(200).json({
            status: 'success',
            data: noteData,
            message: 'Note updated successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

export default UpdateNote