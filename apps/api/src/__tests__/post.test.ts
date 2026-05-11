import { prisma } from '../config/prisma'
import {createPost, deletePost, getFeed, getPost} from '../controllers/postController'
import { Request, Response } from 'express'

jest.mock('../config/prisma', () => ({
    prisma: {
        post: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            deleteMany: jest.fn(),
            create: jest.fn()
        },
        follow: {
            findMany: jest.fn(),
        }
    }
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
    }
} as unknown as Request

let mockResponse: Partial<Response>

let post = {
    id: 2,
    photoUrl: "photoUrl",
    descrition: "descrition"
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

        await getPost(mockRequest, mockResponse as Response)

        expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, post });
    })

    test('should return status 404 and an error message', async () => {
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(getPost(mockRequest, mockResponse as Response)).rejects
        .toThrow(expect.objectContaining({ statusCode: 404, message: 'Post not found' }))

        expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
    })
})

describe('deletePost', () => {
    test('should return status 200', async () => {
        (prisma.post.deleteMany as jest.Mock).mockResolvedValue({count: 1});

        await deletePost(mockRequest, mockResponse as Response)

        expect(prisma.post.deleteMany).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true});
    })

    test('should return status 403 and an error message', async () => {
        (prisma.post.deleteMany as jest.Mock).mockResolvedValue({count: 0});

        await expect(deletePost(mockRequest, mockResponse as Response)).rejects
        .toThrow(expect.objectContaining({ statusCode: 403, message: 'Forbidden' }))

        expect(prisma.post.deleteMany).toHaveBeenCalledTimes(1);
    })

})

describe('getFeed', () => {
    test('should return status 200', async () => {
        (prisma.post.findMany as jest.Mock).mockResolvedValue([post]);
        (prisma.follow.findMany as jest.Mock).mockResolvedValue([{followerId: 1, followedId: 2}]);

        await getFeed(mockRequest, mockResponse as Response)

        expect(prisma.post.findMany).toHaveBeenCalledTimes(1);
        expect(prisma.follow.findMany).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, posts: [post]});
    })

    test('should return status 200 and an empty array if user does not follow anyone', async () => {
        (prisma.follow.findMany as jest.Mock).mockResolvedValue(null);

        await getFeed(mockRequest, mockResponse as Response)

        expect(prisma.post.findMany).not.toHaveBeenCalled();
        expect(prisma.follow.findMany).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, posts: []});
    })

})



