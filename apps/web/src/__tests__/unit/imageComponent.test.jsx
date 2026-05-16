import {getByRole, render, screen} from '@testing-library/react'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import App from '../../App';
import { BrowserRouter } from 'react-router-dom'
import ImageComponent from '../../components/ImageComponent';
import defaultIcon from '../../assets/new_artylic_user_Icon.png'



describe('imageComponent render', () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <ImageComponent
                    id={1}
                    url={defaultIcon}
                    username='testuser'
                    likes={5}
                />
            </BrowserRouter>)
    })

    test('should display all imageComponent information', () => {

        expect(screen.getByText(/testuser/i)).toBeDefined()
        expect(screen.getByText(/5/i)).toBeDefined()
        expect(screen.getByRole('img')).toBeDefined()
    })

    test('should redirect the user to a post with image id', () => {

        screen.getByRole('button').click()
        expect(window.location.href).toContain('/post/1')
    })
})
