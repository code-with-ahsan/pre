import { useState, useEffect } from 'react';
import { getUsersCount } from '../api/users.api';

const CounterAsyncExternal = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const FAKE_TIMEOUT = 1500;

  useEffect(() => {
    setLoading(true);
    getUsersCount().then((initialCount) => {
      setCount(initialCount);
      setLoading(false);
    });
  }, []);

  const incrementAsync = () => {
    setLoading(true);
    setTimeout(() => {
      setCount((prevCount) => prevCount + 1);
      setLoading(false);
    }, FAKE_TIMEOUT); // Simulate an async operation with a timeout
  };

  const decrementAsync = () => {
    setLoading(true);
    setTimeout(() => {
      setCount((prevCount) => prevCount - 1);
      setLoading(false);
    }, FAKE_TIMEOUT); // Simulate an async operation with a timeout
  };

  const resetAsync = () => {
    setLoading(true);
    setTimeout(() => {
      setCount(0);
      setLoading(false);
    }, FAKE_TIMEOUT);
  }

  return (
    <div>
      <h2 className="mb-10 text-xl">Async External Counter</h2>
      {loading ? <h3 className='text-3xl mb-8'>Loading...</h3> : <h3 data-testid="counterValue" className='text-3xl mb-8'>
        Count is {count}
      </h3>}
      <div className="actions flex gap-4 items-center">
        <button data-testid="decrementBtn" disabled={loading} onClick={decrementAsync}>
          Decrement Async
        </button>
        <button data-testid="resetBtn" disabled={loading} onClick={resetAsync}>
          Reset Async
        </button>
        <button data-testid="incrementBtn" disabled={loading} onClick={incrementAsync}>
          Increment
        </button>
      </div>

    </div>
  );
}

export default CounterAsyncExternal;
