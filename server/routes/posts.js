import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAll } from "../controllers/posts.js";

const router = new Router()

// Create createPost
// http://localhost:8080/api/posts
router.post('/', checkAuth, createPost)

// Get all Posts
// http://localhost:8080/api/posts
router.get('/', getAll)


export default router
