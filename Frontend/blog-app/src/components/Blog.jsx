import React, { useState } from 'react';
import './Blog.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Blogdata from './Blogdata';

function Blog() {
  const [data, setData] = useState({ note: '' });
  const [addedBlogs, setAddedBlogs] = useState([]);
  const [isBlogDataVisible, setIsBlogDataVisible] = useState(false);

  const navigate = useNavigate();

  const handleShow = () => {
    navigate("/showblog");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

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
      setData({ note: '' });
      setIsBlogDataVisible(true);
    } catch (error) {
      navigate('/error');
    }
  }

  return (
    <div >
      <div className="blog-container">
        <h2>Create a Blog Post</h2>
        <div className="input-container">
          <label htmlFor="note">Note:</label>
          <input
            type="text"
            id="note"
            value={data.note}
            name="note"
            onChange={handleChange}
            placeholder='Write your content'
          />
        </div>
        <button onClick={handleSubmit} className="submit-button">
          Add Blog
        </button>
        <hr />
        <div className="blog-content-container">
          <Blogdata/>
        </div>
      </div>
    </div>
  );
}

export default Blog;
