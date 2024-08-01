const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

//user--------------------------------------------

app.post('/check-user-email', (req, res) => {
    const { email } = req.body;
    const query = 'SELECT * FROM users WHERE js_email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                res.send({ exists: true });
            } else {
                res.send({ exists: false });
            }
        }
    });
});

app.post('/check-user-phone', (req, res) => {
    const { phone } = req.body;
    const query = 'SELECT * FROM users WHERE js_phoneNo = ?';
    db.query(query, [phone], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                res.send({ exists: true });
            } else {
                res.send({ exists: false });
            }
        }
    });
});

app.post('/signUp', (req, res) => {
    const { name, gender, email, phone_number, password } = req.body;
    const sql = 'INSERT INTO users (js_name, js_gender, js_email, js_phoneNo, js_password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, gender, email, phone_number, password], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('User registered successfully');
    });
});

app.post('/login', (req, res) => {
    const {phone_number, password } = req.body;
    const sql = 'SELECT * FROM users WHERE js_phoneNo = ? AND js_password = ?';
    db.query(sql, [phone_number, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            req.session.userPhoneNo = result[0].js_phoneNo;
            res.send(result[0]);
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out');
        }//if
        res.send('Logged out successfully');
    });
});

const upload = multer({ storage: storage });

//company--------------------------------------------------

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
            const company = results[0];
            res.status(200).json({ message: 'Company logged in successfully', company });
        } else {
            res.status(400).send('Invalid credentials');
        }
    });
});


app.get('/company-status/:email', (req, res) => {
    const { email } = req.params;
    const sql = 'SELECT c_status FROM companies WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404).send('Company not found');
        }
    });
});

//admin----------------------------------------------

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

    // First, delete all records related to job_skills
    const deleteJobSkillsSql = 'DELETE FROM job_skills WHERE j_id IN (SELECT j_id FROM jobs WHERE c_registrationNo = ?)';
    db.query(deleteJobSkillsSql, [registrationNumber], (err) => {
        if (err) {
            console.error('Error deleting job skills:', err);
            return res.status(500).send('Internal server error');
        }

        // Next, delete all records related to job_days
        const deleteJobDaysSql = 'DELETE FROM job_days WHERE j_id IN (SELECT j_id FROM jobs WHERE c_registrationNo = ?)';
        db.query(deleteJobDaysSql, [registrationNumber], (err) => {
            if (err) {
                console.error('Error deleting job days:', err);
                return res.status(500).send('Internal server error');
            }

            // Then, delete all jobs related to the company
            const deleteJobsSql = 'DELETE FROM jobs WHERE c_registrationNo = ?';
            db.query(deleteJobsSql, [registrationNumber], (err) => {
                if (err) {
                    console.error('Error deleting jobs:', err);
                    return res.status(500).send('Internal server error');
                }

                // Finally, get the company record to retrieve the logo filename
                const getCompanySql = 'SELECT logo FROM companies WHERE registrationNumber = ?';
                db.query(getCompanySql, [registrationNumber], (err, results) => {
                    if (err) {
                        console.error('Error fetching company:', err);
                        return res.status(500).send('Internal server error');
                    }

                    if (results.length === 0) {
                        return res.status(404).send(`Company with registration number ${registrationNumber} not found`);
                    }

                    const logo = results[0].logo;

                    // Proceed with deleting the company record
                    const deleteCompanySql = 'DELETE FROM companies WHERE registrationNumber = ?';
                    db.query(deleteCompanySql, [registrationNumber], (err) => {
                        if (err) {
                            console.error('Error deleting company:', err);
                            return res.status(500).send('Internal server error');
                        }

                        if (logo) {
                            // Delete the image file from the uploads folder
                            const filePath = path.join(__dirname, 'uploads', logo);
                            fs.unlink(filePath, (err) => {
                                if (err) {
                                    console.error('Error deleting image file:', err);
                                }
                            });
                        }

                        res.status(200).send(`Company with registration number ${registrationNumber} and all related jobs deleted`);
                    });
                });
            });
        });
    });
});


