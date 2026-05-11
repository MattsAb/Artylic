
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../types/errorTypes'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: Express.User) => {
        if (err || !user) return next(new ApiError(401, 'Unauthorized'));

        req.user = user;
        return next()
    })(req, res, next)
}