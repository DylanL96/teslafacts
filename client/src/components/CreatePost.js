import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const history = useHistory();

  //UseEffect will take effect when the URL gets updated. When does it get updated? When we upload a new image.
  useEffect(() => {
    if(url){
      fetch('/blog/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem('jwt')
        },
        body: JSON.stringify({
          title:title,
          body:body,
          pic:url
        })
      }).then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.error){
          M.toast({html: data.error, classes: "#e53935 red darken-1"})
        }
        else {
          M.toast({html: "Post Successful", classes:"#43a047 green darken-1"})
          history.push('/')
        }
      }).catch(error => {
        console.log(error)
      })
    }
    // eslint-disable-next-line
  }, [url])

  const postDetails = () => {
    const data = new FormData()
    data.append('file', image);
    data.append('upload_preset', 'instagram clone');
    data.append('cloud_name','dylancloud');
    fetch('https://api.cloudinary.com/v1_1/dylancloud/image/upload',{
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      setUrl(data.url)
    })
    .catch(error => {
      console.log(error)
    })
  }
  

  return (
    <div className="card input-file" style={{
      margin: "30px auto",
      maxWidth: "500px",
      padding: "20px",
      textAlign: "center"
    }}>
      <input type="text" placeholder="title" onChange={(event) => setTitle(event.target.value)} value={title}/>
      <input type="text" placeholder="body" onChange={(event) => setBody(event.target.value)} value={body}/>
        <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(event)=>setImage(event.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text"/>
        </div>
      </div>
      <button className="waves-effect waves-light btn #64b5f6 blue darken-1" onClick={()=> postDetails()}>Submit post</button>
    </div>
  )
};

export default CreatePost;