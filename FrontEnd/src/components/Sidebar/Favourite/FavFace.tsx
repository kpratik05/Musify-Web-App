import React, { useEffect, useState } from 'react';
import {Card,Button} from 'react-bootstrap';
import {CiCircleRemove} from 'react-icons/ci'
const FavFunc=()=>{

    const [fav,setFav] = useState<any[]>([]);

    useEffect(()=>{
        getThePlaylist();
    },[]);
    var arr:any[] = [];
    const getThePlaylist =async()=>{
        arr = JSON.parse(window.localStorage.getItem("favs") || '[]');
        
        if(arr!=null)
        {
            setFav(Array.from(arr));
        }
        console.log("length "+fav.length+" ")
        fav.map((p)=>{console.log(p.title+" buesd ")});
    }

    const removeFromPlaylist=(name:any)=>{
        let a = JSON.parse(window.localStorage.getItem("favs") || '[]');
        a = a.filter((x:any) => name.title!==x.title);
        window.localStorage.setItem("favs",JSON.stringify(a));
        window.location.reload();
    }

    return(
        <div>
            <div><h3>My Favourite's</h3></div>
            <div className="listClass" >
                {fav.map((s) => {
                    return <Card style={{ width: '18rem' }} className="cardClass" key={s.title}>
                        
                        <Card.Img className="cardimg" variant="top" src={s.images.background}/>
                        <Card.Body className="cardBody">
                            <Card.Title>{s.title}</Card.Title>
                            <Card.Text>
                                {s.subtitle}
                            </Card.Text>
                            <Button variant="primary" onClick={()=>removeFromPlaylist(s)} ><CiCircleRemove className="remIcon"/></Button>
                        </Card.Body>
                    </Card>
                })}
            </div>
        </div>
    );
}

export default FavFunc;