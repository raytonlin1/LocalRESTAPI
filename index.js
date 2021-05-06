/* Main Module
Author: Rayton Lin
Date: 05/05/2021
Purpose: Build REST API using Nodejs and Express. (Node_modules from express not on github.)
*/
/*
app.get();
app.post();
app.put();
app.delete();
*/
const Joi = require('joi'); //Used for API validation and error messages.
const express = require('express');
const app = express();

app.use(express.json()); //Returns a piece of middleware.
const nameapi = [
    {id: 1, name: 'name1'},
    {id: 2, name: 'name2'},
    {id: 3, name: 'name3'}
];

app.get('/api/nameapi',(req,res) => {
    res.send(nameapi);
});

app.get('/api/nameapi/:id', (req, res) => {
    const nameInstance = nameapi.find(c => c.id === parseInt(req.params.id));
    if (!nameInstance) return res.status(404).send('The nameInstance with the given ID was not found.');
    res.send(nameInstance);
})

app.put('/api/nameapi/:id',(req,res) => {
    const nameInstance = nameapi.find(c => c.id === parseInt(req.params.id));
    if (!nameInstance) return res.status(404).send('The nameInstance with the given ID was not found.');
    
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    nameInstance.name = req.body.name;
    res.send(nameInstance);
});

app.post('/api/nameapi',(req,res) => {
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const nameInstance = {id: nameapi.length + 1, name: req.body.name};
    nameapi.push(nameInstance);
    res.send(nameInstance);
});

function validateCourse(nameInstance) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(nameInstance, schema);
}

app.delete('/api/nameapi/:id', (req,res) => {
    const nameInstance = nameapi.find(c => c.id === parseInt(req.params.id));
    if (!nameInstance) return res.status(404).send('The nameInstance with the given ID was not found.');

    const index = nameapi.indexOf(nameInstance);
    nameapi.splice(index, 1);
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}...`));