import React, { useContext, useState } from "react";
import notecontext from "../context/noteContex";

const Notes = (props) => {
  const context = useContext(notecontext);
  const { addnote } = context;
  const [note, setnotes] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handlClick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    props.showAlert("Note Added successfully", "success");
    setnotes({ title: "", description: "", tag: "" });
  };

  const onChange = (event) => {
    setnotes({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <h2>Add notes </h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            disabled={note.title.length <= 5 || note.description.length <= 5}
            className="btn btn-primary"
            onClick={handlClick}
          >
            Add notes
          </button>
        </form>
      </div>
    </>
  );
};

export default Notes;
