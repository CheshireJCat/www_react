import GlobalStyle from "@/style/global";
import "./style/index.css"
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group"

import Blog from "@/project/blog"
import Home from "@/project/home"
import Nav from "./project/layout/nav";
import About from "./project/about";
import Login from "./project/login";
import useLoginCheck from "./hook/useloginCheck";
import Logout from "./project/login/logout";

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
}, {
  path: "/login",
  name: "login",
  Component: Login
}, {
  path: "/logout",
  name: "logout",
  Component: Logout
}]

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Nav />
        <Page />
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
  return <TransitionGroup style={{ position: "relative" }}>
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
