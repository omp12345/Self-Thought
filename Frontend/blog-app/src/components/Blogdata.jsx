import React, { useEffect, useState } from "react";
import "./Blogdata.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Blogdata() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    blogdata();
  }, []);

  const blogdata = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("https://good-jade-shrimp-wrap.cyclic.app/api/blogs", {
        headers: headers,
      });

      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
      navigate("/error");
    }
  };
  const handledelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios
        .delete(`https://good-jade-shrimp-wrap.cyclic.app/api/blogs/${id}`, {
          headers: headers,
        })
        .then((res) => {
          blogdata();
        });
    } catch (error) {
      console.error("Error:", error);
      navigate("/error");
    }
  };
  const handleedit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <div className="blog-data-container">
        {data.map((blog, index) => (
          <div key={index} className="blog-item">
            <div className="blog-content">
              <h3>{blog.note}</h3>
              {/* Image removed from here */}
              <button
                onClick={() => {
                  handleedit(blog._id);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handledelete(blog._id);
                }}
                className="delete-button"
              >
                Delete Blog
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogdata;
