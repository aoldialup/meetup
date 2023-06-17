import '../App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import NoMatch from './NoMatch'
import { Clubs } from './Clubs'
import { ClubDetail } from './ClubDetail'
import { AddClub } from './AddClub'
import Navbar from './Navbar'
import Login from './Login'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/add" element={<AddClub />}></Route>
        <Route path="/clubs/details/:id" element={<ClubDetail />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div >
  )
}

export default App;