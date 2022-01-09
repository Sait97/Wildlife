const WildLife = require('../models/WildLife');

async function getTopFour(){

    let sort = { createdAt: -1 };
    

    const wildlife = await WildLife.find({}).sort(sort).lean();

    return wildlife;
}

async function getAllWildLife(){

    const wildLife = await WildLife.find({ }).lean();

    return wildLife;
}

async function getWildLifeById(id){
    return WildLife.findById(id).lean()
}

async function createWildLife(wildLifeData){
    const pattern = new RegExp('^${wildLifeData.title}$', 'i');
    const existing = await WildLife.findOne({ title: {$regex: pattern, }})

    if(existing){
        throw new Error('A wildLife with this name already exist')
    }
    const wildLife = new WildLife(wildLifeData);

    await wildLife.save();

    return wildLife;
}

async function editWildLife(id, wildLifeData){
    const wildLife = await WildLife.findById(id);
   
    wildLife.title = wildLifeData.title.trim();
    wildLife.keyword = wildLifeData.keyword.trim();
    wildLife.location = wildLifeData.location.trim();
    wildLife.createdAt = wildLifeData.createdAt.trim();
    wildLife.imageUrl = wildLifeData.imageUrl.trim();
    wildLife.description = wildLifeData.description.trim();
   
    return wildLife.save();
}

async function deleteWildlife(id){
    return Wildlife.findByIdAndDelete(id);
}

// async function likePlay(playId, userId){
//     const play = await Play.findById(playId);

//     play.userLiked.push(userId);
//     return play.save();
// }

module.exports = {
    getTopFour,
    getAllWildLife,
    createWildLife,
    getWildLifeById,
    editWildLife,
    deleteWildlife
    // likePlay,
}