import React, { useEffect, useState } from "react";
import "./Edit.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedBlog, setEditedBlog] = useState({
    image: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog({ ...editedBlog, [name]: value });
  };

  const getBlogData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `https://good-jade-shrimp-wrap.cyclic.app/api/blogs/${id}`,
        {
          headers: headers,
        }
      );
      console.log(response);

      setEditedBlog({ image: response.data.image, note: response.data.note });
    } catch (error) {
      console.error("Error:", error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getBlogData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(
        `https://good-jade-shrimp-wrap.cyclic.app/api/blogs/${id}`,
        editedBlog,
        {
          headers: headers,
        }
      );

      navigate(`/showblog`);
    } catch (error) {
      console.error("Error:", error);
      navigate("/error");
    }
  };

  return (
    <div className="edit-container">
      <h2 style={{ color: "teal" }}>Edit Blog</h2>
      <div className="input-container">
        <label style={{ color: "red" }} htmlFor="image">
          blog Image:
        </label>
        <input
          type="text"
          id="image"
          value={editedBlog.image}
          name="image"
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <label style={{ color: "orange" }} htmlFor="note">
          Note:
        </label>
        <input
          type="text"
          id="note"
          name="note"
          value={editedBlog.note}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleUpdate} className="submit-button">
        Update Blog
      </button>
    </div>
  );
}

export default Edit;
