import CoverSvg from "@/files/svg/undraw_lost_online_re_upmy.svg"
import { Button, Grid, Stack } from "@mui/material"
import { Box, styled } from "@mui/system"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useMediaQuery, useTheme } from '@mui/material';

const Cover = styled(Grid)`
    background: url(${CoverSvg}) center center no-repeat;
    background-size: contain;
    height: 100%;
`

const Slogan = styled(styled(Grid)`
    display: flex;
    justify-content: space-evenly;
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

function genFace() {
    return faces[Math.floor(Math.random() * (faces.length - 1))]
}

const Home: React.FC = () => {
    const [face, setFace] = useState(genFace())
    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    return <Grid container spacing={2} height={"100%"} px={10}>
        <Slogan item xs={12} md={8} >
            <Box>
                {face}
            </Box>
            <Stack direction={mobile ? "column" : "row"} spacing={2} alignItems="center">
                <Link style={{ display: "inherit" }} to="/blog/list"><Button variant="contained" color="success">博客</Button></Link>
                <Link style={{ display: "inherit" }} to="/ff14price" target="_blank"><Button variant="outlined" color="success">FF14物价</Button></Link>
                <Link style={{ display: "inherit" }} to="/about"><Button variant="outlined" color="success">关于我</Button></Link>
            </Stack>
        </Slogan>
        <Grid item xs={12} md={4} onClick={() => setFace(genFace())} >
            <Cover />
        </Grid>
    </Grid>
}

export default Home