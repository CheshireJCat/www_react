import { VisibilityOffOutlined, VisibilityOutlined, EditOutlined, DeleteForeverOutlined } from "@mui/icons-material";
import { Paper, Grid, Typography, Stack, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import BlogInfo from "./infos";
import useLogined from "@/hook/useLogined"
import SimDialog from "@/component/dialog";

const ListCard: React.FC<{
    blog: BlogListItem,
    index?: number,
    deleteBlog: (id: number) => Promise<void>,
    updateBlog: (id: number, status: number) => Promise<void>
}> = ({ blog, deleteBlog, updateBlog, index = 0 }) => {
    let { Id, Category, Title, Summary, Thumb, Status, UpdateTime, CreateTime, Tags } = blog
    const logined = useLogined()
    return <Paper
        className="animate__flipInX animate__animated"
        sx={{
            mb: 3,
            background: `url(${Thumb}) center center no-repeat`,
            backgroundSize: "cover",
            animationDelay: `${index * 0.1}s`
        }} elevation={3} key={Id}>
        <Grid container sx={{ bgcolor: "rgba(255,255,255,.86)" }}>
            <Grid></Grid>
            <Grid item flexGrow="1" sx={{ p: 2 }}>
                <Link style={{ color: "#000", textDecoration: "none" }} to={`/blog/detail/${Id}`}>
                    <Typography variant="h5">{Title}</Typography>
                    <BlogInfo tags={Tags} createTime={CreateTime} updateTime={UpdateTime} categroy={Category} />
                    {Summary && <Typography variant="body2" fontSize={16}>{Summary}</Typography>}
                </Link>
                {logined &&
                    <Stack direction="row" justifyContent="flex-end">
                        {Status !== 1 && <IconButton title="公开" size="small" aria-label="show" color="secondary" onClick={() => updateBlog(Id, 1)}><VisibilityOffOutlined /></IconButton>}
                        {Status === 1 && <IconButton title="隐藏" size="small" aria-label="hide" color="secondary" onClick={() => updateBlog(Id, 2)}><VisibilityOutlined /></IconButton>}
                        <Link to={`/blog/edit/${Id}`}><IconButton size="small" aria-label="edit" color="secondary"><EditOutlined /></IconButton></Link>
                        <IconButton size="small" aria-label="delete" color="secondary">
                            <SimDialog content="确定删除吗？" confirmFunc={() => {
                                deleteBlog(Id)
                            }}>
                                <DeleteForeverOutlined />
                            </SimDialog>
                        </IconButton>
                    </Stack>}
            </Grid>

        </Grid>
    </Paper>
}
export default ListCard;