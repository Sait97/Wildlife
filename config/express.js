const hbs = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser');

const authMidlewere = require('../midleweres/auth');
const storageMidleware = require('../midleweres/storage')
module.exports = (app) => {
    app.engine('hbs', hbs({
        extname: 'hbs',
    }));
    app.set('view engine', 'hbs');


    app.use('/static', express.static('static'));
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());

    app.use(authMidlewere());
    app.use(storageMidleware());

    
}