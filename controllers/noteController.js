const db = require('../config/db');
const utils = require('./utils');

// Create a note on POST
const noteCreate = (req, res) => {
    const { key } = req.params;
    const { title, note } = req.body;
    if (!key) {return res.status(400).json('Notebook key not given.')}
    if (!note) {return res.status(400).json('Note text was empty.')}

    // Create a new note in database
    db('notes')
        .insert({
            nbKey: key,
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
    const { key, id } = req.params;
    const { newTitle, newNote } = req.body;
    if (!key) {return res.status(400).json('Notebook key not given.')}
    if (!id) {return res.status(400).json('Note id not given.')}
    if (!newTitle || !newNote) {return res.status(400).json('Note update data not given.')}

    db.select('*')
        .from('notes')
        .where('nbKey', '=', key)
        .andWhere('id', '=', id)
        .update({
            title: newTitle,
            note: newNote
        })
        .returning('*')
        .then(note => {
            if (note.length) {
                return res.json({
                    msg: `Note '${id}' was edited in notebook '${key}'.`,
                    note: note[0]
                });
            } else {
                return res.status(404).json(`Note '${id}' from notebook '${key}' not found.`);
            }
        })
        .catch(err => res.status(400).json('Note could not be retrieved.'));
}

// Delete a note on GET
const noteDelete = (req, res) => {
    const { key, id } = req.params;
    const { confirmDelete } = req.body;
    if (!key) {return res.status(400).json('Notebook key not given.')}
    if (!id) {return res.status(400).json('Note id not given.')}
    
    // Check that delete confirmation was valid in req body
    if (!confirmDelete || confirmDelete === false) {
        return res.status(403).json('Must confirm note deletion.')
    } else {
        db('notes')
            .where('nbKey', '=', key)
            .andWhere('id', '=', id)
            .delete()
            .returning('*')
            .then(note => {
                if (note.length) {
                    return res.json({
                        msg: `Note '${id}' from notebook '${key}'  was deleted`,
                        note: note[0]
                    });
                } else {
                    return res.status(404).json(`Note '${id}' from notebook '${key}' not found.`);
                }
            })
            .catch(err => res.status(400).json('Note could not be retrieved.'));
    }
}

// Display note info on GET
const noteInfo = (req, res) => {
    const { key, id } = req.params;
    if (!key) {return res.status(400).json('Notebook key not given.')}
    if (!id) {return res.status(400).json('Note id not given.')}

    db.select('*')
        .from('notes')
        .where('nbKey', '=', key)
        .andWhere('id', '=', id)
        .then(note => {
            if (note.length) {
                return res.json(note[0]);
            } else {
                return res.status(404).json(`Note '${id}' from notebook '${key}' not found.`);
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
        .where('nbKey', '=', key)
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