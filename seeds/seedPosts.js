
const { Post } = require ('../models');

const postData = [

];

const seedPostData = async () => {
    try{
        await Post.bulkCreate (postData);
        console.log('Posts have been seeded');
} catch (err){
    console.log ('Error seeding postz', err );
    }
}

module.exports = seedPostData;