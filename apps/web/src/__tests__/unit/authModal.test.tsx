import {getByRole, render, screen} from '@testing-library/react'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import SignInModal from '../../components/SignInModal';
import userEvent from '@testing-library/user-event'
import { login, useAuthStore} from "@artylic/api-client";
import { vi } from 'vitest'

vi.mock('@artylic/api-client', () => ({
    login: vi.fn().mockResolvedValue({
         success: true,
          data: { user: {
    username: 'testuser',
    id: 1,
    avatarUrl: 'testurl',
    email: "testemail@gmail.com",
    provider: 'local',
    createdAt: 'date',
}, token: 'token' } }),
    useAuthStore: vi.fn().mockReturnValue({ setAuth: vi.fn()})
}))

vi.mock('../../components/simple_components/googleSIgnIn/GoogleButton', () => ({
    default: () => <button>Sign in with Google</button>
}))

describe('imageComponent render', () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
            <SignInModal 
                onClose={() => console.log('closed')}
                open={true}
            />
            </BrowserRouter>)
    })

    test('should send inofrmation and retrieve a token', async () => {

        await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com')
        await userEvent.type(screen.getByPlaceholderText('Password'), 'test12345')
        screen.getByRole('button', {name: 'Log in'}).click();


        expect(login).toHaveBeenCalledWith({email: 'test@test.com', password: 'test12345'})
    })

    test('should display an error message', async () => {

        const { login } = await import('@artylic/api-client')
        ;(login as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ 
            success: false, 
            error: 'Invalid credentials' 
        })

        await userEvent.type(screen.getByPlaceholderText('Email'), 'wrong@gmail.com')
        await userEvent.type(screen.getByPlaceholderText('Password'), 'wrong')
        screen.getByRole('button', {name: 'Log in'}).click();

       await expect(screen.findByText('Invalid credentials')).resolves.toBeDefined()

    })
})
