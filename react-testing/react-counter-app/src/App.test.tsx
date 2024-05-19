import { render, screen } from '@testing-library/react'
import App from './App';
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom';

describe('App component', () => {
  it('should render correct headline', () => {
    render(<App />);
    const headlineElement = screen.getByTestId('headline');
    expect(headlineElement.textContent).toBe('Counter React App');
  })
})