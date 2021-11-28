import { api_blogDelete, api_blogUpdateStatus, useDataBlogList } from "@/api/blog"
import Empty from "@/component/empty"
import useLogined from "@/hook/useLogined"
import { Add } from "@mui/icons-material"
import { Button, Divider, Grid, Stack, Typography, Box } from "@mui/material"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import CenterBody from "../layout/centerBody"
import CategoryNavs, { CategoryNavsDraw } from "./categoryNavs"
import ListCard from "./listCard"

const BlogList: React.FC = () => {
    const { cid } = useParams()
    const [loading, list, setList, loadMore] = useDataBlogList(cid)
    const logined = useLogined()

    const deleteBlog = async (id: number) => {
        let { effectRows, msg } = await api_blogDelete(id)
        if (effectRows < 0) {
            toast.error(msg)
        } else if (effectRows === 0) {
            toast.warn("不存在此文章")
        } else {
            setList(prev => prev.filter(({ Id }) => Id !== id))
            toast.success(msg)
        }
    }

    const updateBlog = async (id: number, status: number) => {
        let { effectRows, msg } = await api_blogUpdateStatus(id, status)
        if (effectRows < 0) {
            toast.error(msg)
        } else if (effectRows === 0) {
            toast.warn("状态未改变")
        } else {
            setList(prev => {
                let res = prev.slice()
                res.forEach((item) => {
                    if (item.Id === id) {
                        item.Status = status
                    }
                })
                return res
            })
            toast.success(msg)
        }
    }

    function handleScroll(e: any) {
        if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 1) {
            loadMore()
        }
    }

    return <CenterBody>
        <Stack sx={{ height: "100%" }}>
            <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography variant="h4" className="animate__animated animate__fadeIn">
                        博客
                    </Typography>
                    {logined && <Link to="../create" ><Button variant="outlined" startIcon={<Add />} color="secondary">写博客</Button></Link>}
                    <CategoryNavsDraw />
                </Stack>
                <Divider sx={{ borderColor: "theme.palette.grey[900]", my: 2 }} />
            </Box>
            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                <Grid container sx={{ height: "100%", overflow: "hidden" }} spacing={2}>
                    {/* list */}
                    <Grid item xs={12} md={10} sx={{ height: "100%", overflow: "auto", overflowX: "hidden" }} onScroll={e => handleScroll(e)}>
                        {!list.length ? (!loading ? <Empty /> : null) : <>
                            {list.map((blog, index) => <ListCard key={blog.Id} index={index} {...{ blog, updateBlog, deleteBlog }} />)}
                        </>}
                        {loading && <Box sx={{ textAlign: "center" }}>loading...</Box>}
                    </Grid>
                    {/* category */}
                    <Grid item xs={12} md={2} sx={{
                        display: {
                            md: "block"
                        }
                    }}>
                        <CategoryNavs />
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    </CenterBody>
}

export default BlogList