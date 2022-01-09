const router = require('express').Router();


router.get('/', async(req, res) => {
    
    const wildLife = await req.storage.getAllWildLife();
    

    res.render('home', { wildLife });
});


router.get('/allPosts', async(req, res) => {
    
   
    const wildLife = await req.storage.getAllWildLife();
    

    res.render('allPosts', { wildLife });
})




module.exports = router;