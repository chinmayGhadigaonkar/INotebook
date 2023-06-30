import React from "react";
import { useContext } from "react";
import notecontext from "../context/noteContex";

const NotesItem = (props) => {
  let { note, updatenote } = props;
  const context = useContext(notecontext);
  const { deletenote } = context;
  return (
    <>
      <div className="card my-3 " >
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
            <div className="mx-4">
              <i
                className="fa-solid fa-pen-to-square mx-1 fa-lg"
                onClick={() => {
                  updatenote(note);
                }}
              ></i>
              <i
                className="fa-sharp fa-solid fa-trash mx-2 fa-lg"
                onClick={() => {
                  deletenote(note._id);
                  props.showAlert("Note Deleted successfully", "success");
                }}
              ></i>
            </div>
          </div>

          <p className="card-text">{note.description}</p>
          <div>
            <div className="btn btn-dark btn-sm">{note.tag}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesItem;
