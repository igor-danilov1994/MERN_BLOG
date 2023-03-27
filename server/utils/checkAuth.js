import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            res.userId = decoded.id
            next()
        } catch (error){
            res.status(401).json({
                massage: 'Нет доступа'
            })
        }
    } else {
        res.status(401).json({
            massage: 'Нет доступа'
        })
    }
}
