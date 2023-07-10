const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql',
})

//connect to MYSQL
db.connect((error) => {
  if (error) {
    throw error;
  }
  console.log('MYSQL connected')
});

//Create database
app.get('/createdb', (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Database Created");
  });
});

//create table
app.get('/createemployee', (req, res) => {
  let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY( ) )'
  db.query(sql, err => {
    if (err) {
      throw err;
    }
    res.send('Employee table created');
  })
})


//insert employee list
app.get('/employee1', (req, res) => {
  let post = { name: 'Adeet Dahal', designation: 'IT officer' }
  let sql = 'INSERT INTO employee SET ?'
  let query = db.query(sql, post, err => {
    if (err) {
      throw err;
    }
    res.send('Employee Added')
  })
})

//select employee
app.get('/getemployee', (req, res) => {
  let sql = 'SELECT * FROM employee'
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send("Employee details fetched");
  })
})

//update employee
app.get('/updateemployee/:id', (req, res) => {
  let newName = 'Its Adeet'
  let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id} `
  let query = db.query(sql, err =>{
    if(err) {
      throw err;
    }
    res.send('Employee Updated')
  })
})

//delt employee
app.get('/deleteemployee/:id', (req,res) => {
  let sql = `DELETE FROM employee WHERE id = ${req.params.id}`
  let query = db.query(sql, err => {
    if(err){
      throw err;
    }
    res.send('Employee deleted')
  })
})

app.use('/api/users', require('./routes/api/users'))

app.post('/api/login', (req, res) => {
  const MasterLogin = {
    id: 16,
    name: 'masteradmin',
    email: 'masteradmin@gmail.com'
  }

  jwt.sign({ MasterLogin: MasterLogin }, 'secretkey', (err, token) => {
    res.json({
      token,
    })
  })
})

app.listen(5000, () => {
  console.log('Server started at port 5000')
})