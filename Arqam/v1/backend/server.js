const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
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

const upload = multer({ storage: storage });

app.post('/company-signup', upload.single('logo'), (req, res) => {
    const { email, phone_number, country_code, password, registration_number } = req.body;
    const logo = req.file ? req.file.filename : null;

    const sql = 'INSERT INTO companies (email, phone_number, country_code, password, registration_number, logo) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [email, phone_number, country_code, password, registration_number, logo], (err, result) => {
        if (err) {
            console.error('Error inserting company:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Company registered successfully');
    });
});

app.post('/company-login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM companies WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error logging in company:', err);
            res.status(500).send('Server error');
            return;
        }
        if (results.length > 0) {
            res.status(200).send('Company logged in successfully');
        } else {
            res.status(400).send('Invalid credentials');
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
