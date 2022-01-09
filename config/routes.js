const homController = require('../controlers/homeController')
const authController = require('../controlers/authController');
const wildLifeController = require('../controlers/wildLifeControllers');

module.exports = (app) => {

    app.use('/', homController);
    app.use('/auth', authController);
    app.use('/wildlife', wildLifeController);

}