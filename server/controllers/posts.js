import Post from '../model/Post.js'
import User from "../model/User.js";
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Create post
export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body
        const user = await User.findOne(req.userId)

        if (req.files){
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImg = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId
            })

            await newPostWithImg.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImg }
            })

            return res.json(newPostWithImg)
        }

        const newPostWithOutImg = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId
        })

        await newPostWithOutImg.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithOutImg }
        })
        res.json(newPostWithOutImg)
    } catch (error) {
        res.json({ message: 'Что то пошло не так' })
    }
}
