// Site home page
const index = (req, res) => {
    res.sendFile('/index.html');
}

// Export functions
module.exports = {
    index: index,
}
