const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'success_sphere'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

app.get('/', (req, res) => {
  res.send('Success-Sphere Backend');
});

// ...routes for blogs, courses, and user authentication...

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
