
import Post from "../models/post.js";

const postData = [
    {

        username: "alicecrypto",
        title: "Getting Started with Ethereum Smart Contracts",
        body: "Learn how to deploy your first smart contract on Ethereum.",
        date: new Date()
    },
    {

        username: "bobbchain",
        title: "Introduction to Decentralized Applications",
        body: "Discover the world of dApps and how they operate on the blockchain.",
        date: new Date()
    },
    {

        username: "carolcoin",
        title: "Understanding Cryptocurrency Wallets",
        body: "A beginner's guide to using and securing crypto wallets.",
        date: new Date()
    },
    {

        username: "alicecrypto",
        title: "Exploring the Impact of Quantum Computing on Cryptography",
        body: "As quantum computing advances, the foundational security of current cryptographic methods comes under threat. This post delves into how quantum computing might crack existing encryption techniques and what that means for the future of secure communications and cryptocurrency.",
        date: new Date()
    },
    {

        username: "bobbchain",
        title: "The Future of Scalability in Blockchain Technology",
        body: "Blockchain technology is revolutionizing how we think about financial systems and data distribution. However, scalability remains a significant challenge, limiting transaction speeds and overall network efficiency. This post examines potential solutions to these scalability issues, including layer 2 solutions like Lightning Network and sharding.",
        date: new Date()
    },
    {

        username: "carolcoin",
        title: "Cryptocurrency Regulations Around the World",
        body: "As cryptocurrencies gain popularity, various governments are moving towards regulating these digital assets. This post explores different regulatory approaches taken by countries and how these regulations affect everything from cryptocurrency trading to initial coin offerings (ICOs).",
        date: new Date()
    }
];

const seedPosts = async () => {
    try{
        await Post.bulkCreate (postData);
        console.log('Posts have been seeded');
} catch (err){
    console.log ('Error seeding postz', err );
    }
}

export default seedPosts;