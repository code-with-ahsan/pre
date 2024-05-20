import './App.css'
import Counter from './components/Counter'
import CounterAsync from './components/CounterAsync'
import CounterAsyncExternal from './components/CounterAsyncExternal';

function App() {
  return (
    <>
      <h1 data-testid="headline" className='text-xl'>Counter React App</h1>
      <div className="card">
        <CounterAsyncExternal />
      </div>
    </>
  )
}

export default App
