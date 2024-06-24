// ESM import syntax
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

// ESM export syntax
export { User, Post };
