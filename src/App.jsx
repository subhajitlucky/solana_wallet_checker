import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Tracker from './pages/Tracker'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tracker' element={<Tracker/>}/>
    </Routes>
    <Footer/>
    
    </>
  )
}

export default App;