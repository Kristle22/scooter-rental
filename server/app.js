const express = require('express');
const app = express();

const path = require('path');
const port = process.env.PORT || 3003;

if (process.env.NODE_ENV === "production") {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  })
}

const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: '10mb' }));
const mysql = require("mysql");

const md5 = require('js-md5');
const uuid = require('uuid');
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

const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
    // admin
    const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        console.log(results);
        if (!results.length || results[0].role !== 'admin') {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
    next();
  } else {
    // Front
    const sql = `
    SELECT
    name, role
    FROM users
    WHERE session = ?
`;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length) {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  }
}
app.use(doAuth)

//Auth
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
    requests = [req.headers['authorization'] || '', req.query.role];
  } else {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
    requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: 'error' });
    } else {
      res.send({ msg: 'ok' });
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});

// READ KOLTS
app.get('/paspirtukai', (req, res) => {
  let sql;
  let requests;
  if (!req.query['color-id'] && !req.query['s']) {
    sql = `
  SELECT
  k.id, c.title AS koltColor, regCode, isBusy, status, lastUsed, totalRide, k.photo, GROUP_CONCAT(cm.comment, '-^-^-') AS coms, COUNT(cm.comment) AS com_count, GROUP_CONCAT(cm.id) AS coms_id, r.pick_up_date AS startDate, r.return_date AS finishDate, r.name AS userName, r.email AS userEmail, r.com AS userCom, cm.id AS com_id, comment AS com
  FROM kolts AS k
  LEFT JOIN kolts_color AS c
  ON k.color_id = c.id

  LEFT JOIN comments AS cm
  ON k.id = cm.kolt_id

  LEFT JOIN rental_info AS r
  ON k.id = r.kolt_id
  GROUP BY k.id
  `;
    requests = [];
  } else if (req.query['color-id']) {
    sql = `
  SELECT
  k.id, c.title AS koltColor, regCode, isBusy, status, lastUsed, totalRide, k.photo, GROUP_CONCAT(cm.comment, '-^-^-') AS coms, COUNT(cm.comment) AS com_count, GROUP_CONCAT(cm.id) AS coms_id, r.pick_up_date AS startDate, r.return_date AS finishDate, r.name AS userName, r.email AS userEmail, r.com AS userCom, cm.id AS com_id, comment AS coms

  FROM kolts AS k
  LEFT JOIN kolts_color AS c
  ON k.color_id = c.id

  LEFT JOIN comments AS cm
  ON k.id = cm.kolt_id

  LEFT JOIN rental_info AS r
  ON k.id = r.kolt_id

  WHERE k.color_id = ?
  GROUP BY k.id
  `;
    requests = [req.query['color-id']];
  } else {
    sql = `
    SELECT
    k.id, c.title AS koltColor, regCode, isBusy, status, lastUsed, totalRide, k.photo, GROUP_CONCAT(cm.comment, '-^-^-') AS coms, COUNT(cm.comment) AS com_count, GROUP_CONCAT(cm.id) AS coms_id, r.pick_up_date AS startDate, r.return_date AS finishDate, r.name AS userName, r.email AS userEmail, r.com AS userCom, cm.id AS com_id, comment AS coms
    FROM kolts AS k
    LEFT JOIN kolts_color AS c
    ON k.color_id = c.id
  
    LEFT JOIN comments AS cm
    ON k.id = cm.kolt_id
    LEFT JOIN rental_info AS r
    ON k.id = r.kolt_id
  
    WHERE k.regCode LIKE ?
    GROUP BY k.id
    `;
    requests = ['%' + req.query['s'] + '%'];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ KOLTS COLORS
app.get('/spalvos', (req, res) => {
  const sql = `
  SELECT
  c.title, c.id, COUNT(k.id) AS kolts_count, SUM(k.isBusy = 0) AS busy, SUM(k.isBusy = 1) AS ready, k.photo AS koltImg
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
  (regCode, isBusy, lastUsed, totalRide, color_id, photo)
  VALUES (?, ?, ?, ?, ?, ?)
  `;
  con.query(sql, [req.body.regCode, req.body.isBusy, req.body.lastUsed ? req.body.lastUsed : '', req.body.totalRide ? req.body.totalRide : 0, req.body.color === '0' ? null : req.body.color, req.body.photo], (err, result) => {
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
app.delete('/paspirtukai/:id', (req, res) => {
  const sql = `
  DELETE FROM kolts
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Kolt istrintas is saraso', type: 'danger' } });
  })
});

// DELETE KOLT Photo
app.delete('/nuotrauka/:id', (req, res) => {
  const sql = `
  UPDATE kolts
  SET photo = null
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Nuotrauka sekimingai istrinta', type: 'info' } });
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
app.put('/paspirtukai/:id', (req, res) => {
  const sql = `
  UPDATE kolts 
  SET regCode = ?, isBusy = ?, lastUsed = ?, totalRide = ?, color_id = ?, photo = ?
  where id = ?
  `;
  con.query(sql, [req.body.regCode, req.body.isBusy, req.body.lastUsed, req.body.totalRide, req.body.color === '0' ? null : req.body.color, req.body.photo, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Kolt duomenys sekmingai atnaujinti', type: 'info' } });
  });
});

// READ FRONT KOLTS
app.get('/front/paspirtukai', (req, res) => {
  let sql;
  let requests;
  if (!req.query['color-id'] && !req.query['s']) {
    sql = `
  SELECT
  k.id, c.title AS koltColor, regCode, isBusy, status, lastUsed, totalRide, k.photo, color_id, GROUP_CONCAT(k.id) AS koltIds, GROUP_CONCAT(k.regCode) AS regCodes, GROUP_CONCAT(k.isBusy) AS statuses, GROUP_CONCAT(k.lastUsed) AS lastUses, GROUP_CONCAT(k.totalRide) AS totalRides, COUNT(k.id) AS kolts_count, SUM(k.isBusy = 0) AS busy, SUM(k.isBusy = 1) AS ready, GROUP_CONCAT(cm.comment, '-^-^-') AS coms, COUNT(cm.comment) AS com_count, k.rates, k.rate_sum, cm.id AS com_id, cm.comment AS com
  FROM kolts AS k
  LEFT JOIN kolts_color AS c
  ON k.color_id = c.id
  LEFT JOIN comments AS cm
  ON k.id = cm.kolt_id
  LEFT JOIN rental_info AS r
  ON k.id = r.kolt_id
  GROUP BY k.id
  `;
    requests = [];
  } else if (req.query['color-id']) {
    sql = `
    SELECT
    k.id, c.title AS koltColor, regCode, isBusy, status, lastUsed, totalRide, k.photo, color_id, GROUP_CONCAT(k.id) AS koltIds, GROUP_CONCAT(k.regCode) AS regCodes, GROUP_CONCAT(k.isBusy) AS statuses, GROUP_CONCAT(k.lastUsed) AS lastUses, GROUP_CONCAT(k.totalRide) AS totalRides, COUNT(k.id) AS kolts_count, SUM(k.isBusy = 0) AS busy, SUM(k.isBusy = 1) AS ready, GROUP_CONCAT(cm.comment, '-^-^-') AS coms, COUNT(cm.comment) AS com_count, k.rates, k.rate_sum, cm.id AS com_id, cm.comment AS com
    FROM kolts AS k
    LEFT JOIN kolts_color AS c
    ON k.color_id = c.id
    LEFT JOIN comments AS cm
    ON k.id = cm.kolt_id
    LEFT JOIN rental_info AS r
    ON k.id = r.kolt_id

    WHERE k.color_id = ?
    GROUP BY k.id
    `;
    requests = [req.query['color-id']];
  } else {
    sql = `
    SELECT
    k.id, c.title AS koltColor, regCode, isBusy, status, lastUsed, totalRide, k.photo, color_id, GROUP_CONCAT(k.id) AS koltIds, GROUP_CONCAT(k.regCode) AS regCodes, GROUP_CONCAT(k.isBusy) AS statuses, GROUP_CONCAT(k.lastUsed) AS lastUses, GROUP_CONCAT(k.totalRide) AS totalRides, COUNT(k.id) AS kolts_count, SUM(k.isBusy = 0) AS busy, SUM(k.isBusy = 1) AS ready, GROUP_CONCAT(cm.comment, '-^-^-') AS coms, COUNT(cm.comment) AS com_count, k.rates, k.rate_sum, cm.id AS com_id, cm.comment AS com
    FROM kolts AS k
    LEFT JOIN kolts_color AS c
    ON k.color_id = c.id
    LEFT JOIN comments AS cm
    ON k.id = cm.kolt_id
    LEFT JOIN rental_info AS r
    ON k.id = r.kolt_id

    WHERE regCode LIKE ?
    GROUP BY k.id
    `;
    requests = ['%' + req.query['s'] + '%'];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ FRONT KOLTS COLORS
app.get('/front/spalvos', (req, res) => {
  const sql = `
  SELECT
  c.title, c.id, COUNT(k.id) AS kolts_count, SUM(k.isBusy = 0) AS busy, SUM(k.isBusy = 1) AS ready, GROUP_CONCAT(k.regCode) AS regCodes, GROUP_CONCAT(k.isBusy) AS statuses, GROUP_CONCAT(k.lastUsed) AS lastUses, GROUP_CONCAT(k.totalRide) AS totalRides
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

// READ Rental info
app.get('/rezervacijos', (req, res) => {
  let sql;
  let requests;
  if (!req.query['s']) {
    sql = `
  SELECT
  r.id, pick_up_date, return_date, name, email, com, kolt_id, k.regCode AS kolt_code, distance, archive
  FROM rental_info AS r
  LEFT JOIN kolts AS k
  ON r.kolt_id = k.id
  `;
    requests = [];
  } else {
    sql = `
    SELECT
    r.id, pick_up_date, return_date, name, email, com, kolt_id, k.regCode AS kolt_code, distance, archive
    FROM rental_info AS r
    LEFT JOIN kolts AS k
    ON r.kolt_id = k.id
    WHERE k.regCode LIKE ?
    `;
    requests = ['%' + req.query['s'] + '%'];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE FRONT Rental Info
app.post('/rezervacijos', (req, res) => {
  const sql = `
  INSERT INTO rental_info
      (pick_up_date, return_date, name, email, com, kolt_id)
    VALUES(?, ?, ?, ?, ?, ?)
      `;
  con.query(sql, [req.body.pickUpDate, req.body.returnDate, req.body.name, req.body.email, req.body.comments, req.body.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jūsų rezrvacijos patvirtinimas bus atsiųstas į nurodytą el. paštą.', type: 'success' } });
  })
});

// CREATE FRONT COMMENT
app.post('/front/komentarai', (req, res) => {
  const sql = `
  INSERT INTO comments
      (comment, kolt_id)
    VALUES(?, ?)
      `;
  con.query(sql, [req.body.comment, req.body.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu komentaras issiustas. Dekojame uz atsiliepima!.', type: 'success' } });
  })
});

// READ BACK COMMENTS
app.get('/komentarai', (req, res) => {
  const sql = `
  SELECT
  GROUP_CONCAT(cm.id) AS coms_id, GROUP_CONCAT(comment, '-^-^-') AS coms, COUNT(comment) AS com_count, kolt_id, regCode, photo, color_id 
  FROM comments AS cm
  LEFT JOIN kolts AS k
  ON cm.kolt_id = k.id
  GROUP BY k.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


// DELETE Comments
app.delete('/komentarai/:comId', (req, res) => {
  const sql = `
  DELETE FROM comments
  WHERE id = ?
      `;
  con.query(sql, [req.params.comId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Komentaras yra istrintas.', type: 'danger' } });
  })
});

// EDIT FRONT KOLT reitings
app.put('/front/reitingai/:id', (req, res) => {
  const sql = `
  UPDATE kolts 
  SET rates = rates + 1, rate_sum = rate_sum + ?
      where id = ?
        `;
  con.query(sql, [req.body.rate, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu balsas sekmingai iskaitytas. Aciu uz ivertinima!', type: 'info' } });
  });
});

// Update STATUS Back
app.put('/statusas/:id', (req, res) => {
  const sql = `
  UPDATE kolts 
  SET status = 1
  WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Rezervacija patvirtinta!', type: 'info' } });
  });
});

// Update STATUS Front
app.put('/front/statusas/:id', (req, res) => {
  const sql = `
  UPDATE kolts 
  SET status = 0
  WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Rezervacija patvirtinta!', type: 'info' } });
  });
});

// Update ARCHIVE
app.put('/archyvas/:id', (req, res) => {
  const sql = `
  UPDATE rental_info 
  SET archive = 1
  WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'irasas idetas i archyva!', type: 'info' } });
  });
});


// EDIT FRONT rental-info distance
app.put('/front/atstumas/:userId', (req, res) => {
  const sql = `
  UPDATE rental_info 
  SET distance = ?, return_date = ?
      WHERE id = ?
        `;
  con.query(sql, [req.body.distance, req.body.returnDate, req.params.userId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu duomenys sekmingai irasyti. Aciu, kad renketes mus!', type: 'info' } });
  });
});


app.listen(port, () => {
  console.log(`Peleda klauso porto ${port} `)
})