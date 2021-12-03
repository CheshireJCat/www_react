import React, { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router";
import BlogList from "./list"
import BlogDetail from "@/project/blog/detail";
import Loading from "@/component/loading";
import TagProvider from "@/hook/useTags";
import { useApiTags } from "@/api/tag";

const LazyCreate = lazy(() => import("./create"))
const LazyEdit = lazy(() => import("./edit"))

const Blog: React.FC = () => {
    return <>
        <Routes>
            <Route path="" element={<BlogContent />}>
                <Route path="list" element={<BlogList />} />
                <Route path="list/category/:cid" element={<BlogList />} />
                <Route path="detail/:id" element={<BlogDetail />} />
                <Route path="create" element={<Suspense fallback={<Loading />}><LazyCreate /></Suspense>}></Route>
                <Route path="edit/:id" element={<Suspense fallback={<Loading />}><LazyEdit /></Suspense>}></Route>
            </Route>
        </Routes>
    </>
}

const BlogContent: React.FC = () => {
    const [loading, tags] = useApiTags()
    return loading ? <Loading /> : <TagProvider tags={tags}>
        <Outlet />
    </TagProvider>
}

export default Blog