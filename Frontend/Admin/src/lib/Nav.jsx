import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/App.css';

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
    <nav className="navbar navbar-expand-lg bg-success rounded">
      <div className="container-fluid text-light bg-success">
        <div className="navbar-brand text-light bg-dark rounded-circle">TONE BOOK</div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-light bg-dark" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mx-2 mb-lg-0 text-light bg-dark">
            <li className="nav-item text-light bg-dark mx-4">
              <button className="nav-link active text-light bg-dark" aria-current="page" onClick={handleHome}>HOME</button>
            </li>
            <li className="nav-item text-light bg-dark mx-4">
              <button className="nav-link active text-light bg-dark" aria-current="page" onClick={handleAddSong}>ADDSONG</button>
            </li>
            <li className="nav-item text-light bg-dark mx-4">
              <button className="nav-link active text-light bg-dark" aria-current="page" onClick={handleAdmin}>ADMIN</button>
            </li>
          </ul>
          <ul className="navbar-nav text-light bg-dark">
            <li className="nav-item text-light bg-dark d-none d-lg-block"> 
              <button className="nav-link active text-light bg-dark" aria-current="page" onClick={handleLogout}>LOG OUT</button>
            </li>
          </ul>
        </div>
      </div>

    </nav>
  );
};
