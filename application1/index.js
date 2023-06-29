const express = require('express');
const fs = require('fs');
const app = express();
const request = require('request');
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 6000;

app.post('/calculate', (req, res, next) => {
  if (req?.body?.file) {
    const filePath = `../data/${req.body.file}`;

    if (fs.existsSync(filePath)) {
      request.post('http://validate:6001/', { json: req.body }, function (error, response, body) {
        res.json(body);
      });
    } else {
      res.send({
        file: req.body.file,
        error: 'File not found.',
      });
    }
  } else {
    res.send({
      file: null,
      error: 'Invalid JSON input.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
