import React from 'react';
import img_path from './images/MIcon.png';
import './HeaderStyle.css';

const Header=()=>{
    return(
        <div className="headerClass">
            <div className='imgClass'>
            <img src={img_path} alt='web-Icon' className="imgtag"/>
            <h1 className="name">Musify</h1>
            </div>
        </div>
    );
}

export default Header;