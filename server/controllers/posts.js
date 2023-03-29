import Post from '../model/Post.js'
import User from "../model/User.js";
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

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
