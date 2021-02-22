const generateKey = (length) => {
    // Create a random alphanumeric string
    let key = Array(length).fill(0).map(x => {
        return Math.random().toString(36).charAt(2);
    }).join('').toUpperCase();
    return key;
}

const getDateString = (offset) => {
    // Get the current date; offset param is the number of days to add to date
    const date = new Date();
    if (offset) {
        date.setDate(date.getDate() + offset); // Add days according to offset
    }
    // const pg_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const pg_date = date.toISOString().slice(0, 10);
    return pg_date;
}

const handleNotebook = (req, res, db) => {
    const { key } = req.params;
    // Validate request
    if (!key) {
        return res.status(400).json('Notebook key not given.');
    }

    // Attempt retrieval of notebook from database
    db.select('*').from('notebooks')
        .where('nb_key', '=', key)
        .then(nb => {
            if (nb.length) {
                return res.json(nb[0]);
            } else {
                return res.status(404).json(`Notebook with key "${key}" not found.`);
            }
        })
        .catch(err => res.status(400).json('Notebook could not be retrieved.'));
}

const handleNewNotebook = (req, res, db) => {
    // Create a random key for new notebook
    const nb_key = generateKey(30);
    const created = getDateString();
    const expiration = getDateString(30);
    res.json({
        nb_key,
        created,
        expiration,
    });

    // Create a new notebook in database
    db.insert({
        nb_key,
        created,
        expiration,
    })
    .into('notebooks')
    .then(db.commit)
    .catch(db.rollback); // lookup knex rollback
}

module.exports = {
    handleNotebook: handleNotebook,
    handleNewNotebook: handleNewNotebook
}