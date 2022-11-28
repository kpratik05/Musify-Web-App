import React,{useEffect, useState} from "react";
import {Card,Button} from 'react-bootstrap';
import "./PlaylistStyle.css"
import { CiCircleRemove } from 'react-icons/ci';
import { AiFillStar} from 'react-icons/ai'
const PlaylistFace=()=>{

    const [pl,setPl] = useState<any[]>([]);

    useEffect(()=>{
        getThePlaylist();
    },[]);
    var arr:any[] = [];
    const getThePlaylist =async()=>{
        arr = JSON.parse(window.localStorage.getItem("playlistKey") || '[]');
        
        if(arr!=null)
        {
            setPl(Array.from(arr));
        }
        console.log("length "+pl.length+" ")
        pl.map((p)=>{console.log(p.title+" buesd ")});
    }

    const removeFromPlaylist=(name:any)=>{
        let a = JSON.parse(window.localStorage.getItem("playlistKey") || '[]');
        a = a.filter((x:any) => name.title!==x.title);
        window.localStorage.setItem("playlistKey",JSON.stringify(a));
        window.location.reload();
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
        <div>
            <div><h3>My Playlist </h3><p>refresh to see the new list after removing</p></div>
            <div className="listClass" >
                {pl.map((s) => {
                    return <Card style={{ width: '18rem' }} className="cardClass" key={s.title}>
                        
                        <Card.Img className="cardimg" variant="top" src={s.images.background}/>
                        <Card.Body className="cardBody">
                            <Card.Title>{s.title}</Card.Title>
                            <Card.Text>
                                {s.subtitle}
                            </Card.Text>
                            <Button variant="primary" onClick={()=>removeFromPlaylist(s)} ><CiCircleRemove className="remIcon"/></Button>
                            <Button variant="primary" onClick={()=>addToFavs(s)} ><AiFillStar className="remIcon"/></Button>
                        </Card.Body>
                    </Card>
                })}
            </div>
        </div>
    );
}

export default PlaylistFace;