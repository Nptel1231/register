const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

// Use Multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/admin.html');
});

// Handle the image upload
app.post('/upload', upload.single('imageFile'), (req, res) => {
    const imageFile = req.file;

    // Save the uploaded image (you can customize the storage path)
    fs.renameSync(imageFile.path, __dirname + '/uploads/' + imageFile.originalname);

    res.status(200).send('Image uploaded successfully');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
