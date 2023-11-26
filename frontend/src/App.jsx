import { useState } from 'react'
import './App.css'
import second from './components'
import second from './components/Chat'
import Chat from './components/Chat'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='AppContainer'>

      <Chat></Chat>
      
    </div>
  )
}

export default App
