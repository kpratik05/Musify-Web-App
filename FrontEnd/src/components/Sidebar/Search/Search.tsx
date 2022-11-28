import React, { useEffect, useState } from'react';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap'
import "./searchStyle.css"
import { RiAddCircleFill } from 'react-icons/ri';
import { AiFillStar } from 'react-icons/ai';

const SearchFunc  =()=>{

    const [searchValue ,setSearchValue] = useState('');
    const[songs,setSongs] = useState<any[]>([]);
    const[searchResults,setSearchResults] = useState<any[]>([]);
    const [suggestions,setSuggestions] = useState<any[]>([]);
    const getResults=()=>{
        
        const options = {
            method: 'GET',
            url: 'https://shazam.p.rapidapi.com/charts/track',
            params: {locale: 'en-US', pageSize: '20', startFrom: '0'},
            headers: {
              'X-RapidAPI-Key': 'd78190595amshdcf3e16f2b26bbap156a66jsne90aa8758c73',
              'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
              setSearchResults(Array.from(response.data.tracks));
          }).catch(function (error) {
              console.error(error);
          });
    }

    useEffect(()=>{
        getResults();
    },[]);

    const getAllSongs=()=>{
        const options = {
            method: 'GET',
            url: 'https://shazam.p.rapidapi.com/search',
            params: {term: searchValue, locale: 'en-US', offset: '0', limit: '5'},
            headers: {
              'X-RapidAPI-Key': 'd78190595amshdcf3e16f2b26bbap156a66jsne90aa8758c73',
              'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
              setSongs(Array.from(response.data.tracks.hits));
              console.log(response.data.tracks.hits[0].track.title);
          }).catch(function (error) {
              console.error(error);
          });
    }

    const setTheValue =(str:string)=>{
        console.log(str);
        let matches = [];
        if(str.length>0)
        {
            matches = searchResults.filter((s)=>{
                const regex = new RegExp(`${str}`,"gi");
                return s.title.match(regex);
            })
        }
        
        setSuggestions(matches);
        setSearchValue(str);
    }

    const suggHandler =(str:string)=>{
        setSearchValue(str);
        setSuggestions([]);
    }

    const removeResults=()=>{
        setSongs([]);
    }

    const addToPlaylist=(key:string)=>
    {
        let new_data = key;

        if(window.localStorage.getItem("playlistKey")==null)
        {
            window.localStorage.setItem("playlistKey",'[]');
        }

        let old_data = JSON.parse(window.localStorage.getItem("playlistKey") || '[]');

        for(let v of old_data)
        {
            if(v==new_data)
            {
                return;
            }
        }

        old_data.push(new_data);

        window.localStorage.setItem("playlistKey",JSON.stringify(old_data))
    }   

    const addToFavs =(s:object)=>{
        let new_data = s;

        if(window.localStorage.getItem("favs")==null)
        {
            window.localStorage.setItem("favs",'[]');
        }

        let old_data = JSON.parse(window.localStorage.getItem("favs") || '[]');

        for(let v of old_data)
        {
            if(v==new_data)
            {
                return;
            }
        }

        old_data.push(new_data);

        window.localStorage.setItem("favs",JSON.stringify(old_data))
    }

    return(
        <div className="search">
            <form method="post" >
            <input placeholder='Enter song or artist name' className="inputfield" name='searchValue' onChange={(e)=>setTheValue(e.target.value)} value={searchValue}/>
            <button type="button" onClick={getAllSongs} className="searchButton">Search</button>
            <button type="button" onClick={removeResults} className="searchButton">Clear results</button>
            {suggestions.map((s)=>{return (<div key={s.title} className="sugg" onClick={()=>{suggHandler(s.title)}}>{s.title}</div>)})}
            </form>
            <h3>Results for "{searchValue}"</h3>
            {songs.map((s)=>{
                return(
                    <Card style={{ width: '18rem' }} className="cardClass" key={s.track.subtitle} >
                        
                        <Card.Img className="cardimg" variant="top" src={s.track.images.background}  />
                        <Card.Body className="cardBody" >
                            <Card.Title   >{s.track.title}</Card.Title>
                            <Card.Text  >
                                {s.track.subtitle}
                            </Card.Text>
                            <Button variant="primary" onClick={()=>addToPlaylist(s.track)} ><RiAddCircleFill className="addPl"/></Button>
                            <Button variant="primary" onClick={()=>addToFavs(s.track)} ><AiFillStar className="addPl"/></Button>
                        </Card.Body>
                    </Card>
                )

            })}
        </div>
    );
}

export default SearchFunc;