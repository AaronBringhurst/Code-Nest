
import User from "../models/user.js";

const userData = [
    {
        name: "Alice Crypto",
        username: "alicecrypto",
        email: "alice@example.com",
        password: "securepassword123"
    },
    {
        name: "Bob Blockchain",
        username: "bobbchain",
        email: "bob@example.com",
        password: "passwordsecure456"
    },
    {
        name: "Carol Coin",
        username: "carolcoin",
        email: "carol@example.com",
        password: "password789"
    }
];

const seedUsers = async () => {
    try{
        await User.bulkCreate(userData);
        console.log('User data seeded');
    } catch (err){
        console.log('User data not seeded!', err );
    }
}

export default seedUsers;