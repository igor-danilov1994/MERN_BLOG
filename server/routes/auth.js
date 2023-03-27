import { Router } from "express";
import { getMeData, login, registration } from "../controllers/auth.js";
import {checkAuth} from "../utils/checkAuth.js";

export { Router } from 'express'

const router = new Router()


// Registration
router.post('/registration', registration)

// Login
router.post('/login', login)

// Get mу data
router.get('/me', checkAuth, getMeData)

export default router
