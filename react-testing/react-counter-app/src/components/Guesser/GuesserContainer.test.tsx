import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import GuesserContainer from './GuesserContainer'
import { ReactNode, act } from 'react';
import { GuesserContextProvider } from './GuesserContext';

vi.mock('@/lib/randomizer', () => {
  return {
    MAX_NUM: 5,
    getRandomValue: vi.fn(() => {
      return '3'
    })
  }
})


const renderWithContext = (component: ReactNode) => {
  render(<GuesserContextProvider>
    {component}
  </GuesserContextProvider>);
}

const guessANumber = (val: string) => {
  const inputEl = screen.getByTestId('guessInputEl');
  const submitBtn = screen.getByTestId('submitBtn');
  act(() => {
    fireEvent.change(inputEl, {
      target: {
        value: val
      }
    });
    fireEvent.click(submitBtn);
  });
}

describe('GuesserContainer component', () => {

  it('should render the initial UI message with random prompt', () => {
    renderWithContext(<GuesserContainer />);
    expect(screen.getByText(/guess an integer between 1 and/i)).toBeInTheDocument();
  });

  it('should congratulate on a successful guess', async () => {
    renderWithContext(<GuesserContainer />);
    guessANumber('3');
    
    await waitFor(() => {
      const successMesssage = screen.getByText(/Congratulations! Great guess ✅ The random number was 3/i);
      expect(successMesssage).toBeInTheDocument();
    });
    
  });

  it('should display the failure message & try again btn on wrong guess', async () => {
    renderWithContext(<GuesserContainer />);
    guessANumber('1');
    
    await waitFor(() => {
      const failureMessage = screen.getByText(/wrong guess/i);
      expect(failureMessage).toBeInTheDocument();
    });

    expect(screen.getByTestId('tryAgainBtn')).toBeInTheDocument();
    expect(screen.getByTestId('guessInputEl')).toBeDisabled();
  });

  it('should reset the UI on try again btn click', async () => {
    renderWithContext(<GuesserContainer />);
    guessANumber('1');
    const tryAgainBtnEl = screen.getByTestId('tryAgainBtn');
    
    act(() => {
      fireEvent.click(tryAgainBtnEl);
    });

    expect(screen.getByText(/guess an integer between 1 and/i)).toBeInTheDocument();

  })

})