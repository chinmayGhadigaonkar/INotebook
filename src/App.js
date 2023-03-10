import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Aboutus from "./componets/Aboutus";
import Home from "./componets/Home";
import NoteState from "./context/NoteState";
import Loginpage from "./componets/Loginpage";
import Signup from "./componets/Signup";
import Alert from "./componets/Alert";
import { useState } from "react";



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <NoteState>
        
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            {/* <Route  element={< Navbar/>}></Route> */}
           
            <Route path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route path="/Aboutus" element={<Aboutus />}></Route>
            <Route path="/Login" element={<Loginpage showAlert={showAlert}></Loginpage>}></Route>
            <Route path="/Signup" element={<Signup showAlert={showAlert}></Signup>}></Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
