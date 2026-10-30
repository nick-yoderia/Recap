import './index.css';
import UploadScreen from './Pages/UploadScrean'
import {Route, Routes} from 'react-router-dom'
import About from './Pages/About'
import Summary from './Pages/Summary'
import RecapHeader from './components/RecapHeader'

function App() {

  return (
      <div className ='sm:h-screen w-screen sm:overflow-hidden text-white bg-linear-to-t from-slate-800 to-slate-950  bg-blend-color-burn'>
          <RecapHeader/> 
        <div className = 'sm:max-w-7xl sm:mx-auto'>
          <Routes>
            <Route path="/" element={<UploadScreen/>} ></Route>
            <Route path="/About" element={<About/>}></Route>
          </Routes>
        </div>
      </div>
  )
}
export default App