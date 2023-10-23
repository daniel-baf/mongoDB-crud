const { Router } = require('express');
const router = Router();

const { renderNoteForm, createNewNote, renderNotes, renderEditForm, updateNote, deleteNote} = require('../controllers/nodes.controller')

// create note
router.get('/notes/add', renderNoteForm);
router.post('/notes/new-note', createNewNote);
// read all notes
router.get('/notes', renderNotes);
// update notes
router.get('/notes/edit/:id', renderEditForm) // edit note with id :id ej /notes/edit/1 -> edit note 1
router.put('/notes/edit-note/:id', updateNote)
// delete note
router.delete('/notes/delete/:id', deleteNote)

module.exports = router;