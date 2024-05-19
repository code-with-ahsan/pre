import './App.css'
import Counter from './components/Counter'

function App() {
  return (
    <>
      <h1 data-testid="headline" className='text-xl'>Counter React App</h1>
      <div className="card">
        <Counter />
      </div>
    </>
  )
}

export default App
