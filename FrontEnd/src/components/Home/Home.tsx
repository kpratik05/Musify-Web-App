import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import {RiAddCircleFill} from 'react-icons/ri';
import {AiFillStar} from 'react-icons/ai'
import "./HomeStyle.css";
import axios from "axios";

const HomeFunc = () => {

    const [songs, setSongs] = useState<any[]>([]);
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '546a9544ccmshc76a418f7c86da5p15357ejsn120e20dadd46',
    //         'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    //     }
    // };

    // fetch('https://shazam.p.rapidapi.com/charts/list', options)
    //     .then(response => response.json())
    //     // .then(response=>{console.log(response.global.genres)})
    //     .then(response => {setGenres(response.global.genres)})
    //     .catch(err => console.error(err));

    useEffect(() => {


        const options = {
            method: 'GET',
            url: 'https://shazam.p.rapidapi.com/songs/list-recommendations',
            params: { key: '484129036', locale: 'en-US' },
            headers: {
                'X-RapidAPI-Key': 'd78190595amshdcf3e16f2b26bbap156a66jsne90aa8758c73',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setSongs(Array.from(response.data.tracks));
        }).catch(function (error) {
            console.error(error);
        });
    }, []);

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

    return (
        <div>
            <div className="listClass" >
                {songs.map((s) => {
                    return ( <Card style={{ width: '18rem' }} className="cardClass" key={s.title}>
                        
                        <Card.Img className="cardimg" variant="top" src={s.images.background}/>
                        <Card.Body className="cardBody">
                            <Card.Title>{s.title}</Card.Title>
                            <Card.Text>
                                {s.subtitle}
                            </Card.Text>
                            <Button variant="primary" onClick={()=>addToPlaylist(s)} ><RiAddCircleFill className="addPl"/></Button>
                            <Button variant="primary" onClick={()=>addToFavs(s)} ><AiFillStar className="addPl"/></Button>
                        </Card.Body>
                    </Card>);
                })}
            </div>
        </div>
    );
}

export default HomeFunc;