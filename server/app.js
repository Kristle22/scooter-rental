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
  database: "la_ma_kolts",
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
  c.title, c.id, c.imgPath, COUNT(k.id) AS kolts_count, SUM(k.isBusy = 0) AS busy, SUM(k.isBusy = 1) AS ready
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

// READ FRONT KOLTS
app.get('/front/paspirtukai', (req, res) => {
  const sql = `
  SELECT
  k.id, c.title AS color, c.imgPath AS img, regCode, isBusy, lastUsed, totalRide, color_id, GROUP_CONCAT(k.regCode) AS regCodes, GROUP_CONCAT(k.isBusy) AS statuses, GROUP_CONCAT(k.lastUsed) AS lastUses, GROUP_CONCAT(k.totalRide) AS totalRides, COUNT(k.id) AS kolts_count, SUM(k.isBusy = 0) AS busy, SUM(k.isBusy = 1) AS ready
  FROM kolts AS k
  LEFT JOIN kolts_color AS c
  ON k.color_id = c.id
  GROUP BY color_id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ FRONT KOLTS COLORS
app.get('/front/spalvos', (req, res) => {
  const sql = `
  SELECT
  c.title, c.id, c.imgPath, COUNT(k.id) AS kolts_count, SUM(k.isBusy = 0) AS busy, SUM(k.isBusy = 1) AS ready, GROUP_CONCAT(k.regCode) AS regCodes, GROUP_CONCAT(k.isBusy) AS statuses, GROUP_CONCAT(k.lastUsed) AS lastUses, GROUP_CONCAT(k.totalRide) AS totalRides
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

// READ FRONT Rental info
app.get('/front/rezervacijos', (req, res) => {
  const sql = `
  SELECT
  r.id, pick_up_date, return_date, name, email, com, kolt_id
  FROM rental_info AS r
  LEFT JOIN kolts AS k
  ON r.kolt_id = k.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE FRONT REZERV INFO
app.post('/front/rezervacijos', (req, res) => {
  const sql = `
  INSERT INTO rental_info
  (id, pick_up_date, return_date, name, email, com, kolt_id)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  con.query(sql, [req.body.id, req.body.pickUpDate, req.body.returnDate, req.body.name, req.body.email, req.body.comments, req.body.koltId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jūsų rezrvacijos patvirtinimas bus atsiųstas į nurodytą el. paštą.', type: 'success' } });
  })
});

app.listen(port, () => {
  console.log(`Peleda klauso porto ${port}`)
})