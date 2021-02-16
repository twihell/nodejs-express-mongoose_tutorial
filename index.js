const express = require('express');
const mongoose = require('mongoose');
const expHandlebars = require('express-handlebars'); //templating tool that allows you to create varioud templates
const todoRoutes = require('./routes/todos');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const handlebars = expHandlebars.create({ //this is how you configure/initialize handlebars
    defaultLayout: 'main', //file-name for future html files
    extname: 'hbs' //default extension name; without this line, the extension would be '.handlebars'
})

app.engine('hbs', handlebars.engine) /*express has a method called "engine()" which is used to render html pages;
this ^ line basically registers handlebars engine within the given express app; because we will use it later*/

app.set('view engine', 'hbs'); //using the previously registered engine
app.set('views', 'views');


app.use(express.urlencoded({ extended: true })); //method used to correctly parse urls
app.use(express.static(path.join(__dirname, 'public')));//method used to properly read css files
app.use(todoRoutes);

async function start() {
    try {
        await mongoose.connect(`${process.env.MONGODBURL}`, {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Server has been started');
        })
    } catch (error) {
        console.log(error);
    }
}

start();
