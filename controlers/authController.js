const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../midleweres/guards');


router.get('/register', isGuest(), (req, res) => {
    res.render('register')
})
router.post(
    '/register',isGuest(),
    body('firstName').isLength({ min: 3 }).withMessage('FirstName must be at least 3 charecters long').bail()
    .isAlphanumeric().withMessage('FirstName may contain only English letters and digits'),
    body('lastName').isLength({ min: 5 }).withMessage('LastName must be at least 5 charecters long').bail()
    .isAlphanumeric().withMessage('LirstName may contain only English letters and digits'),
    body('email').isEmail(),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 charecters long'),
    body('rePass').custom(( value , { req }) => {
        if(value != req.body.password ) {
    throw new Error('Passwords dont match');
    }
    return true;
        }),
    async (req, res) => {
        const { errors }  = validationResult(req);
        try {
            if(errors.length > 0){
              
                throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
            }
            await req.auth.register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
            console.log('here');
            res.redirect('/');
        } catch(err){
            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email
                }
            }
            res.render('register', ctx);
        }
    }
    );
router.get('/login', isGuest(), (req, res) => {
    res.render('login')
})

router.post('/login', isGuest(), async(req, res) => {
    try{
        await req.auth.login(req.body.email, req.body.password);

        res.redirect('/');
    }catch(err){
        let errors = [err.message];
        if(err.type == 'credential'){
            errors = ['Incorect username or password'];
        }
        const ctx = {
            errors,
            userData: {
                email: req.body.email
            }
        }
        res.render('login', ctx);
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;


