
import User from './user.js';
import Post from './post.js';

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


export { User, Post };
export default { User, Post};
