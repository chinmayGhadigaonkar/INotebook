import React, { useContext, useRef, useState, useEffect } from "react";
import Notes from "./Notes";
import NotesItem from "./NotesItem";
import notecontext from "../context/noteContex";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const context = useContext(notecontext);
  const { notes, getnotes, Editnotes } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("autotoken")) {
      getnotes();
    } else {
      navigate("/Login");
    }
    // eslint-disable-next-line
  }, []);

  const refClose = useRef(null);
  const ref = useRef(null);
  const [note, setnotes] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updatenotes = (currentnote) => {
    ref.current.click();
    setnotes({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };
  const handlClick = (e) => {
    Editnotes(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Login Sucessfully", "success");
  };

  const onChange = (event) => {
    setnotes({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <>
      <Notes showAlert={props.showAlert}></Notes>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Notes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={
                  note.etitle.length <= 5 || note.edescription.length <= 5
                }
                onClick={handlClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container ">
        <h3 className="my-3 mx-3">Youer Notes </h3>
        <div className="row d-flex flex-wrap">
          {notes.map((note) => {
            return (
              <>
                <div className="col-3 my-2 mx-3">
                  <NotesItem
                    showAlert={props.showAlert}
                    key={note._id}
                    updatenote={updatenotes}
                    note={note}
                  ></NotesItem>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
