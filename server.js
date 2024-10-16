const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// Route to list files in the directory
app.get('/api/files', (req, res) => {
    const directoryPath = path.join(__dirname, 'directory');
    
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        res.send(files);
    });
});

// Route to read a specific file's content
app.get('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'directory', filename);

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            return res.status(500).send('Unable to read file: ' + err);
        }
        res.send(content);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
