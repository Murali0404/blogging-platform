import { useState } from 'react'
import './App.css'
import BlogList from './components/Blog/BlogList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BlogList/>
    </>
  )
}

export default App