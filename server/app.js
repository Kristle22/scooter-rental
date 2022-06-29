const express = require('express');
const app = express();
const port = 3004;

const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "la_ma",
});
app.get('/', (req, res) => {
  res.send('Welcome to our world!')
});

// READ KOLTS
app.get('/paspirtukai', (req, res) => {
  const sql = `
  SELECT
  k.id, c.title AS color, c.imgPath AS img, regCode, isBusy, lastUsed, totalRide
  FROM kolts AS k
  LEFT JOIN kolts_color AS c
  ON k.color_id = c.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ KOLTS COLORS
app.get('/spalvos', (req, res) => {
  const sql = `
  SELECT
  c.title, c.id, c.imgPath, COUNT(k.id) AS kolts_count, SUM(k.isBusy = 0) AS busy
  FROM kolts AS k
  RIGHT JOIN kolts_color AS c
  ON k.color_id = c.id
  GROUP BY c.id
  ORDER BY kolts_count DESC
  
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE KOLT
app.post('/paspirtukai', (req, res) => {
  const sql = `
  INSERT INTO kolts
  (id, regCode, isBusy, lastUsed, totalRide, color_id)
  VALUES (?, ?, ?, ?, ?, ?)
  `;
  con.query(sql, [req.body.id, req.body.regCode, req.body.isBusy, req.body.lastUsed ? req.body.lastUsed : '', req.body.totalRide ? req.body.totalRide : 0, req.body.color === '0' ? null : req.body.color], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Naujas Kolt sekmingai sukurtas', type: 'success' } });
  })
});

// CREATE KOLTS COLOR
app.post('/spalvos', (req, res) => {
  const sql = `
  INSERT INTO kolts_color
  (title)
  VALUES (?)
  `;
  con.query(sql, [req.body.title], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Atsirado Kolt paspirtuko nauja spalva', type: 'success' } });
  });
});

// DELETE KOLT
app.delete('/paspirtukai/:koltId', (req, res) => {
  const sql = `
  DELETE FROM kolts
  WHERE id = ?
  `;
  con.query(sql, [req.params.koltId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Kolt istrintas is saraso', type: 'danger' } });
  })
});

// DELETE KOLTs COLOR
app.delete('/spalvos/:colorId', (req, res) => {
  const sql = `
  DELETE FROM kolts_color
  WHERE id = ?
  `;
  con.query(sql, [req.params.colorId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Kolt spalva istrinta is saraso', type: 'danger' } });
  })
});

// EDIT KOLT
app.put('/paspirtukai/:koltId', (req, res) => {
  const sql = `
  UPDATE kolts 
  SET regCode = ?, isBusy = ?, lastUsed = ?, totalRide = ?, color_id = ?
  where id = ?
  `;
  con.query(sql, [req.body.regCode, req.body.isBusy, req.body.lastUsed, req.body.totalRide, req.body.color === '0' ? null : req.body.color, req.params.koltId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Kolt duomenys sekmingai atnaujinti', type: 'info' } });
  });
});

app.listen(port, () => {
  console.log(`Peleda klauso porto ${port}`)
})