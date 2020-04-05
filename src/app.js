const path = require('path') //__dir func can be called
const express = require('express'); //
const hbs = require('hbs') //for serving handlebars

const app = express();

const port = process.env.PORT || 3000 //get port from server like heroku or 3000

// define path
const staticFilePath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

// set these paths
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// serve static files
app.use(express.static(staticFilePath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home | Covid-19 Tracker',
        name: 'sumit'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Covid-19 Tracker',
        name: 'sumit'
    });
});

app.get('/statewise', (req, res) => {
    res.render('statewise', {
        title: 'Statewise Data | Covid-19 Tracker',
        name: 'sumit'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Me | Covid-19 Tracker',
        name: 'sumit'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 | Page Not Found',
        name: 'sumit'
    });
});


app.listen(port, () => console.log("server is up on port " + port));