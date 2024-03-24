export interface PostCreateNoteRequest {
    userID: string,
    title: string,
    content: string,
    type: string
}

export interface Note {
    modified_at: string,
    id: string,
    title: string,
    content: string,
    type: string
}

export interface PostCreateNoteResponse {
    note: Note
}

export interface GetRetrieveNoteResponse {
    notes: Note[]
}

export interface PatchUpdateNoteRequest {
    id: string,
    title: string,
    content: string,
    type: string
}

export interface PatchUpdateNoteResponse {
    note: Note
}