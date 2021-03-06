import "./style/index.css"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group"

import Home from "@/project/home"
import About from "./project/about";
import Login from "./project/login";
import useLoginCheck from "./hook/useloginCheck";
import Logout from "./project/login/logout";
import QuickNav from "./project/layout/quickNav";
import Copyright from "./project/layout/copyright";
import { lazy, Suspense, useEffect } from "react";
import Loading from "./component/loading";
import CnzzInit from "./util/cnzz";

const LazyBlog = lazy(() => import("@/project/blog"))

const routes = [{
  path: "/",
  name: "home",
  Component: Home
}, {
  path: "/blog/*",
  name: "blog",
  Component: LazyBlog
}, {
  path: "/about",
  name: "about",
  Component: About
}]



function App() {
  useEffect(() => {
    CnzzInit()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
      <Page />
      {/* <PageAnimate /> */}
      <Copyright />
      <QuickNav />
    </BrowserRouter>
  );
}

const Page: React.FC = () => {
  useLoginCheck();
  const location = useLocation()
  return <Routes location={location}>
    {
      routes.map(({ path, Component, name }) => {
        return <Route key={name} path={path} element={
          <div className="page">
            {name === "blog"
              ? <Suspense fallback={<Loading />}>
                <Component />
              </Suspense>
              : <Component />
            }
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