app.get('/admin-dashboard-search',  (req, res) => {
    const { name, registrationNumber } = req.query;

    let sql = 'SELECT companies.name, companies.register_date, companies.phoneNumber, companies.registrationNumber, companies.email, companies.c_status FROM companies ';
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
app.post('/admin-logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('Logged out successfully');
    });
});

app.post('/post-job', (req, res) => {
    const { jobTitle, jobCategory, city, education, experience, days, hours, age, gender, minSalary, maxSalary, vacancies, description, skills, c_registrationNo } = req.body;

    // Insert job data into the jobs table
    const sqlInsertJob = 'INSERT INTO jobs (job_title, vacancies, min_salary, max_salary, job_hours, preferred_gender, job_description, age, job_city, education, c_registrationNo, category, experience) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sqlInsertJob, [jobTitle, vacancies, minSalary, maxSalary, hours, gender, description, age, city, education, c_registrationNo, jobCategory, experience], (err, result) => {
        if (err) return res.status(500).send(err);

        const jobId = result.insertId;

        // Insert job days into the job_days table
        const sqlInsertDays = 'INSERT INTO job_days (j_id, day) VALUES ?';
        const jobDaysData = days.map(day => [jobId, day]);

        db.query(sqlInsertDays, [jobDaysData], (err, result) => {
            if (err) return res.status(500).send(err);

            // Insert job skills into the job_skills table
            const sqlInsertSkills = 'INSERT INTO job_skills (j_id, skill) VALUES ?';
            const jobSkillsData = skills.map(skill => [jobId, skill]);

            db.query(sqlInsertSkills, [jobSkillsData], (err, result) => {
                if (err) return res.status(500).send(err);
                res.status(200).send('Job posted successfully');
            });
        });
    });
});

app.get('/company-info/:registrationNumber', (req, res) => {
    const { registrationNumber } = req.params;

    // Query to get company name and job count
    const sql = `
        SELECT companies.name, COUNT(jobs.j_id) AS jobCount
        FROM companies
        LEFT JOIN jobs ON companies.registrationNumber = jobs.c_registrationNo
        WHERE companies.registrationNumber = ?
        GROUP BY companies.name
    `;
    
    db.query(sql, [registrationNumber], (err, results) => {
        if (err) {
            console.error('Error fetching company info:', err);
            return res.status(500).send('Internal server error');
        }

        if (results.length > 0) {
            res.send(results[0]);
        } else {
            res.status(404).send('Company not found');
        }
    });
});

app.get('/open-job-counts', (req, res) => {
    const query = 'SELECT category, COUNT(*) as count FROM jobs WHERE j_status = TRUE GROUP BY category';

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error retrieving open job counts' });
    } else {
      res.send(results);
    }
  });
});


app.get('/show-user-jobs', (req, res) => {
    const  category  = req.query.category;

    let query ;
    if (category === 'Other') {
        query = 'SELECT * FROM jobs';
    } else {
        query = 'SELECT * FROM jobs WHERE category = ?';
    }

    db.query(query, [category], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(results);
    }
    });
  });

//   app.get('/show-user-jobs', (req, res) => {
//     const { category, jobTitle, city, salary } = req.query;
  
//     let query ;
//     if (category === 'Other') {
//         query = 'SELECT * FROM jobs';
//     } else {
//         query = 'SELECT * FROM jobs WHERE category = ?';
//     }

//     const queryParams = [category];
  
//     if (jobTitle) {
//       query += ' AND job_title LIKE ?';
//       queryParams.push(`%${jobTitle}%`);
//     }
  
//     if (city) {
//       query += ' AND job_city LIKE ?';
//       queryParams.push(`%${city}%`);
//     }
  
//     if (salary) {
//       query += ' AND (min_salary <= ? AND max_salary >= ?)';
//       queryParams.push(salary, salary);
//     }
  
