import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount((count) => count + 1)
  }

  const decrement = () => {
    setCount((count) => count - 1)
  }
    
  const reset = () => {
    setCount(0)
  }
  return (
    <>
      <h1 data-testid="headline" className='text-xl'>Counter React App</h1>
      <div className="card">
        <h2 className='text-3xl mb-8'>
          Count is {count}
        </h2>
        <div className="actions flex gap-4 items-center">
          <button onClick={decrement}>
            Decrement
          </button><button onClick={reset}>
            Reset
          </button><button onClick={increment}>
            Increment
          </button>
        </div>
      </div>
    </>
  )
}

export default App
