import categories from "@/config/category"
import { Menu } from "@mui/icons-material"
import { Drawer, List, ListItem, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const CategoryNavs: React.FC<{
    py?: string
}> = ({
    py = "3px"
}) => {
        const { cid = -1 } = useParams()
        return <Paper sx={{ bgcolor: "primary.light" }}>
            <List>
                <ListItem sx={{ color: "secondary.main", py }} disabled={cid === -1} key={-1}>
                    {-1 === cid ? "All" : <Link to={`/blog/list`}>All</Link>}
                </ListItem>
                {Array.from(categories).map(([id, name]) => {
                    return <ListItem sx={{ color: "secondary.main", py }} disabled={+cid === id} key={id}>
                        {id === +cid ? name : <Link to={`/blog/list/category/${id}`}>{name}</Link>}
                    </ListItem>
                })}
            </List>
        </Paper >
    }

export const CategoryNavsDraw: React.FC = () => {
    const [open, setOpen] = useState(false)
    const { cid = -1 } = useParams()
    useEffect(() => {
        setOpen(false);
    }, [cid])
    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setOpen(open)
        };
    return <>
        <Menu sx={{
            display: {
                xs: "block",
                sm: "block",
                md: "none",
            }
        }} onClick={toggleDrawer(true)} />
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
        >
            <CategoryNavs py={"10px"} />
        </Drawer>
    </>
}

export default CategoryNavs