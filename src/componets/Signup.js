import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credential, setcredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigator = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const host = process.env.REACT_APP_BACKEND_URL
    const respose = await fetch(`${host}/api/auth`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credential.name[0],
        email: credential.email[0],
        password: credential.password[0],
      }),
    });
    const result = await respose.json();

   
    if (result.sucess) {
      localStorage.setItem("autotoken", result.autotoken);
      navigator("/Login");
      props.showAlert("Signup Sucessfully", "success");
    } else {
      props.showAlert("please enter valid credential", "danger");
    }
  };
  const onChange = (event) => {
    setcredential({ ...credential, [event.target.name]: [event.target.value] });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credential.name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credential.email}
              onChange={onChange}
              aria-describedby="emailHelp"
              min="5"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credential.password}
              onChange={onChange}
              min="5"
              id="password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              name="cpassword"
              value={credential.cpassword}
              onChange={onChange}
              min="5"
              id="cpassword"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
