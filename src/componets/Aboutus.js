import React from "react";
// import notecontext from '../context/noteContex'
import { Link } from "react-router-dom";

const Aboutus = () => {
  // const a=useContext(notecontext)
  return (
    <>
      <main className="px-3 container my-3 ">
        <h1 className="color-black text-center">About Us</h1>
        <p className="lead mt-5 tr text-center">
          I Welcome to our <strong>INotebook</strong> website! We are thrilled
          to have you here and can't wait for you to explore all of the features
          that we have to offer. Our website is designed to help you keep track
          of your important notes and ideas, so that you never have to worry
          about losing them again.{" "}
        </p>

        <p className="lead text-center my-5">
          <Link to="/Signup" className="btn btn-primary lead ">
            {" "}
            SignUp Now{" "}
          </Link>
        </p>
      </main>
    </>
  );
};

export default Aboutus;
