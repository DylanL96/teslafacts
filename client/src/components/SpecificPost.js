import React, { useState, useEffect } from 'react';

const SpecificPost = ({match}) => {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/blog/posts/${match.params.id}`, {
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setDetail(result)
      setLoading(false)
    })
  },[match.params.id])

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
      setDetail(result)
      setLoading(false)
    }).catch(error => {
      console.log(error)
    })
  } 
  return (
  <div className="container">
    <div className="row">
      {/* <!-- Post Content Column --> */}
      <div className="col-lg-8">
        {/* <!-- Title --> */}
        <h1 className="mt-4">{detail.title}</h1>

        {/* <!-- Author --> */}
        <p className="lead">
          by
          <a href="#"> Dylan</a>
        </p>

        <hr />

        {/* <!-- Date/Time --> */}
        <p>Date Created: Dylan</p>

        <hr />

        {/* <!-- Preview Image --> */}
        <img
          className="img-fluid rounded"
          src={detail.photo}
          alt=""
        />

        <hr />

        {/* <!-- Post Content --> */}
        <p className="lead">
          {detail.body}
        </p>

        <hr />

        {/* <!-- Comments Form --> */}
        <>
          <div className="card my-4">
            <h5 className="card-header">Leave a Comment:</h5>
            <div className="card-body">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  makeComment(event.target[0].value, detail._id);
                }}
              >
                <div className="form-group">
                  <textarea className="form-control" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="media mb-4">
            <div className="media-body">
            
              {detail.comments && detail.comments.map((record) => {
                return (
                  <>
                    {/* <!-- Single Comment --> */}
                    <div className="media mb-4" key={detail._id}>
                      <img
                        className="d-flex mr-3 rounded-circle"
                        src="http://placehold.it/50x50"
                        alt=""
                      />
                      <div className="media-body" key={detail._id}>
                        <h5 className="mt-0">{record.postedBy.username}</h5>
                        {record.text}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </>
      </div>
    </div>
  </div>
  )
};

export default SpecificPost;
