import { prisma } from '../config/prisma'
import { createComment, deleteComment } from '../controllers/commentController';
import { Request, Response } from 'express'

jest.mock('../config/prisma', () => ({
    prisma: {
        comment: {
            deleteMany: jest.fn(),
            create: jest.fn()
        },

    }
}))

const mockRequest = {
    body: {
        body: "testbody"
    },
    params: {
        id: 1
    },
    user: {
        id: 1
    }
} as unknown as Request

let comment = {
    id: 1,
    body: "testbody"
}

let mockResponse: Partial<Response>

beforeEach(() => {
    jest.clearAllMocks()
    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
})

describe('createComment', () => {
    test('should return status 201 and a comment', async () => {
        (prisma.comment.create as jest.Mock).mockResolvedValue(comment);

        await createComment(mockRequest, mockResponse as Response)

        expect(prisma.comment.create).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, comment});
    })

})

describe('deleteComment', () => {
    test('should return status 200', async () => {
        (prisma.comment.deleteMany as jest.Mock).mockResolvedValue({count: 1});

        await deleteComment(mockRequest, mockResponse as Response)

        expect(prisma.comment.deleteMany).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true});
    })
    test('should return status 403 and an error message', async () => {
        (prisma.comment.deleteMany as jest.Mock).mockResolvedValue({count: 0});

        await expect(deleteComment(mockRequest, mockResponse as Response)).rejects
        .toThrow(expect.objectContaining({ statusCode: 403, message: 'Forbidden' }))

        expect(prisma.comment.deleteMany).toHaveBeenCalledTimes(1);
    })

})
