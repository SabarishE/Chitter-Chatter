
import {BrowserRouter as Router,Route} from "react-router-dom"
import {Login} from "./components/login"
import {Chat} from "./components/chat"

import { ToastContainer,Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <div className="application">
    <Router>
      <Route path ="/" exact>
        <Login/>
      </Route>
      <Route path ="/chat" exact>
        <Chat/>
      </Route>
     
      <ToastContainer transition={Zoom} toastStyle={{ backgroundColor: "purple",color:"white" }} />
    </Router>
    </div>
    </>
  );
}

export default App;
