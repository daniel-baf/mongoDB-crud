const noteCtrl = {};
const Note = require('../models/Note');


// create note
noteCtrl.renderNoteForm = (req, res) => { res.render('notes/new-note') };

noteCtrl.createNewNote = async (req, res) => {
    const { title, description } = req.body; // extract form body
    const newNote = new Note({ title: title, description: description });
    await newNote.save();
    req.flash('success_msg', 'Note has been added succesfully');
    res.redirect('/notes');
};

// read all notes
noteCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find().lean().sort({date:'desc'});
    res.render('notes/all-notes', { notes });
};

// update note
noteCtrl.renderEditForm = async (req, res) => { 
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', { note }); 
};

noteCtrl.updateNote = async (req, res) => { 
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title: title, description: description });
    req.flash('success_msg', 'Note updated successfully');
    res.redirect('/notes')
};

// delete note
noteCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id); // get id on URI
    req.flash('success_msg', 'Note deleted successfully');
    res.redirect('/notes');
};

module.exports = noteCtrl;