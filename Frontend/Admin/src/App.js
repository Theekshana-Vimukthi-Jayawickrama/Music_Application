
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroSection from './lib/HeroSection';
import Login from './lib/LogIn'
import AddSong from './lib/AddSong';
import Edit from './lib/Edit';
import SongDetails from './lib/songDetails';
import AdminPage from './lib/AdminPage';
import AddAdminUser from './lib/AddAdminUser';
import ForggotPassword from './lib/forggotPassword';
const App=() => {
  return (
      <Router>
        <Routes>
          <Route path="/" element ={<Login/>} />
          <Route path="/herosection" element ={<HeroSection/>} />     
          <Route path='/songAdd' element={<AddSong/>}  />
          <Route path='/edit/:id' element={<Edit/>} />
          <Route path='/songDetails/:id' element={<SongDetails/>} />
          <Route path='/admin' element={<AdminPage/>}/>
          <Route path='/admin/add' element={<AddAdminUser/>}/>
          <Route path='/forgotPassword' element={<ForggotPassword/>}/>
        </Routes>
      </Router>
  );
}

export default App;
