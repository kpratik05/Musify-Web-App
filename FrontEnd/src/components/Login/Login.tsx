import React, { useState } from 'react';
import {Form,Button} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import "./LoginStyle.css"

const LoginFunc=()=>{
    const [login,setLogin] = useState({
        email : "",
        password : ""
    });
    let h = useHistory();
    const {
        email,password
    } = login;
    
    const onInputChange = (e:any) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
      };
    
    const processLogin =(e:any)=>{
        e.preventDefault();
        console.log(email+" "+password);
        window.localStorage.setItem("loggedIn",'true');
        h.push("/home")
    }
    return(
        <div className='form'>
        <form onSubmit={e => processLogin(e)}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
                name="email"
                value={email}
                onChange={e => onInputChange(e)}
                />
                
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
                name="password"
                value={password}
                onChange={e => onInputChange(e)}/>
            </div>
            <div className="but">
            <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            
        </form>

        

    </div>
    );
}

export default LoginFunc;