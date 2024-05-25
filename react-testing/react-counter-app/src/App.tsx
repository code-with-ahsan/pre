import './App.css'
import GuesserContainer from './components/Guesser/GuesserContainer';
import { ThemeProvider } from "@/components/theme-provider"
import { GuesserContextProvider } from './components/Guesser/GuesserContext';


function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='app-ui-theme'>
      <div className="flex flex-col h-full justify-center">
        <h1 data-testid="headline" className='text-3xl'>Guess the number</h1>
        <div className="card">
          <GuesserContextProvider>
            <GuesserContainer />
          </GuesserContextProvider>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
