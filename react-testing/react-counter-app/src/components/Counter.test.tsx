import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import Counter from './Counter'


describe('Counter component', () => {

  beforeEach(() => {
    render(<Counter />)
  })

  it('should show 0 as initial count', () => {
    const countOutputEl = screen.getByTestId('counterValue');
    expect(countOutputEl.textContent).toBe('Count is 0');
  });

  it('should increment the count value on increment button click', () => {
    const countOutputEl = screen.getByTestId('counterValue');
    expect(countOutputEl.textContent).toBe('Count is 0');
    const incrementBtnEl = screen.getByTestId('incrementBtn');
    fireEvent.click(incrementBtnEl);
    expect(countOutputEl.textContent).toBe('Count is 1');
  })
  
  it('should decrement the count value on decrement button click', () => {
    const incrementBtnEl = screen.getByTestId('incrementBtn');
    fireEvent.click(incrementBtnEl); // change from 0 to 1
    fireEvent.click(incrementBtnEl); // change fro 1 to 2
    const countOutputEl = screen.getByTestId('counterValue');
    expect(countOutputEl.textContent).toBe('Count is 2');
    const decrementBtnEl = screen.getByTestId('decrementBtn');
    fireEvent.click(decrementBtnEl); // change from 2 to 1
    expect(countOutputEl.textContent).toBe('Count is 1');
  })

  it('should keep the value to 0 if the current value is 0 and decrement is pressed', () => {
    const countOutputEl = screen.getByTestId('counterValue');
    expect(countOutputEl.textContent).toBe('Count is 0');
    const decrementBtnEl = screen.getByTestId('decrementBtn');
    fireEvent.click(decrementBtnEl);
    expect(countOutputEl.textContent).toBe('Count is 0');
  })

  it('should reset the value to 0 on reset button click', () => {
    const incrementBtnEl = screen.getByTestId('incrementBtn');
    fireEvent.click(incrementBtnEl); // change from 0 to 1
    fireEvent.click(incrementBtnEl); // change fro 1 to 2
    const countOutputEl = screen.getByTestId('counterValue');
    expect(countOutputEl.textContent).toBe('Count is 2');
    const resetButtonEl = screen.getByTestId('resetBtn');
    fireEvent.click(resetButtonEl);
    expect(countOutputEl.textContent).toBe('Count is 0');
  })
})