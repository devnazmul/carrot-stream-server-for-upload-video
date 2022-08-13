const express = require('express');
const multer = require('multer');
const cors = require('cors');
const FormData = require('form-data');
const fs = require('fs');
const { default: fetch } = require('node-fetch');
const { response } = require('express');
require('dotenv').config()


const app = express()

// Add public path 
app.use('/uploadedAssets/temp', express.static('uploadedAssets/temp'))

// middleware 
app.use(cors())

// multer setup 
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploadedAssets/temp')
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname.split(" ").join()}`)
  }
})

const upload = multer({ storage: storage })


// routes 
app.get('/', (req, res) => {
  res.send(`running`)
});

app.post('/upload', upload.single('videoUpload'), async (req, res) => {
  if (req.file.filename !== null && req.file.filename !== undefined) {
    res.status(200).send({
      data: `/uploadedAssets/temp/${req.file.filename}`
    });
  }
});

// app.delete('/delete', async async (req, res) => {
//   setTimeout(() => {
//     if (req.query.fileName !== null && req.query.fileName) {
//       const data = await fs.unlink(req.query.fileName);
//       console.log(data);
//     }
//   }, 200)

// });


// listening 
app.listen(process.env.PORT, () => {
  console.log(`app is listening on ${process.env.API_BEGINNING_POINT}:${process.env.PORT}`);
})