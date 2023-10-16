import React, { useState, useEffect } from 'react';
import './Blog.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Blogdata from './Blogdata';

function Blog() {
 const [data, setData] = useState({
    image: '',
    note: '',
  });
  const [addedBlogs, setAddedBlogs] = useState([]); 
  const [isBlogDataVisible, setIsBlogDataVisible] = useState(false); 

  const navigate = useNavigate();
  const handelshow=()=>{
    navigate("/showblog")
  }

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post('https://good-jade-shrimp-wrap.cyclic.app/api/blogs', data, {
        headers: headers,
      });

     
      setAddedBlogs([...addedBlogs, data]);

      setData({ image: '', note: '' });

     
      setIsBlogDataVisible(true);
    } catch (error) {
      console.error('Error:', error);
      navigate('/error');
    }
  };
 ;
  
       
    

  return (
    <div className='blog'>
    <div className="blog-container">
      <h2>Create a Blog Post</h2>
      <div className="input-container">
        <label htmlFor="text">Note:</label>
        <input
          type="text"
          id="text"
          value={data.note}
          name="note"
          onChange={handlechange}
          placeholder='write your content'
        />
      </div>
      <div className="input-container">
        <label htmlFor="image">Image:</label>
        <input
          type="text"
          value={data.image}
          id="image"
          name="image"
          onChange={handlechange}
          placeholder='optional'
        />
      </div>

      <button onClick={handleSubmit} className="submit-button">
        Add Blog
      </button>
      <hr />
      <button onClick={handelshow} className="submit-button">Show Your Blog</button>
      

     
    </div>
    </div>
  );
}

export default Blog;
