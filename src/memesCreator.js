import React,{useEffect,useState} from 'react';
import styles from './memesCreator.css';
import {useHistory} from 'react-router-dom';

export const MemesCreator=(props)=>{ //console.log("props",props);
    const [memes,setMemes]=useState([]);
    const [memesIndex,setMemesIndex]=useState(0);
    const [caption,setCaption]=useState([]);

    useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes')
            .then(res=>res.json())
            .then(data =>{setMemes(data.data.memes.slice(0,9));}); //setMemes({memes:data.data.memes.slice(0,9),
    },[]);
    const jumpToNext=()=>{
        if(memesIndex===memes.length-1){setMemesIndex(0);}
        else{setMemesIndex(memesIndex+1);}
    }
    useEffect(()=>{
        if(memes.length){setCaption(Array(memes[memesIndex].box_count).fill(''));}
    },[memesIndex,memes]);
    const updateCaption=(e,index)=>{
        setCaption(caption.map(
            (c,i)=>{
                if(i===index){//caption[index]=e.target.value;
                    return e.target.value||'';
                }
                return c;
            }
        ));
    }
    //  useEffect(()=>{console.log(caption);},[caption])

    const history=useHistory();
    const {newUrl,myUrl}=props;
    const imgFlip_account=()=>{//console.log("newurl",newUrl); console.log("props",props);
        const formData=new FormData();
        formData.append('username','nono12');
        formData.append('password','TreeNode12&');
        formData.append('template_id',memes[memesIndex].id);
        caption.forEach((c,index)=>{formData.append(`boxes[${index}][text]`,c);});
        /*   fetch('https://api.imgflip.com/caption_image',{
               method:'POST',
               body:formData,
           }).then(res=>{res.json()}).then(r => {
               console.log(r);newUrl(r.data.url);history.push('/generator');
           });
            //   .then(res=>{console.log(res);}));
           */
        /*  fetch('https://api.imgflip.com/caption_image', {
              method: 'POST',
              body: formData
          }).then(res => {
              res.json().then( (res) => { //console.log(res);
               //   history.push(`/generated`); //following setstate (regardless of setstate) becaomes unmount
          //    console.log(newUrl);
              if(res.success!==false){ newUrl(res.data.url);}
             // else{ newUrl("");} //opt
              //teh above lines also works without history push below, still change pages forth and back when myUrl!='' (i.e. when user type in something)
                  //when user not typing stays in current page (if history push - user not typing will still changes pages forth and back
              //    console.log(myUrl);
            //      history.push(`/generated?url=${res.data.url}`);  //opt // could also add async await  to setstate (newUrl) (longer changing page) => ?useeffect(history.push,myUrl)
              //or props.history.push; pass props from app2 to memesCreater //// necessary only when component rather than render in app2.js
              });
          });*/ //ok
        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formData
        }).then(res => {
            return res.json();
        }).then( (res) => {
            if(res.success!==false){ newUrl(res.data.url);}
            // else{ newUrl("");} //opt
            props.history.push(`/generated?url=${res.data.url}`); //opt//pass props from app2 to memesCreater
            //or history.push(`/generated`);// necessary only when component rather than render in app2.js
        }); //ok
    }
    //useEffect(()=>{console.log("hilo",myUrl);history.push(`/generated`);},[myUrl]); //wrong/warning - keep rendering thispage and changing page forth n back
    //  useEffect(()=>{console.log("hi");},[myUrl]); //first loading + ((else newUrl opt+)historypush) - with/without (else newUrl opt) cout hi when user typing nothing
//

    //onChange: (e)=>{return updateCaption(e,_index);} //wrong should delete _index
    //onChange (e)=updateCaption(e)
    return ( //(memes!=null&&memes.length>=0)? //(memes&&memes.length)?
        (memes.length)? //memes.length>0
            <div className="container">
                <button className="generate" onClick={imgFlip_account}>Generator</button>
                <button className="skip" onClick={jumpToNext}>Skip</button>
                {caption.map((_c,_index)=>{return (<input key={_index} onChange={(e)=>{return updateCaption(e,_index);}} />);})}
                <img alt='memes' src={memes[memesIndex].url}/>
            </div>
            :
            <div onClick={()=>{console.log(memes);}}></div>
    );
}
//className={styles.container} //className={{'background-color':'#0275d8'} className={styles.skip}
/*
<input onChange={
                            e=>{
                                setCaption(caption.map((c,i)=>{
                                    if()
                                }))
                        }}/>
 */