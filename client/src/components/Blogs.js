import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch('/blog/posts', {
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setPost(result)
    }) 
  },[])

  const makeComment = (text, postId) => {
    fetch('/blog/comment', {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        postId:postId,
        text:text,
      })
    }).then(response => response.json())
    .then(result => {
      // console.log(result)
      const newData = post.map(item=>{
        if(item._id === result._id){
          console.log(result)
          return result
        } else {
          console.log(item)
          return item
        }
      })
      setPost(newData)
    }).catch(error => {
      console.log(error)
    })
  }


  return (
    <div className="home"> 
    {
      post.map(item => {
        return (
          <div className="card home-card" key={item._id}>
          <h5>{item.title}{item.postedBy.username}
          </h5>
          <div className="card-image">
            <img src={item.photo} alt="placeholder"/>
          </div>
          <div className="card-content" key={item._id}>
          <i className="material-icons" style={{color: "red"}}>favorite</i>
          </div>
            {
              item.comments.map(record => {
                return(
                <h6 key={record._id}><span style={{fontWeight:'500'}}>{record.postedBy.username}</span> {record.text}</h6>
                )
              })
            }
          <form onSubmit={(event) => {
            event.preventDefault()
            makeComment(event.target[0].value, item._id)
          }}>
            <input type="text" placeholder="add a comment"/>
          </form>
        </div>
        )
      })
    }
    </div>
  )
};

export default Blog;