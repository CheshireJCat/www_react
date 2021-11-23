import { api_blogDelete, api_blogUpdateStatus, useDataBlogList } from "@/api/blog"
import useLogined from "@/hook/useLogined"
import { Add, DeleteForeverOutlined, EditOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { Button, Divider, Grid, Paper, Stack, Typography, IconButton, Skeleton, Box } from "@mui/material"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import CenterBody from "../layout/centerBody"

const BlogList: React.FC = () => {
    const [loading, list, setList] = useDataBlogList()
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


    return <CenterBody>
        <Stack sx={{ height: "100%" }}>
            <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography variant="h4">
                        博客
                    </Typography>
                    {logined && <Link to="../create" ><Button variant="outlined" startIcon={<Add />} color="secondary">写博客</Button></Link>}
                </Stack>
                <Divider sx={{ borderColor: "theme.palette.grey[900]", my: 2 }} />
            </Box>
            <Box sx={{ flexGrow: 1, overflow: "auto" }}>
                {!loading ?
                    list.map(({ Id, Title, Summary, Thumb, Status, UpdateTime }) => {
                        return <Paper sx={{
                            mb: 3,
                            background: `url(${Thumb}) no-repeat`,
                            backgroundSize: "cover"
                        }} elevation={3} key={Id}>
                            <Grid container sx={{ bgcolor: "rgba(255,255,255,.5)" }}>
                                <Grid></Grid>
                                <Grid item flexGrow="1" sx={{ p: 2 }}>
                                    <Link style={{ color: "#000", textDecoration: "none" }} to={`/blog/detail/${Id}`}>
                                        <Typography variant="h5">{Title}</Typography>
                                        <Typography variant="subtitle1" fontSize={14}>{UpdateTime}</Typography>
                                        {Summary && <Typography variant="body2" fontSize={16}>{Summary}</Typography>}
                                    </Link>
                                    {logined &&
                                        <Stack direction="row" justifyContent="flex-end">
                                            {Status !== 1 && <IconButton title="公开" size="small" aria-label="show" color="secondary" onClick={() => updateBlog(Id, 1)}><VisibilityOffOutlined /></IconButton>}
                                            {Status === 1 && <IconButton title="隐藏" size="small" aria-label="hide" color="secondary" onClick={() => updateBlog(Id, 2)}><VisibilityOutlined /></IconButton>}
                                            <Link to={`/blog/edit/${Id}`}><IconButton size="small" aria-label="edit" color="secondary"><EditOutlined /></IconButton></Link>
                                            <IconButton size="small" aria-label="delete" color="secondary" onClick={() => deleteBlog(Id)}><DeleteForeverOutlined /></IconButton>
                                        </Stack>}
                                </Grid>

                            </Grid>
                        </Paper>
                    }) :
                    <>
                        <Skeleton height={100} animation="wave" />
                        <Skeleton height={100} animation="wave" />
                        <Skeleton height={100} animation="wave" />
                    </>}
            </Box>
        </Stack>
    </CenterBody>
}

export default BlogList