import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Registration
import User from "../model/User.js";

export const registration  = async (req, res) => {
    try {
        const { username, password } = req.body

        const isUsed = await User.findOne({ username })

        if (isUsed){
            return res.status(401).json({
                message: `Пользователь - ${username} уже зарегестрирован!`
            })
        }

        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash
        })

        const token = jwt.sign({
                id: newUser._id
            }, process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        await newUser.save()

        res.json({
            newUser,
            token,
            message: 'Регистрация прошла успешно!'
        })

    } catch (error) {
        res.status(401).json({
            message: 'Ошибка при регистрации нового пользователя'
        })
    }
}


// Login
export const login  = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if(!user) {
            return res.status(401).json({
                message: `Пользователя - ${username} не существует!`
            })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if (!isPasswordCorrect){
            return res.status(401).json({
                message: `Не верные логин или пароль!`
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.status(200).json({
            token, user, message: 'Вы вошли в систему'
        })

    } catch (error) {
        res.status(401).json({
            message: 'Ошибка при авторизации нового пользователя'
        })
    }
}

// Get mу data
export const getMeData  = async (req, res) => {
    try {
        const user = await User.findOne(req.userId)

        if(!user) {
            return res.status(401).json({
                message: `Пользователя - ${user.username} не существует!`
            })
        }

        const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(401).json({
            message: 'Ошибка при авторизации пользователя'
        })
    }
}
