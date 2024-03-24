import express from "express";

import NoteSchema from '../../models/dao/note'

const RemoveNote = async (req: express.Request, res: express.Response) => {
    const id  = req.params.id

    try {
        const result = await NoteSchema.findByIdAndDelete(id)

        if (!result) {
            return res.status(401).json({
                status: 'failed',
                message: 'Note ID not found'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Note deleted successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

export default RemoveNote