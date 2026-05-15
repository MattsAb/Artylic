import {render, screen} from '@testing-library/react';
import { expect, test } from 'vitest'
import App from '../App';
import { BrowserRouter } from 'react-router-dom'

test('renders the app', () => {
    render(<BrowserRouter>
          <App />
        </BrowserRouter>)
    const linkElement = screen.getByText('Artylic');
    expect(linkElement).toBeDefined();
})

