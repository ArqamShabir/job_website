const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');

const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

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
    const {name, email, phone_number, country_code, password, registration_number } = req.body;
    const phoneNumber = country_code + phone_number;
    const logo = req.file ? req.file.filename : null;

    const sql = 'INSERT INTO companies (name, email, phoneNumber, password, registrationNumber, logo) VALUES (?,?, ? , ?, ?, ?)';
    db.query(sql, [name, email, phoneNumber  , password, registration_number, logo], (err, result) => {
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

app.post('/admin-login' , (req,res) => {
    const {username, password} = req.body;
    const sql = 'SELECT * FROM admin WHERE username = ? AND password = ?;';

    db.query(sql , [username,password] ,(err,results) => {
        if (err) {
            console.error('Error loggin in admin:' , err);
            res.status(500).send('Server error');
            return;
        }//if

        if(results.length>0){
            req.session.adminUsername = results[0].username;
            res.status(200).send('Admin Logged in successfully');

        } else {
            res.status(400).send('Invalid Credentials');
        }//if
    });
});

app.get('/AdminDashboard', (req,res) => {
    const sql = "SELECT companies.name, companies.register_date, companies.phoneNumber, companies.registrationNumber, companies.email, companies.c_status  FROM companies ;"

    db.query(sql, (err,results) => {
        if (err) {
            console.error('Error fetching companies:', err);
            return res.status(500).send('Internal server error');
        }

        if(results.length>0){
            
            res.status(200).send(results);

        } else {
            res.status(400).send('No companies yet');
        }//if
          
    });
});

app.post('/admin-dashboard-verify/:registrationNumber' , (req,res) =>{
    const {registrationNumber} = req.params;

    const sql = 'UPDATE companies SET c_status = true WHERE registrationNumber = ?';

    db.query(sql,[registrationNumber],(err,results) =>{
        if (err) {
            console.error('Error verifying company:', err);
            return res.status(500).send('Internal server error' );
        }

        if (results.length==0) {
            return res.status(404).send(`Company with registration number ${registrationNumber} not found`);
        } else {
            res.status(200).send(`Company with registeration number ${registrationNumber} verified`);
        }//if

    });
});

app.delete('/admin-dashboard-delete/:registrationNumber', (req, res) => {
    const { registrationNumber } = req.params;
    const sql = 'DELETE FROM companies WHERE registrationNumber = ?';
    db.query(sql, [registrationNumber], (err, results) => {
      if (err) {
        console.error('Error deleting company:', err);
        return res.status(500).send('Internal server error');
      }
      
    if (results.length==0) {
        return res.status(404).send(`Company with registration number ${registrationNumber} not found`);
    } else {
        res.status(200).send(`Company with registeration number ${registrationNumber} deleted`);
    }//if

    });
  });

  app.get('/admin-dashboard-search',  (req, res) => {
    const { name, registrationNumber } = req.query;

    let sql = 'SELECT companies.name, companies.register_date, companies.phoneNumber, companies.registrationNumber, companies.email FROM companies ';
    const params = [];

    if (name) {
        sql += ' WHERE name LIKE ?';
        params.push(`%${name}%`);
      }
    
      if (registrationNumber) {
        if (name) {
          sql += ' AND registrationNumber = ?';
        } else {
          sql += ' WHERE registrationNumber = ?';
        }
        params.push(registrationNumber);
      }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error searching for companies', err);
            res.status(500).send('Server error');
            return;
        }

        res.send(results);
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
