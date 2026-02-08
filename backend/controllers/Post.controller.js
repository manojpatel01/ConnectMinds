import PostModel from "../models/Post.model.js";
import UserModel from "../models/User.model.js";

export async function getAllPosts(req,res) 
{
    let posts = await PostModel.find().populate("user");
    posts = posts.filter(post => post.user !== null);
    return res.status(200).json({
        message:"All posts",
        posts:posts
    });
}

export async function getFeedPosts(req,res) 
{
    try {
        let {user} = req.query;
        
        if (!user) {
            return res.status(400).json({
                message:"User ID is required",
                posts: []
            });
        }
        
        let posts = await PostModel.find().populate("user");
        
        // 🔥 YEH FILTER CHANGE KARO - Sirf null users remove karo 🔥
        let feedPost = posts.filter((post) => {
            // Bas yeh check karo ki user null toh nahi
            return post.user !== null;
        });
        
        return res.status(200).json({
            message:"Feed posts",
            posts:feedPost
        });
    } catch (error) {
        console.error("getFeedPosts Error:", error);
        return res.status(500).json({
            message:"Error fetching feed",
            error: error.message,
            posts: []
        });
    }
}
// export async function getFeedPosts(req,res) 
// {
//     try {
//         let {user} = req.query;
        
//         if (!user) {
//             return res.status(400).json({
//                 message:"User ID is required",
//                 posts: []
//             });
//         }
        
//         let posts = await PostModel.find().populate("user");
        
//         let feedPost = posts.filter((post) => {
//             if (!post.user) {
//                 return false;
//             }
//             if (post.user._id.toString() === user) {
//                 return false;
//             }
//             return true;
//         });
        
//         return res.status(200).json({
//             message:"Feed posts",
//             posts:feedPost
//         });
//     } catch (error) {
//         console.error("getFeedPosts Error:", error);
//         return res.status(500).json({
//             message:"Error fetching feed",
//             error: error.message,
//             posts: []
//         });
//     }
// }

export async function getUserPosts(req,res) 
{
    let {user} = req.query;
    let posts = await PostModel.find().populate("user");
    let userPosts = posts.filter((post) => post.user._id.toString() === user);
    return res.status(200).json({
        message:"user posts",
        posts:userPosts
    });
}

export async function createPost(req,res) 
{
    let data = req.body;
    let post = await PostModel.create(data);
    let postAuthor = await UserModel.findById(post.user._id);
    postAuthor.posts.push(post._id);
    await postAuthor.save();
    return res.status(201).json({
        message:"Post created successfully",
        post:post
    });
}