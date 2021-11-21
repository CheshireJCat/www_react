import { Route, Routes } from "react-router";

import BlogList from "./list"
import BlogDetail from "@/project/blog/detail";
import BlogCreate from "./create";
import BlogEdit from "./edit";

const Blog: React.FC = () => {
    return <Routes>
        <Route path="list" element={<BlogList />}></Route>
        <Route path="create" element={<BlogCreate />}></Route>
        <Route path="detail/:id" element={<BlogDetail />}></Route>
        <Route path="edit/:id" element={<BlogEdit />}></Route>
    </Routes>
}

export default Blog