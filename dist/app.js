// EXTERNAL
const path = require('path');
const engine = require('ejs-mate');
const express = require('express');
const app = express();
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));

//LOCAL
const cities = require('./resources/cities.json');

app.get('/', (req, res) => {
    res.render('home', {cities});
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})