import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { prisma } from './prisma.js'

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: '/api/v1/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        
        let user = await prisma.user.findFirst({
            where: { providerId: profile.id }
        })

        if (!user) {
            const existingEmail = await prisma.user.findUnique({
                where: { email: profile.emails?.[0].value }
            })

            if (existingEmail) {
                user = await prisma.user.update({
                    where: { email: profile.emails?.[0].value },
                    data: { providerId: profile.id, provider: 'google' }
                })
            } else {
                user = await prisma.user.create({
                    data: {
                        email: profile.emails?.[0].value as string,
                        username: profile.displayName,
                        provider: 'google',
                        providerId: profile.id
                    }
                })
            }
        }

        return done(null, user)
    } catch (err) {
        return done(err as Error, false)
    }
}))

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}, async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: payload.id } })
        return user ? done(null, user) : done(null, false)
    } catch (err) {
        return done(err, false)
    }
}))

passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } })
        done(null, user)
    } catch (err) {
        done(err)
    }
})

export default passport