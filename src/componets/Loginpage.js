import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Loginpage = (props) => {
  const [login, setlogin] = useState({ email: "", password: "" });

  const navigator = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const host = process.env.REACT_APP_BACKEND_URL
    const respose = await fetch(`${host}/api/auth/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: login.email[0],
        password: login.password[0],
      }),
    });
    const result = await respose.json();
    // console.log(login.email[0],login.password[0])
    console.log(result);
    if (result.success) {
      localStorage.setItem("email", login.email);
      localStorage.setItem("autotoken", result.autotoken);

      navigator("/");
      props.showAlert("Login Sucessfully", "success");
    } else {
      props.showAlert("Incorrect email or password", "danger");
    }
  };
  const onChange = (event) => {
    setlogin({ ...login, [event.target.name]: [event.target.value] });
  };
  return (
    <>
      <div className="container my-3">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={login.email}
              onChange={onChange}
              aria-describedby="emailHelp"
              minLength="5"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={login.password}
              onChange={onChange}
              id="exampleInputPassword1"
              minLength="5"
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

export default Loginpage;
