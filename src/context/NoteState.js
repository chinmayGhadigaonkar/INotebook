import notecontext from "./noteContex";

import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const intial = [];

  const [notes, setnotes] = useState(intial);

  //  Add notes
  const addnote = async (title, description, tag) => {
    const respose = await fetch(`${host}/api/notes/addnotes`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("autotoken"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await respose.json();
    // setnotes(prev=>[...prev,note]);
    setnotes(notes.concat(note));
  };

  // Get notes
  const getnotes = async () => {
    const respose = await fetch(`${host}/api/notes/allnotes`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("autotoken"),
      },
    });
    const json = await respose.json();
    setnotes(json);
    console.log(json);
  };
  const deletenote = async (id) => {
    const respose = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("autotoken"),
      },
    });

    const result = await respose.json();
    console.log(result);
    // setnotes(result)

    const newNote =notes.filter((note)=>{return id!==note._id})
    setnotes(newNote)
  };

  // /api/notes
  // updatenotes

  const Editnotes = async (id, title, description, tag) => {
   
    const respose = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("autotoken"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json  = await respose.json();
   console.log(json)
    let newNote =JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if(element._id===id){
        newNote[index].title=title;
        newNote[index].description=description;
        newNote[index].tag=tag;
        break;
      }
      
    }
    setnotes(newNote)
  
  };

  return (
    <notecontext.Provider
      value={{ notes, addnote, deletenote, Editnotes, getnotes }}
    >
      {props.children}
    </notecontext.Provider>
  );
};

export default NoteState;
