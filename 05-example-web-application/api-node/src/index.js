//require('dotenv').config();
/* const { getDateTime } = require('./db');
const morgan = require('morgan') */
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

/* app.use(morgan('tiny')); */


const dbURL = process.env.DATABASE_URL;
const mysql = require('mysql');
const connection = mysql.createConnection(dbURL);
connection.connect();

app.get('/', async (req, res) => {
/*   const dateTime = await getDateTime();
  const response = dateTime;
  response.api = 'node';
  res.send(response); */
  var response = connection.query('SELECT NOW() as date;', (err,rows,fields)=>{
    if(err) throw err;
    response.rows = JSON.parse(JSON.stringify(rows));
    const responseData = [
      response.rows[0].date,
      'node'
    ];
    res.json(responseData )
  })

});

app.get('/ping', async (_, res) => {
  res.send('pong');
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on('SIGTERM', () => {
  console.debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.debug('HTTP server closed');
  });
});
