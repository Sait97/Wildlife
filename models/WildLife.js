const {Schema, model } = require('mongoose');



const schema = new Schema({
    title: {type: String, required: [true, 'Title is required'] },
    keyword: {type: String, required: [true, 'Keyword is required'] },
    location: {type: String, required: [true, 'Location is required'] },
    createdAt: {type: Date, required: true, default: Date.now },
    imageUrl: {type: String, required: [true, 'ImageUrl is required'] },
    description: {type: String, required: [true, 'Description is required'], maxlength: [50, 'Description must be less then  50 charecters '] },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    votesPost: [{type: Schema.Types.ObjectId, ref: 'User' ,default: [] }],
    reitingPost: {type: Number, default: 0 },
 });

module.exports = model('WildLife', schema)
