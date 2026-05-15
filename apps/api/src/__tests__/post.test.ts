import { prisma } from '../config/prisma'
import {createPost, deletePost, getFeed, getPost} from '../controllers/postController'
import { Request, Response } from 'express'

jest.mock('../config/prisma', () => ({
    prisma: {
        post: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
            create: jest.fn(),
            count: jest.fn(),
            update: jest.fn(), 
        },
        follow: {
            findMany: jest.fn(),
        }
    }
}))

jest.mock('../config/awss3', () => ({
    s3: {
        send: jest.fn().mockResolvedValue({})
    },
    createUpload: jest.fn(() => ({
        single: jest.fn(() => (req: any, res: any, next: any) => next())
    }))
}))

const mockRequest = {
    body: {
        description: "description",
        photoUrl: "photoUrl"
    },
    params: {
        id: 1
    },
    user: {
        id: 1
    },
    file: {location: 'somelocation'}
} as unknown as Request

let mockResponse: Partial<Response>

let post = {
    id: 2,
    photoUrl: "photoUrl",
    description: "descrition",
    userId: 1,
    createdAt: "data",
}

beforeEach(() => {
    jest.clearAllMocks()
    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
})

describe('createPost', () => {
    test('should return status 201 and a post', async () => {
        (prisma.post.create as jest.Mock).mockResolvedValue(post);

        await createPost(mockRequest, mockResponse as Response)

        expect(prisma.post.create).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, post });
    })

})

describe('getPost', () => {
test('should return status 200 and a post', async () => {
    (prisma.post.findUnique as jest.Mock).mockResolvedValue(post);
    (prisma.post.count as jest.Mock).mockResolvedValue(10);
    (prisma.post.findMany as jest.Mock).mockResolvedValue([post]);

    await getPost(mockRequest, mockResponse as Response)

    expect(prisma.post.findUnique).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledWith(200)
})

    test('should return status 404 and an error message', async () => {
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(getPost(mockRequest, mockResponse as Response)).rejects
        .toThrow(expect.objectContaining({ statusCode: 404, message: 'Post not found' }))

        expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
    })
})

describe('deletePost', () => {
    test('deletePost should return status 200', async () => {
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(post);

        await deletePost(mockRequest, mockResponse as Response)

        expect(prisma.post.delete).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true});
    })

    test('should return status 404 and an error message', async () => {
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(deletePost(mockRequest, mockResponse as Response)).rejects
        .toThrow(expect.objectContaining({ statusCode: 404, message: "Post not found" }))

        expect(prisma.post.delete).not.toHaveBeenCalled();
    })

})

describe('getFeed', () => {
    test('feed should return status 200', async () => {
        (prisma.post.findMany as jest.Mock).mockResolvedValue([post]);
        (prisma.follow.findMany as jest.Mock).mockResolvedValue([{followerId: 1, followedId: 2}]);

        await getFeed(mockRequest, mockResponse as Response)

        expect(prisma.post.findMany).toHaveBeenCalledTimes(1);
        expect(prisma.follow.findMany).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: [post]});
    })

    test('should return status 200 and an empty array if user does not follow anyone', async () => {
        (prisma.follow.findMany as jest.Mock).mockResolvedValue(null);

        await getFeed(mockRequest, mockResponse as Response)

        expect(prisma.post.findMany).not.toHaveBeenCalled();
        expect(prisma.follow.findMany).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: []});
    })

})



