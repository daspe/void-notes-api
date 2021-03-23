const db = require('../config/db');
const utils = require('./utils');

// Create a new notebook with a random key
const nbCreate = (req, res) => {
    const nbKey = utils.generateKey(30);
    const created = utils.getDateString();
    const expiration = utils.getDateString(30); // Expiration in 30 days

    // Create a new notebook in database
    db('notebooks')
        .insert({
            nbKey,
            created,
            expiration,
        })
        .returning('*')
        .then(nb => res.json({
            msg: `Notebook '${nbKey}' was created`,
            nb: nb[0]
        }))
        .catch(err => res.status(400).json('Notebook could not be created.'))
}

// Renew a notebook expiration date (default: 30 days from today)
const nbRenew = (req, res) => {
    const { key } = req.params;
    if (!key) {return res.status(400).json('Notebook key not given.')}

    const newExpirationDate = utils.getDateString(30);
    db('notebooks').where('nbKey', '=', key)
        .update({
            expiration: newExpirationDate
        })
        .returning('*')
        .then(nb => {
            if (nb.length) {
                return res.json({
                    msg: `Notebook '${key}' expiration date renewed`,
                    nb: nb[0]
                });
            } else {
                return res.status(404).json(`Notebook with key '${key}' not found.`);
            }
        })
        .catch(err => res.status(400).json('Notebook could not be retrieved.'));
}

// Delete a notebook from the database
const nbDelete = (req, res) => {
    const { key } = req.params;
    if (!key) {return res.status(400).json('Notebook key not given.')}

    db('notebooks').where('nbKey', '=', key)
        .delete()
        .returning('*')
        .then(nb => {
            if (nb.length) {
                // Delete all notes with the same nbKey
                db('notes').where('nbKey', '=', key)
                    .delete()
                    .returning('*')
                    .then(notes => {
                        return res.json({
                            msg: `Notebook '${key}' was deleted`,
                            nb: nb[0],
                            notes
                    })
                })
            } else {
                return res.status(404).json(`Notebook with key '${key}' not found.`);
            }
        })
        .catch(err => res.status(400).json('Notebook could not be retrieved.'));
}

// Display notebook info
const nbInfo = (req, res) => {
    const { key } = req.params;
    if (!key) {return res.status(400).json('Notebook key not given.')}

    // Retrieve notebook with matching key from database
    db.select('*')
        .from('notebooks')
        .where('nbKey', '=', key)
        .then(nb => {
            if (nb.length) {
                return res.json(nb[0]);
            } else {
                return res.status(404).json(`Notebook with key '${key}' not found.`);
            }
        })
        .catch(err => res.status(400).json('Notebook could not be retrieved.'));
}

// Export functions
module.exports = {
    nbCreate: nbCreate,
    nbRenew: nbRenew,
    nbDelete: nbDelete,
    nbInfo: nbInfo,
}
