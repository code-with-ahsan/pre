import { useState, useEffect, FC } from 'react';

export type CounterAsyncProps = {
  fetchInitialCount: () => Promise<number>
}


const CounterAsync: FC<CounterAsyncProps> = ({ fetchInitialCount }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const FAKE_TIMEOUT = 1500;

  useEffect(() => {
    setLoading(true);
    fetchInitialCount().then((initialCount) => {
      setCount(initialCount);
      setLoading(false);
    });
  }, [fetchInitialCount]);

  const incrementAsync = () => {
    setLoading(true);
    setTimeout(() => {
      setCount((prevCount) => prevCount + 1);
      setLoading(false);
    }, FAKE_TIMEOUT); // Simulate an async operation with a timeout
  };

  return (
    <div>
      {loading ? <h2 className='text-3xl mb-8'>Loading...</h2> : <h2 className='text-3xl mb-8'>
        Count is {count}
      </h2>}
      <button onClick={incrementAsync} disabled={loading}>Increment Async</button>
    </div>
  );
}

export default CounterAsync;
