import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import CounterAsync from './CounterAsync'
import { act } from 'react';

vi.useFakeTimers({
  shouldAdvanceTime: true
})

describe('CounterAsync component', () => {
  const mockFetchInitialCount = vi.fn();

  beforeEach(() => {
    mockFetchInitialCount.mockResolvedValue(10);
    render(<CounterAsync fetchInitialCount={mockFetchInitialCount} />);
  })

  it('should render the initial value from fetchInitialCount', async () => {
    const loadingEl = screen.getByText('Loading...');
    expect(loadingEl).toBeInTheDocument();
    await waitFor(() => {
      return expect(screen.getByTestId('counterValue')).toBeInTheDocument();
    });
    const countValEl = screen.getByTestId('counterValue');
    expect(countValEl.textContent).toBe('Count is 10');
  });

  it('should increment the count value on increment btn click', async () => {
    await waitFor(() => {
      return expect(screen.getByTestId('counterValue')).toBeInTheDocument();
    });
    const countValEl = screen.getByTestId('counterValue');
    expect(countValEl.textContent).toBe('Count is 10');
    act(() => {
      const incrementBtn = screen.getByTestId('incrementBtn');
      fireEvent.click(incrementBtn);
    });
    const loadingEl = screen.getByText('Loading...');
    expect(loadingEl).toBeInTheDocument();
    expect(screen.getByTestId('incrementBtn')).toBeDisabled();
    vi.advanceTimersByTime(1500);
    await waitFor(() => {
      return expect(screen.getByTestId('counterValue')).toBeInTheDocument();
    });
    expect(screen.getByTestId('counterValue').textContent).toBe('Count is 11');
    expect(screen.getByTestId('incrementBtn')).toBeEnabled();
  });

  it('should decrement the count value on decrement btn click', async () => {
    await waitFor(() => {
      return expect(screen.getByTestId('counterValue')).toBeInTheDocument();
    });
    const countValEl = screen.getByTestId('counterValue');
    expect(countValEl.textContent).toBe('Count is 10');
    act(() => {
      const decrementBtn = screen.getByTestId('decrementBtn');
      fireEvent.click(decrementBtn);
    });
    const loadingEl = screen.getByText('Loading...');
    expect(loadingEl).toBeInTheDocument();
    expect(screen.getByTestId('decrementBtn')).toBeDisabled();
    vi.advanceTimersByTime(1500);
    await waitFor(() => {
      return expect(screen.getByTestId('counterValue')).toBeInTheDocument();
    });
    expect(screen.getByTestId('counterValue').textContent).toBe('Count is 9');
    expect(screen.getByTestId('decrementBtn')).toBeEnabled();
  });

  it('should reset the count value on reset btn click', async () => {
    await waitFor(() => {
      return expect(screen.getByTestId('counterValue')).toBeInTheDocument();
    });
    const countValEl = screen.getByTestId('counterValue');
    expect(countValEl.textContent).toBe('Count is 10');
    act(() => {
      const resetBtn = screen.getByTestId('resetBtn');
      fireEvent.click(resetBtn);
    });
    const loadingEl = screen.getByText('Loading...');
    expect(loadingEl).toBeInTheDocument();
    expect(screen.getByTestId('resetBtn')).toBeDisabled();
    vi.advanceTimersByTime(1500);
    await waitFor(() => {
      return expect(screen.getByTestId('counterValue')).toBeInTheDocument();
    });
    expect(screen.getByTestId('counterValue').textContent).toBe('Count is 0');
    expect(screen.getByTestId('resetBtn')).toBeEnabled();
  });

})