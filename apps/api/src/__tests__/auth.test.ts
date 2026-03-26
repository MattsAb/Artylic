import { prisma } from '../config/prisma'
import { loginUser, registerUser } from '../controllers/authController'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

jest.mock('../config/prisma', () => ({
    prisma: {
        user: {
            create: jest.fn(),
            findUnique: jest.fn()
        }
    }
}))


const mockRequest = {
    body: {
        username: 'testusername',
        password: 'testpassword',
        email: 'testemail@gmail.com'
    }
} as unknown as Request

let mockResponse: Partial<Response>

beforeEach(() => {
    jest.clearAllMocks()
    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
})

describe('registerUser', () => {
    test('should return status 201 and a jwt token', async () => {
        (prisma.user.create as jest.Mock).mockResolvedValue({ id: 1,email: 'testemail@gmail.com', username: 'testusername' });
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never)
        jest.spyOn(jwt, 'sign').mockReturnValue('token' as never)

        await registerUser(mockRequest, mockResponse as Response)

        expect(jwt.sign).toHaveBeenCalledTimes(1)
        expect(bcrypt.hash).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(201)
        expect(mockResponse.json).toHaveBeenCalledWith({ token: 'token' })
        expect(prisma.user.create).toHaveBeenCalledTimes(1)
    })
    test('should return status 400 and an error message if the email or username is taken', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({email: "testemail@gmail.com"});
        jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never)
        jest.spyOn(jwt, 'sign').mockReturnValue('token' as never)

        await registerUser(mockRequest, mockResponse as Response)

        expect(jwt.sign).not.toHaveBeenCalled()
        expect(bcrypt.hash).not.toHaveBeenCalled()
        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email already taken' })
        expect(prisma.user.create).not.toHaveBeenCalled()
    })
})

describe('loginUser', () => {
    test('should return status 200 and a jwt token', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, email: 'testemail@gmail.com', password: 'testpassword' })
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never)
        jest.spyOn(jwt, 'sign').mockReturnValue('token' as never)

        await loginUser(mockRequest, mockResponse as Response)

        expect(jwt.sign).toHaveBeenCalledTimes(1)
        expect(bcrypt.compare).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith({ token: 'token' })
        expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
    })

    test('should return status 401 if user not found', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

        await loginUser(mockRequest, mockResponse as Response)

        expect(jwt.sign).not.toHaveBeenCalled()
        expect(bcrypt.compare).not.toHaveBeenCalled()
        expect(mockResponse.status).toHaveBeenCalledWith(401)
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' })
        expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
    })

    test('should return status 401 if wrong password', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, email: 'testemail@gmail.com', password: 'testpassword' })
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never)

        await loginUser(mockRequest, mockResponse as Response)

        expect(jwt.sign).not.toHaveBeenCalled()
        expect(bcrypt.compare).toHaveBeenCalled()
        expect(mockResponse.status).toHaveBeenCalledWith(401)
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid credentials' })
        expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
    })
})