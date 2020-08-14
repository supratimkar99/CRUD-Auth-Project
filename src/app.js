const express = require('express');
const users = require('./routes/users');
const students = require('./routes/students');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('./db/db')

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.json({"assignment": "CRUD Project with Authentication"})
})

app.use('/users',users);

app.use('/students', validateUser, students);

///////////--MIDDLEWARE--//////////
function validateUser(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        if(!data) {
            throw new Error()
        }
        next()
    }
    catch (error) {
        res.status(401).send({error: 'Not authorized to access this resource'})
    }
}
/////////////////////////////////

app.listen(port, () => {
    console.log("Server listening on port " + port);
})