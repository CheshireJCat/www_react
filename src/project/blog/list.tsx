import { api_blogDelete, api_blogUpdateStatus, useDataBlogList } from "@/api/blog"
import Empty from "@/component/empty"
import useLogined from "@/hook/useLogined"
import useTitle from "@/hook/useTitle"
import { CnzzTrackEvent } from "@/util/cnzz"
import { Add } from "@mui/icons-material"
import { Button, Divider, Grid, Stack, Typography, Box } from "@mui/material"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import CenterBody from "../layout/centerBody"
import CategoryNavs, { CategoryNavsDraw } from "./categoryNavs"
import ListCard from "./listCard"

const BlogList: React.FC = () => {
    const { cid } = useParams();
    const logined = useLogined();
    const [loading, list, setList, loadMore] = useDataBlogList(cid, logined)

    useTitle("博客");

    useEffect(() => {
        CnzzTrackEvent("博客列表页", !cid ? "all" : cid)
    }, [cid])

    const deleteBlog = async (id: number) => {
        let { effectRows, msg } = await api_blogDelete(id)
        if (effectRows < 0) {
            console.error(msg)
        } else if (effectRows === 0) {
            console.warn("不存在此文章")
        } else {
            setList(prev => prev.filter(({ Id }) => Id !== id))
        }
    }

    const updateBlog = async (id: number, status: number) => {
        let { effectRows, msg } = await api_blogUpdateStatus(id, status)
        if (effectRows < 0) {
            console.error(msg)
        } else if (effectRows === 0) {
            console.warn("状态未改变")
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