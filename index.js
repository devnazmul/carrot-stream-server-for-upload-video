const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const fsx = require('fs-extra');

// CONFIG DOTENV 
require('dotenv').config()

const app = express()

// ADD PUBLIC PATH
app.use('/uploadedAssets/temp', express.static('uploadedAssets/temp'))

// MIDDLEWARE
app.use(cors())

// MULTER SETUP
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const path = `./uploadedAssets/temp`;
    if (!fsx.existsSync(path)) {
      fsx.ensureDirSync(path)
        callback(null, path)
    }else{
      callback(null, path)
    }
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname.split(" ").join("_")}`)
  }
})
const upload = multer({ storage: storage })

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send(`running`)
});

// UPLOAD VIDEO 
app.post('/upload', upload.single('videoUpload'), async (req, res) => {
  res.status(200).send({
    data:`${process.env.API_BEGINNING_POINT}uploadedAssets/temp/${req.file.filename}`,
    message:"Video uploaded successfully."
  });
});


// DELETE VIDEO BY FILE_NAME 
app.delete('/delete/:file_name', async (req, res) => {
  const dir = `${__dirname}/uploadedAssets/temp/${req.params.file_name}`
  fs.unlink(dir, (err) => {
    if (!err) {
      res.status(200).send({
        message:"Video deleted successfully."
      })
    }else{
      console.error(err)
      res.status(400).send({
        message:"Failed to delete video!"
      })
    }
  })
});

// LISTENING
app.listen(process.env.PORT || 8080, () => {
  console.log(`app is listening on ${process.env.API_BEGINNING_POINT}`);
})