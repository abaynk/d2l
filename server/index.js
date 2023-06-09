const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const { exec } = require('child_process');
const path = require('path');

const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//start app
const port = process.env.PORT || 3000;

app.post('/upload', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let file = req.files.file;
      //Use the mv() method to place the file in the upload directory (i.e. "uploads")
      await file.mv(`./${file.name.split('.')[0]}/${file.name}`);

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: file.name,
          mimetype: file.mimetype,
          size: file.size,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('an error occurred while processing file');
  }
});

app.get('/getLaTeXFile', (req, res) => {
  exec(
    `bash docx2tex/d2t -o ${req.query.fileName.split('.')[0]} ${
      req.query.fileName.split('.')[0]
    }/${req.query.fileName}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send('An error occurred while executing the script.');
      }

      // Print the output of the script
      console.log('res:', stdout);

      // Send a response to the client
      res.send('Script executed successfully.');
    }
  );
});
app.get('/download', (req, res) => {
  const options = {
    root: path.join(__dirname + `/${req.query.fileName.split('.')[0]}`),
  };

  const fileName = req.query.fileName;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.listen(port, () => console.log(`App is listening on port ${port}.`));
