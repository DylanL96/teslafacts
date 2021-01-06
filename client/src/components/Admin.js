import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Table from 'react-bootstrap/Table'

const Admin = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  //Fetches all of the posts from the database
  useEffect(() => {
    fetch('/admin/posts', {
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setPost(result);
      setLoading(false);
    }) 
  },[]);
  
  //Creates a table from the fetched data
  const renderTable = (a,b) => {
    // console.log(a)
    return (
      <tr key={b}>
        <td>{a.title}</td>
        <td>{a.postedBy.username}</td>
        <td>{a.postedBy.email}</td>
        <td><button onClick={() => deletePost(a._id)}>Delete</button></td>
      </tr>
    )
  };

  //Deleting post
  const deletePost = (id) => {
    fetch(`/admin/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result)
      history.push('/')
    })
  }

  return (
    <div>
      {loading && <p>Its loading</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Username</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
            {post.map(renderTable)}
          </tbody>
      </Table>
    </div>
    
  )
};

export default Admin;
