const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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