import React, { useState } from 'react';

function Edit({ blog, onUpdate }) {
  const [editedBlog, setEditedBlog] = useState({ ...blog });

  const handleImageChange = (e) => {
    const imageUrl = e.target.value;
    setEditedBlog({ ...editedBlog, image: imageUrl });
  };

  const handleNoteChange = (e) => {
    const note = e.target.value;
    setEditedBlog({ ...editedBlog, note: note });
  };

  const handleUpdate = () => {
    onUpdate(editedBlog);
  };

  return (
    <div className="edit-container">
      <h2>Edit Blog</h2>
      <div className="input-container">
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={editedBlog.image}
          onChange={handleImageChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="note">Note:</label>
        <input
          type="text"
          id="note"
          value={editedBlog.note}
          onChange={handleNoteChange}
        />
      </div>
      <button onClick={handleUpdate} className="submit-button">
        Update Blog
      </button>
    </div>
  );
}

export default Edit;
