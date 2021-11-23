import "./style/index.css"
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group"

import Blog from "@/project/blog"
import Home from "@/project/home"
import About from "./project/about";
import Login from "./project/login";
import useLoginCheck from "./hook/useloginCheck";
import Logout from "./project/login/logout";
import QuickNav from "./project/layout/quickNav";
import Copyright from "./project/layout/copyright";

const routes = [{
  path: "/",
  name: "home",
  Component: Home
}, {
  path: "/blog/*",
  name: "blog",
  Component: Blog
}, {
  path: "/about",
  name: "about",
  Component: About
}]



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
        <PageAnimate />
        <Copyright />
        <QuickNav />
      </BrowserRouter>
      <ToastContainer
        hideProgressBar={false}
        position="top-right"
        autoClose={2000}
        limit={3}
      />
    </>
  );
}

const Page: React.FC = () => {
  useLoginCheck();
  const location = useLocation()
  return <Routes location={location}>
    {
      routes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={
          <div className="page">
            <Component />
          </div>
        }></Route>
      })
    }
  </Routes>
}

const PageAnimate: React.FC = () => {
  useLoginCheck();
  const location = useLocation()
  return <TransitionGroup style={{ position: "relative", height: "100%", overflow: "hidden" }}>
    <CSSTransition key={location.key} classNames="page" timeout={300}>
      <Routes location={location}>
        {
          routes.map(({ path, Component }) => {
            return <Route key={path} path={path} element={
              <div className="page">
                <Component />
              </div>
            }></Route>
          })
        }
      </Routes>
    </CSSTransition>
  </TransitionGroup>
}

export default App;
