import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Link,Route, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header/Header";
import HomeFunc from './components/Home/Home';
import Search from "./components/Sidebar/Search/Search";
import PlayList from "./components/Sidebar/Playlist/PlaylistFace"
import Favourite from "./components/Sidebar/Favourite/FavFace";
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login/Login';
import StripeContainer from './components/Payment/StripeContainer';



const App:React.FC =()=> {

  let loggedIn = window.localStorage.getItem("loggedIn")=='true'?true:false;

  return (
    <Router>
    <div className="App">
      <Header/>
      <>
      <td className='sidebar'><Sidebar/></td>
      
      <td><Switch>
      <Route exact path = "/home" component={HomeFunc}/>
      <Route exact path="/search" component={Search}/>
      <Route exact path="/myplaylist" component={PlayList}/>
      <Route exact path="/favs" component={Favourite}/>
      <Route exact path="/" component={Login}>{loggedIn ? <Redirect to="/home" /> : <Login />}</Route>
      <Route exact path="/payment" component={StripeContainer}/>
      </Switch></td>
      </>
    </div>
    </Router>
  );
}

export default App;
