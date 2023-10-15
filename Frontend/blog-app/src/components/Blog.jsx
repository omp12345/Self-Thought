import React, { useState, useEffect } from 'react';
import './Blog.css'; // Import your CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Blogdata from './Blogdata';

function Blog() {
 const [data, setData] = useState({
    image: '',
    note: '',
  });
  const [addedBlogs, setAddedBlogs] = useState([]); // State to store added blogs
  const [isBlogDataVisible, setIsBlogDataVisible] = useState(false); // State to control blog data visibility

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

      const response = await axios.post('http://localhost:8080/api/blogs', data, {
        headers: headers,
      });

      // Add the newly created blog to the list of added blogs
      setAddedBlogs([...addedBlogs, data]);

      // Clear the input fields after adding the blog
      setData({ image: '', note: '' });

      // Show the added blogs
      setIsBlogDataVisible(true);
    } catch (error) {
      console.error('Error:', error);
      navigate('/error');
    }
  };
 ;
  
        // Clear the input fields after adding the blog
      
  
        // Show the added blogs
    

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
