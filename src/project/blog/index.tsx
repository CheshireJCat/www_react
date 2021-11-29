import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import BlogList from "./list"
import BlogDetail from "@/project/blog/detail";
import GoBack from "../layout/goBack";
import Loading from "@/component/loading";

const LazyCreate = lazy(() => import("./create"))
const LazyEdit = lazy(() => import("./edit"))

const Blog: React.FC = () => {
    return <>
        <Routes>
            <Route path="list" element={<BlogList />}></Route>
            <Route path="list/category/:cid" element={<BlogList />}></Route>
            <Route path="detail/:id" element={<BlogDetail />}></Route>
            <Route path="create" element={<Suspense fallback={<Loading />}><LazyCreate /></Suspense>}></Route>
            <Route path="edit/:id" element={<Suspense fallback={<Loading />}><LazyEdit /></Suspense>}></Route>
        </Routes>
    </>
}

export default Blog