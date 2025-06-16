import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Tracker from './pages/Tracker'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {
  return(
    <div className="app">
      <Navbar/>
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/tracker' element={<Tracker/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App;