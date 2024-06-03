import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Nav = () => {

  const navigator = useNavigate();

  const handleLogout= () =>{
    navigator('/');
    
  }
  const handleAddSong = () =>{
    navigator('/songAdd')
  }
  const handleHome =() =>{
    navigator('/herosection');
  }
  const handleAdmin=() =>{
    navigator('/admin')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid text-light bg-dark">
        <a className="navbar-brand text-light bg-dark" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-light bg-dark" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-light bg-dark">
            <li className="nav-item text-light bg-dark">
              <button className="nav-link active text-light bg-dark" aria-current="page" onClick={handleHome}>Home</button>
            </li>
            <li className="nav-item text-light bg-dark">
              <button className="nav-link active text-light bg-dark" aria-current="page" onClick={handleAddSong}>AddSong</button>
            </li>
            <li className="nav-item text-light bg-dark">
              <button className="nav-link active text-light bg-dark" aria-current="page" onClick={handleAdmin}>Admin</button>
            </li>
          </ul>
          <ul className="navbar-nav text-light bg-dark">
            <li className="nav-item text-light bg-dark d-lg-none">
              <a className="nav-link active text-light bg-dark" aria-current="page" href="#">Log out</a>
            </li>
            <li className="nav-item text-light bg-dark d-none d-lg-block"> 
              <button className="nav-link active text-light bg-dark" aria-current="page" onClick={handleLogout}>Log out</button>
            </li>
          </ul>
        </div>
      </div>

    </nav>
  );
};
