import './App.css'
import Quiz from './Quiz'
import Start from './Start'

function App() {
  const path = window.location.pathname
  return (
    <>
    {path === '/quiz' ? <Quiz  /> : <Start />}
    </>
  )
}

export default App
