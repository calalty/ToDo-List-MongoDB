const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect('mongodb+srv://calalty:Ozzie123@cluster0-hhvk7.mongodb.net/list?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true});

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))

app.set('view engine', '.hbs')

const ListItem = require('./models/userModel')

app.get('/', async(req, res) => {
    res.render('index')
})

app.post('/', async(req, res) => {
    const list = new ListItem({list: req.body.list})
    const listItem = req.body.list

    await list.save().then(() => {
        res.render('index', {listItem})
    }).catch((error) => {
        res.render('index', {err: `${listItem} already on list`})
    })
})

app.listen(3200,  () => {
    console.log('Server 3200 is running')
})