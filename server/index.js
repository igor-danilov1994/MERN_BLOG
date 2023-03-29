import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import authRout from "./routes/auth.js";
import postRout from "./routes/posts.js";

const app = express()
dotenv.config()

// CONST
const PORT = process.env.PORT || 8080
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.nzgd0mj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`


// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes
app.use('/api/auth', authRout)
app.use('/api/posts', postRout)


async function start ()  {
    try {
        await mongoose.connect(DB_URL)

        app.listen(PORT, () => {
            console.log(`Server start on ${PORT} port`)
        })
    } catch (e){
        console.log('--error--')
    }
}

start()


