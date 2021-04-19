import React, {useEffect, useState} from "react";
import {MemesCreator} from './memesCreator';
import {Switch,Route,Redirect} from "react-router-dom";
//import Route from "react-router-dom";
import {MemesGenerated} from './memesGenerated';

export const App =() =>{
  const [myUrl,setMyUrl]=useState('');
  const newUrl=(url)=>{
    setMyUrl(url);
  }
  const [isProcessed,setIsProcessed]=useState(false);
  const handleProcess=()=>{
    setIsProcessed(!isProcessed);
  }
  const gotoCreator=(props)=>{
    /*  if(myUrl===''){//if(isProcessed===false) //creator page
          <Redirect to='/'/>
      }
      else{
          <Redirect to='/generator' />
      }*/
    return myUrl===''?<MemesCreator newUrl={newUrl} myUrl={myUrl} history={props.history}/>:<Redirect to='/generated' />;
  }
  const gotoImg=(props)=>{
    return myUrl!==''?<MemesGenerated myUrl={myUrl} history={props.history} newUrl={newUrl}/>:<Redirect to='/' />;
  }
  useEffect(()=>{console.log("hehe",myUrl);},[]);
  return (
      <div>
        <h1 className={{'background-color':'#0275d8'}}> Meme Creator</h1>
        <Switch>
          <Route exact path='/' render={gotoCreator}></Route>
          <Route path='/generated' render={gotoImg}></Route>
          <Route path='/' render={gotoCreator}></Route>
        </Switch>
      </div>
  );
}
/*
<Route exact path='/' component={MemesCreator}></Route>
<Route path='/generated' component={MemesGenerated}></Route>
 */
/*
<Route exact path='/'><MemesCreator /></Route>
<Route path='/generated'><MemesGenerated /></Route>
 */
/*
<Switch>
                <Route exact path='/' render={gotoCreator}></Route>
                <Route path='/generated' render={gotoImg}></Route>
                <Route path='/' render={gotoCreator}></Route>
            </Switch>
 */
/*
<Switch>
                <Route exact path='/' component={(props)=><memesCreator newUrl={newUrl} myUrl={myUrl} history={props.history}/>}></Route>
                <Route path='/generated' component={(props)=><MemesGenerated myUrl={myUrl} history={props.history} newUrl={newUrl}/>}></Route>
                <Route path='/' render={gotoCreator} component={(props)=><memesCreator newUrl={newUrl} myUrl={myUrl} history={props.history}/>}></Route>
            </Switch>
 */ //ok with push
/*
<Switch>
                <Route exact path='/' render={gotoCreator}></Route>
                <Route path='/generated' render={gotoImg}></Route> //or exact path
                <Route path='/' render={gotoCreator}></Route> //opt
            </Switch>
 */
/*
<Route exact path='/'><memesCreator newUrl={newUrl}/></Route>
                <Route path='/generator'><MemesGenerated myUrl={myUrl}/></Route>
 */
/*
<Route exact path='/' render={getStatus}></Route>
                <Route path='/generator' render={getStatus}></Route>
 */
/*
<Route exact path='/' render={gotoCreator}></Route>
                <Route path='/home' render={gotoCreator}></Route>
                <Route path='/generator' render={gotoImg}></Route>
 */
//<Redirect to='/home' />