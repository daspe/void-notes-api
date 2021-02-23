// Utility functions for controller modules

// Generate a random key as an alphanumeric string (length = int(n))
const generateKey = (length) => {
    let key = Array(length).fill(0).map(x => {
        return Math.random().toString(36).charAt(2);
    }).join('').toLowerCase();
    return key;
}

// Get the current date; offset param is the number of days to add to date
const getDateString = (offset) => {
    const date = new Date();
    if (offset) {
        date.setDate(date.getDate() + offset); // Add days according to offset
    }
    // const pg_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const pg_date = date.toISOString().slice(0, 10);
    return pg_date;
}
