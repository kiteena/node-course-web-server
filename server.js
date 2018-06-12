const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');1

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIT', (text)=>{
    return text.toUpperCase();
});

// request :  url, function to run for express 
// req : headers, body, method 
// resp : respond methods, set status codes 
app.get('/', (req, res)=>{
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Kristina',
    //     like: [
    //         'Hiking',
    //         'Cooking'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to this freshly created home page',
    })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res)=>{
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        welcomeMessage: 'This is the projects page.',
    });
});


app.get('/bad', (req, res)=>{
    res.send({
        error: 'Error',
        message: 'Unable to process request'
    })
});


// bind application to port 
// don't ever stop normally
app.listen(port, ()=> {
    console.log(`Server is up on Port ${port}.`)
});