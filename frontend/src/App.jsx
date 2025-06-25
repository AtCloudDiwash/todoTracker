import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/404/PageNotFound";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/landing" element = {<Landing/>}></Route>
            <Route path="/signup" element = {<Signup/>}></Route>
            <Route path="/login" element = {<Login/>}></Route>

            {/* Catches all 404 routes */}
            <Route path="*" element = {<PageNotFound/>}></Route>
        </Routes>
      </Router>
    </>
  );
}
