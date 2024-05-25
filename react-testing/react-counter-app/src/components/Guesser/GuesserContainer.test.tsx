import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GuesserContainer from './GuesserContainer';
import { describe, it, expect, vi } from 'vitest';
import { ReactNode, act } from 'react';
import { GuesserContextProvider } from './GuesserContext';

vi.mock('@/lib/randomizer', () => {
  return {
    MAX_NUM: 5,
    getRandomValue: vi.fn(() => '3')
  }
})

const renderWithProvider = (component: ReactNode) => {
  render(<GuesserContextProvider>
    {component}
  </GuesserContextProvider>)
}

describe('GuesserContainer Integration Tests', () => {
  it('should render the initial UI with random number prompt', () => {
    renderWithProvider(<GuesserContainer />);
    expect(screen.getByText(/guess an integer between 1 and 5/i)).toBeInTheDocument();
  });

  it('should congratulate on a successful guess', async () => {
    renderWithProvider(<GuesserContainer />);
    const input = screen.getByPlaceholderText('type your guess here..');
    const button = screen.getByRole('button', { name: /submit/i });

    act(() => {
      fireEvent.change(input, { target: { value: '3' } });
      fireEvent.click(button);
    })

    await waitFor(() => {
      expect(screen.getByText(/congratulations! great guess ✅ the random number was 3/i)).toBeInTheDocument();
    });
  });


  it('should display the failure message & try again button on wrong guess', async () => {
    renderWithProvider(<GuesserContainer />);
    const input = screen.getByPlaceholderText('type your guess here..');
    const button = screen.getByRole('button', { name: /submit/i });

    // Mocking a failed guess
    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/wrong guess/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('should reset the UI on "Try Again" button click', async () => {
    renderWithProvider(<GuesserContainer />);
    const input = screen.getByPlaceholderText('type your guess here..');
    const button = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.click(button);
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });

    fireEvent.click(tryAgainButton);

    await waitFor(() => {
      expect(screen.getByText(/guess an integer between 1 and 5/i)).toBeInTheDocument();
    });
  });
});