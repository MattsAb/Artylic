
import {describe, expect, test } from 'vitest'


import { useAuthStore } from '@artylic/api-client';

const testUser = {
    username: 'testuser',
    id: 1,
    avatarUrl: 'testurl',
    email: "testemail@gmail.com",
    provider: 'local',
    createdAt: 'date',
}

describe('authStore', () => {
    test('should set user information and retrieve it', () => {

        useAuthStore.getState().setAuth(testUser, 'testToken')
        
        const { user, token, isAuthenticated } = useAuthStore.getState()

        expect(user).toEqual(testUser);
        expect(token).toBe('testToken');
        expect(isAuthenticated).toBe(true);

    })

    test('should clear user information', () => {
        useAuthStore.getState().setAuth(testUser, 'testToken')
        useAuthStore.getState().clearAuth()

        const { user, token, isAuthenticated } = useAuthStore.getState()

        expect(user).toBeNull()
        expect(token).toBeNull()
        expect(isAuthenticated).toBe(false)
    })
})
