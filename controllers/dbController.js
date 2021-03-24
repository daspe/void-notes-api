// Database maintenance functions
const db = require('../config/db');
const utils = require('./utils');

// Clean the database of all expired notebooks and their notes
const dbClean = (req, res) => {
  db('notebooks')
    .returning('*')
    .then(notebooks => {
      const dateNow = new Date();
      console.log(`Running dbClean @ ${dateNow}`);
      notebooks.map(nb => {
        // Check if the current date is greater than nb expiration
        if (dateNow > Date.parse(nb.expiration)) {
          console.log(`dbClean : Found expired notebook [${nb.expiration}] (${nb.nbKey})`);
          // Delete expired notebook from database
          db('notebooks').where('nbKey', '=', nb.nbKey)
            .delete()
            .then(console.log(`dbClean : Deleted notebook (${nb.nbKey})`))
            .catch(err => res.status(400).json(err));

          // Delete all notes with the same nbKey
          db('notes').where('nbKey', '=', nb.nbKey)
            .delete()
            .returning('*')
            .then(notes => {
              notes.map(note => console.log(`dbClean : Deleted note ${note.id} (${note.nbKey})`))
            })
            .catch(err => res.status(400).json(err));
        }
      });
      return res.json(`Database successfully cleaned`);
    })
    .catch(err => res.status(400).json('Error cleaning database.'));
}

// Export functions
module.exports = {
  dbClean: dbClean,
}
