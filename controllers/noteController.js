const { andWhere } = require('../config/db');
const db = require('../config/db');
const utils = require('./utils');

// Create a note
const noteCreate = (req, res) => {
    const { key } = req.params;
    const { title, note } = req.body;
    if (!key) {return res.status(400).json('Notebook key not given.')}
    if (!note) {return res.status(400).json('Note text was empty.')}

    // Create a new note in database
    db('notes')
        .insert({
            nb_key: key,
            title,
            note,
        })
        .returning('*')
        .then(note => res.json({
            msg: `Note '${note[0].id}' was created in notebook '${key}'.`,
            note: note[0]
        }))
        .catch(err => res.status(400).json('Note could not be created.'))
}

// Edit a note
const noteEdit = (req, res) => {
    res.send('NOT IMPLEMENTED: Edit note');
}

// Delete a note on GET
const noteDelete = (req, res) => {
    res.send('NOT IMPLEMENTED: Delete note');
}

// Display note info on GET
const noteInfo = (req, res) => {
    const { key, id } = req.params;
    if (!key) {return res.status(400).json('Notebook key not given.')}
    if (!id) {return res.status(400).json('Note id not given.')}

    db.select('*')
        .from('notes')
        .where('nb_key', '=', key)
        .andWhere('id', '=', id)
        .then(note => {
            if (note.length) {
                return res.json(note[0]);
            } else {
                return res.status(404).json(`Note with key '${key}' and id '${id}' not found.`);
            }
        })
        .catch(err => res.status(400).json('Note could not be retrieved.'));
}

// Display all note(s) info on GET
const noteInfoList = (req, res) => {
    const { key } = req.params;
    if (!key) {return res.status(400).json('Notebook key not given.')}

    db.select('*')
        .from('notes')
        .where('nb_key', '=', key)
        .then(notes => {
            if (notes.length) {
                return res.json(notes);
            } else {
                return res.status(404).json(`Notes with key '${key}' not found.`);
            }
        })
        .catch(err => res.status(400).json('Notes could not be retrieved.'));
}

// Export functions
module.exports = {
    noteCreate: noteCreate,
    noteEdit: noteEdit,
    noteDelete: noteDelete,
    noteInfo: noteInfo,
    noteInfoList: noteInfoList,
}