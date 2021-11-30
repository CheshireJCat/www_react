import CoverSvg from "@/files/svg/undraw_lost_online_re_upmy.svg"
import { Button, Grid, Stack } from "@mui/material"
import { Box, styled } from "@mui/system"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useMediaQuery, useTheme } from '@mui/material';
import Pendulum from "../pendulum"
import { CnzzTrackEvent } from "@/util/cnzz"

const Cover = styled(Grid)`
    background: url(${CoverSvg}) center center no-repeat;
    background-size: contain;
    height: 100%;
`

const Slogan = styled(styled(Grid)`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
    color: #000;
    flex-direction: column;
`)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        fontSize: "50px"
    }
}))

const faces = ["ꈍ .̮ ꈍ", "( ‘-ωก̀ )", "(′｡• ᵕ •｡`) ♡", "⚆_⚆", "(๑◔◦◔๑)"]

const links = [{
    to: "/blog/list",
    text: "博客",
    name: "blog",
    newPage: false
}, {
    to: "/ff14price",
    text: "FF14物价",
    name: "ff14",
    newPage: true
}, {
    to: "/about",
    text: "关于我",
    name: "me",
    newPage: false
}]

function genFace() {
    return faces[Math.floor(Math.random() * (faces.length - 1))]
}

const Home: React.FC = () => {
    const [face, setFace] = useState(genFace())
    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    return <Grid container height={"100%"} sx={{ px: { xs: 0, md: 10 } }}>
        <Slogan item xs={12} md={8} >
            {!mobile && <Pendulum />}
            <Box className="animate__animated animate__tada">
                {face}
            </Box>
            <Stack direction={mobile ? "column" : "row"} spacing={2} alignItems="center">
                {links.map(({ to, text, name, newPage }, index) => {
                    return <Link className="animate__animated animate__bounceIn" style={{ display: "inherit", animationDelay: `${index * 0.2}s` }} to={to} key={name} target={newPage ? "_blank" : ""}>
                        <Button variant={name === "blog" ? "contained" : "outlined"} color="success"  onClick={() => CnzzTrackEvent("首页", "按钮", name)}>{text}</Button>
                    </Link>
                })}
            </Stack>
        </Slogan>
        <Grid item xs={12} md={4} onClick={() => setFace(genFace())} >
            <Cover />
        </Grid>
    </Grid >
}

export default Home