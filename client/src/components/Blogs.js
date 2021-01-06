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

  return (
    <div className="home"> 
    {
      post.map(item => {
        return (
          <div className="home-card" key={item._id}>
          <img className="card-img-top" src={item.photo} alt="test"/>
          <div className="card-body">
          <h2 className="card-title">{item.title}</h2>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</p>
            <a href={`/blog/posts/${item._id}`} className="btn btn-primary">Read More &rarr;</a>
          </div>
          <div className="card-footer text-muted">
            Posted On: {item.createdAt.slice(0,10)}
          </div>
        </div>
        )
      })
    }
    </div>
  )
};

export default Blog;