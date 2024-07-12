const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'job_seeking'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected...');
});

app.post('/signup', (req, res) => {
    const { first_name, last_name, gender, email, country_code, phone_number, password } = req.body;
    const sql = 'INSERT INTO users (first_name, last_name, gender, email, country_code, phone_number, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, gender, email, country_code, phone_number, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('User registered successfully');
    });
});

app.post('/login', (req, res) => {
    const { country_code, phone_number, password } = req.body;
    const sql = 'SELECT * FROM users WHERE country_code = ? AND phone_number = ? AND password = ?';
    db.query(sql, [country_code, phone_number, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
