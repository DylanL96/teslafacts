import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table'

const Admin = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

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
  },[])

  const renderTable = (a,b) => {
    // console.log(a)
    return (
      <tr key={b}>
        <td>{a.title}</td>
        <td>{a.postedBy.username}</td>
        <td>{a.postedBy.email}</td>
      </tr>
    )
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
