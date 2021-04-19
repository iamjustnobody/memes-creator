import React, {useEffect, useState} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import styles from './memesGenerated.css';
import {useClipboard} from 'use-clipboard-copy';

export const MemesGenerated =(props)=>{
    const history=useHistory();
    const location=useLocation();
    const url=new URLSearchParams(location.search).get('url'); //?url=

    const goBack=()=>//{props.newUrl('');} // (either only thisleft or only history.push) with render  getimg getcreator -> not back to creating page but back to /generated exact page/path
        // need both
        //{history.push('/');} //works when component (not render getimg getcreator) in app return
        // {props.history.push('/');} ////works when component (not render  getimg getcreator) in app return
    {props.newUrl('');history.push('/');} //ok //need both
    //  { props.newUrl('');} //then useeffect
    //   useEffect(()=>{console.log(props.myUrl);props.history.push('/');},[props.myUrl]);
    //loop //setstate inside useeffect which does not have depedencies array or one of dependencies changes every render

    const [copied,setCopied]=useState(false);
      const clipboard=useClipboard();
    const copyLink=()=>{
        clipboard.copy(url);
        setCopied(true);
    }
    return (
        <div className='container'>
            <button onClick={goBack} className="home"> Make more memes </button>
            {url?<img alt='memes' src={url} />:<div>hello,{props.myUrl}! and {props.myUrl}</div>}
            <button className='copy' onClick={copyLink}>{copied?"Link Copied!":"Copy Link"}</button>
        </div>
    );
}//<div className={styles.container}> <button onClick={goBack} className={styles.home}> <button className={styles.copy}>
//<div>hello,{props.myUrl}! and {props.myUrl}</div>
//url exists and is not undefined or empty string
//{url &&  <img src={url} />} //{ url && <img alt='meme' src={url} /> }
//<div>{url?<img src={url} />:<div>hello,{props.myUrl}! and {props.myUrl}</div>}</div>
//