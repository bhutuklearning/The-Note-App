import express from 'express';
import { getAllNotes, getNotesById, createNote, updateNote, deleteNote, likeNote, searchNotes, disLikeNote } from '../controllers/notes.controller.js';

const router = express.Router();

router.get("/search", searchNotes);
router.get('/', getAllNotes);
router.post('/create-note', createNote);
router.get('/:id', getNotesById);
router.put('/:id', updateNote);
router.post('/:id/like', likeNote);
router.post('/:id/dislike', disLikeNote);
router.delete('/:id', deleteNote);


export default router;