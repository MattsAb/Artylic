
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: Express.User) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        req.user = user;
        return next()
    })(req, res, next)
}