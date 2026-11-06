import './index.css';
import UploadScreen from './Pages/UploadScrean'
import {Route, Routes} from 'react-router-dom'
import Summary from './Pages/Summary'
import RecapHeader from './components/RecapHeader'

function App() {

  return (
      <div className ='lg:h-screen w-screen flex flex-col lg:overflow-hidden text-white bg-linear-to-t from-slate-900 to-slate-950'>
          <RecapHeader/> 
        <div className = 'flex-1 min-h-0 w-full max-w-360 mx-auto'>
          <Routes>
            <Route path="/" element={<UploadScreen/>} ></Route>
            <Route path="/Summary" element={<Summary/>}></Route>
          </Routes>
        </div>
      </div>
  )
}
export default App