const db = require('../config/db');
const utils = require('./utils');

// Create a new notebook with a random key
const nbCreate = (req, res) => {
    const nb_key = utils.generateKey(30);
    const created = utils.getDateString();
    const expiration = utils.getDateString(30); // Expiration in 30 days

    // Create a new notebook in database
    db.insert({
        nb_key,
        created,
        expiration,
    })
    .into('notebooks')
    .then(db.commit)
    .catch(db.rollback); // ?knex rollback?

    return res.json({
        nb_key,
        created,
        expiration,
    }); // ?redirect to notebook display page?
}

// Renew a notebook expiration date (default: 30 days from today)
const nbRenew = (req, res) => {
    const { key } = req.params;
    if (!key) {
        return res.status(400).send('Notebook key not given.');
    }

    const newExpirationDate = utils.getDateString(30);
    db('notebooks').where('nb_key', '=', key)
        .update({
            expiration: newExpirationDate
        })
        .returning('*')
        .then(nb => {
            if (nb.length) {
                res.json(nb[0]);
            } else {
                res.status(400).send(`Notebook with key "${key}" not found.`);
            }
        })
        .catch(err => res.status(400).send('Notebook could not be retrieved.'));
}

// Delete a notebook from the database
const nbDelete = (req, res) => {
    res.send('NOT IMPLEMENTED: Delete a notebook');
}

// Display notebook info
const nbInfo = (req, res) => {
    const { key } = req.params;
    if (!key) {
        return res.status(400).send('Notebook key not given.');
    }

    // Retrieve notebook with matching key from database
    db.select('*').from('notebooks')
        .where('nb_key', '=', key)
        .then(nb => {
            if (nb.length) {
                return res.json(nb[0]);
            } else {
                return res.status(404).send(`Notebook with key "${key}" not found.`);
            }
        })
        .catch(err => res.status(400).send('Notebook could not be retrieved.'));
}

// Export functions
module.exports = {
    nbCreate: nbCreate,
    nbRenew: nbRenew,
    nbDelete: nbDelete,
    nbInfo: nbInfo,
}
