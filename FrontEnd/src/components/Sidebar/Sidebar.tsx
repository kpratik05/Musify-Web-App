import React from 'react'
import {AiFillHome} from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import {MdPlaylistAddCheck} from 'react-icons/md'
import {RiPlayListFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import './SidebarStyle.css'

const SidebarFunc=()=>{
    return(
        <div className="sidebar"> 
            <Link to={"/home"}><div className="side_item"><AiFillHome className='item'/> Home</div></Link>
            <Link to={"/search"}><div className="side_item">< AiOutlineSearch className='item'/>Search</div></Link>
            <Link to={"/myplaylist"}><div className="side_item"><MdPlaylistAddCheck className='item'/>Playlist</div></Link>
            <Link to={"/favs"}><div className="side_item"><RiPlayListFill className='item'/>Favourites</div></Link>
        </div>
    );
}

export default SidebarFunc;