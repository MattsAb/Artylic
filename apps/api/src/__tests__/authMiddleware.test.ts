import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { authMiddleware } from '../middleware/authMIddleware'

const mockRequest = {
    body: {
        username: 'testusername',
        password: 'testpassword',
        email: 'testemail@gmail.com'
    }
} as unknown as Request

let mockResponse: Partial<Response>
let mockNext: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
    mockNext = jest.fn()
})

describe('authMiddleware', () => {
    test('should return 401 if unauthorized', () => {

        jest.spyOn(passport, 'authenticate').mockImplementation(
            (strategy, options, callback: any) => {
                callback(null, false)
                return (req: Request, res: Response, next: NextFunction) => {}
            }
        )

        authMiddleware(mockRequest, mockResponse as Response, mockNext)


        expect(mockNext).toHaveBeenCalledWith(
            expect.objectContaining({ statusCode: 401, message: 'Unauthorized' }))
    })

    test('should call next if authenticated', () => {
        const fakeUser = { id: 1, email: 'testemail@gmail.com' }

        jest.spyOn(passport, 'authenticate').mockImplementation(
            (strategy, options, callback: any) => {
                callback(null, fakeUser)
                return (req: Request, res: Response, next: NextFunction) => {}
            }
        )

        authMiddleware(mockRequest, mockResponse as Response, mockNext)

        expect(mockNext).toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })
})