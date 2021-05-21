const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;


// defining mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
});

app.get('/login', (req, res)=>{
    const params = { }
    res.status(200).render('login1.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database. congo!!")
    }).catch(()=>{
        res.status(400).send("the item was not stores in the database. pls try again after some time")
    });

    // res.status(200).render('contact.pug');
});


// START THE SERVER
app.listen(port, ()=>{
     console.log(`The application started successfully on port ${port} \nDont forget to start "mongod" \n`);
 });