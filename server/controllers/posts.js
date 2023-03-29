import Post from '../model/Post.js'
import User from "../model/User.js";
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import Posts from "../routes/posts.js";

// Create Post
export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body
        const user = await User.findOne(req.userId) // Waiting

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            await req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))


            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: user._id,
            })


            await newPostWithImage.save()

            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage },
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        })

        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage },
        })

        res.json(newPostWithoutImage)
    } catch (error) {
        res.status(404).json({ message: 'Что-то пошло не так.' })
    }
}

// GET ALL POSTS
export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')

        if (!posts){
            return res.json({ message: 'Нет постов' })
        }

        res.json({ posts,  })
    } catch (error){
        res.status(404).json({ message: 'Не удается получить все посты' })
    }
}