//     db.query(query, queryParams, (error, results) => {
//       if (error) {
//         console.error('Error fetching jobs:', error);
//         return res.status(500).send('Internal Server Error');
//       }
//       res.send(results);
//     });
//   });




app.get('/one-job/:jobId', (req, res) => {
    const jobId = req.params.jobId;
    const query = `SELECT jobs.*, companies.name , companies.logo FROM  jobs JOIN  companies ON (jobs.c_registrationNo = companies.registrationNumber) WHERE  jobs.j_id = ?;`;
  
    db.query(query, [jobId], (err, results) => {
      if (err) {
        console.error('Error fetching job details:', err);
        res.status(500).send('Failed to fetch job details');
      } 

      if (results.length > 0) {
        res.send(results[0]);
    } else {
        res.status(404).send('Company not found');
    }

    });
  });

  app.get('/one-job/:jobId/skills', (req, res) => {
    const jobId = req.params.jobId;
    const query = `SELECT skill FROM  job_skills WHERE  j_id =?
    `;
    db.query(query, [jobId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Error retrieving skills' });
      } else {
        const skills = results.map((row) => row.skill);
        res.send(skills);
      }
    });
  });

  app.get('/one-job/:jobId/days', (req, res) => {
    const jobId = req.params.jobId;
    const query = `SELECT day FROM  job_days WHERE  j_id =?`;
    db.query(query, [jobId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Error retrieving days' });
      } else {
        const days = results.map((row) => row.day);
        res.send(days);
      }
    });
  });
  

//   app.post('/user-apply-job', (req, res) => {
//     const { name, gender, email,  phoneNo, age,  education,  experience,  j_id ,  c_registrationNo  } = req.body;

//     const sqlInsertJob = 'INSERT INTO applicant (app_gender, app_name, app_email, app_age, app_education , app_experience, app_phoneNo , j_id, c_registrationNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
//     db.query(sqlInsertJob, [gender, name, email, age, education , experience, phoneNo , j_id, c_registrationNo], (err, result) => {
//         if (err) return res.status(500).send(err);

//         res.status(200).send('Application submitted successfully');

    
//     });
// });

app.post('/user-apply-job', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'proofs', maxCount: 10 }]), (req, res) => {
    const {
      name,
      gender,
      email,
      phoneNo,
      age,
      education,
      experience,
      j_id,
      c_registrationNo,
      js_id
    } = req.body;
  
    const resume = req.files['resume'][0].path;
    const proofs = req.files['proofs'].map(file => file.path);
  
    // Insert applicant details into the applicant table
    db.query('INSERT INTO applicant (app_resume, app_gender, app_name, app_email, app_age, app_education, app_experience, app_phoneNo, j_id, c_registrationNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [resume, gender, name, email, age, education, experience, phoneNo, j_id, c_registrationNo], (error, results) => {
      if (error) {
        console.error('Error inserting applicant data:', error);
        return res.status(500).send('Error inserting applicant data');
      }
  
      const appId = results.insertId; // Get the inserted applicant's ID
  
      // Insert each proof into the proofs table
      const proofValues = proofs.map(proof => [appId, proof]);
  
      db.query('INSERT INTO proofs (app_id, proof) VALUES ?', [proofValues], (error) => {
        if (error) {
          console.error('Error inserting proofs:', error);
          return res.status(500).send('Error inserting proofs');
        }
  
        res.status(200).send('Application submitted successfully');

        

        //Insert into apply table
        const applyQuery = 'INSERT INTO apply (js_id, job_id) VALUES (?, ?)';
        db.query(applyQuery, [js_id, j_id], (err, result) => {
        if (err) {
            console.error('Error inserting into apply table:', err);
            return res.status(500).send('Error submitting data into apply table');
        }

        res.status(200).send('Data Submitted to apply table');
        });


      });
    });
  });



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
