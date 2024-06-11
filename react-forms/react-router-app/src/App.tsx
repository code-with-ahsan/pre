import { RouterProvider } from 'react-router-dom'
import './App.css'
import appRouter from './routes'
import Loader from './components/Loader'
import { useAppSelector } from './store/hooks'
import { selectIsPending } from './store/contactsSlice'

function App() {
  const isLoading = useAppSelector(selectIsPending);
  return (
    <>
      {isLoading && <div className="spinner fixed z-20 bg-black/75 w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>}

      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
