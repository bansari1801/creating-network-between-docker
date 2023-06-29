const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 6001;

app.post('/', (req, res) => {
  const filePath = `../data/${req.body.file}`;
  let sum = 0;
  if (isValidCSV(filePath)) {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.product === req.body.product) {
          sum = sum + parseInt(row.amount);
        }
      })
      .on('end', () => {
        res.json({
          file: req.body.file,
          sum: sum,
        });
      })
      .on('error', (error) => {
        console.error(error);
      });
  } else {
    res.send({
      file: req.body.file,
      error: 'Input file not in CSV format.',
    });
  }
});

function isValidCSV(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');

  const numColumns = lines[0].split(',').length;
  const hasSameNumColumns = lines.every((line) => line.split(',').length === numColumns);

  const hasDataRows = lines.length > 1;

  return hasSameNumColumns && hasDataRows;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});