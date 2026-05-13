import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: Express.User) => {

        req.user = user;
        return next()
        
    })(req, res, next)
}