const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log.')
        }
    });
    next();
});

app.get('/home', (req, res) => {
   res.render('home.hbs', {
    pageTitle: 'welcome to my page',
    currentYear: new Date().getFullYear()
   })
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about page',
        currentYear: new Date().getFullYear()
    }) 
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'ne mere se vratiti'
    });
});
app.listen(3000);


