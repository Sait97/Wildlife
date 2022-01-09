const router = require('express').Router();
const { parseError } = require('../utils/parser');
const { isUser } = require('../midleweres/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('wildlife/create');
});

router.post('/create', isUser(), async (req, res) => {
    try {
        const wildLifeData = {
            title: req.body.title,
            keyword:  req.body.keyword,
            location:  req.body.location,
            imageUrl:  req.body.imageUrl,
            description:  req.body.description,
            author: req.user._id
            
        }
        await req.storage.createWildLife(wildLifeData);

        res.redirect('/allPosts')
    } catch (err) {

        const ctx = {
            errors: parseError(err),
            wildLifeData: {
                title: req.body.title,
                keyword:  req.body.keyword,
                location:  req.body.location,
                imageUrl:  req.body.imageUrl,
                description:  req.body.description,
                author: req.user._id
            }
        }
        res.render('wildlife/create', ctx)

    }
})

router.get('/details/:id', async (req, res) => {
    try {

        const wildLife = await req.storage.getWildLifeById(req.params.id);
   
        wildLife.hasUser = Boolean(req.user);
        wildLife.isAuthor = req.user && req.user._id == wildLife.author;
        // wildLife.vote = req.user && wildlife.votesPost.find(u => u._id == req.user._id);

        res.render('wildlife/details', { wildLife })
    } catch (err) {
       
        res.redirect('/404');
    }

});
router.get('/edit/:id', isUser(), async (req, res) => {
    try {

        const wildlife = await req.storage.getWildLifeById(req.params.id);
        if (wildlife.author != req.user._id) {
            throw new Error('Cannot edit wildlife you havent.')
        }
        res.render('wildlife/edit', { wildlife })
    } catch (err) {
        
        res.redirect('/wildlife/details/' + req.params.id);
    }
});

router.post('/edit/:id', isUser(), async(req, res) => {

    try{
        const wildlife = await req.storage.getWildLifeById(req.params.id);
        if (wildlife.author != req.user._id) {
            throw new Error('Cannot edit wildlife you havent.')
        }
       await req.storage.editWildLife(req.params.id, req.body);
       res.redirect('/allPosts')
    }catch(err){
        const ctx = {
            errors: parseError(err),
            wildLifeData: {
                title: req.body.title,
                keyword:  req.body.keyword,
                location:  req.body.location,
                imageUrl:  req.body.imageUrl,
                description:  req.body.description,
                author: req.user._id
            }
        }
        res.render('wildlife/edit', ctx);
    }

})

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const wildlife = await req.storage.getWildLifeById(req.params.id)
       
        if (wildLife.author != req.user._id) {
            
            throw new Error('Cannot delete wildlife you havent.')
        }
        await req.storage.deleteWildlife(req.params.id)
        res.redirect('/allPosts')
    } catch (err) {

        res.redirect('/wildlife/details/' + req.params.id)
    }
});

// router.get('/like/:id',isUser(), async (req, res)=>{ 
//     try {
//         const play = await req.storage.getPlayById(req.params.id)

//         if (play.author == req.user._id) {
//             throw new Error('Cannot delete play you havent.')
//         }
//         await req.storage.likePlay(req.params.id, req.user._id)
//         res.redirect('/play/details/' + req.params.id);
//     } catch (err) {

//         res.redirect('/play/details/' + req.params.id)
//     }
// })
module.exports = router;