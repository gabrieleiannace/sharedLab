'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('exams.sqlite', // DB filename
(err) => { if (err) throw err; });


db.close();  