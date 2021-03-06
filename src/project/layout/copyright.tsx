import { Link } from "@mui/material"
import { Box } from "@mui/system"

const Copyright: React.FC = () => {
    return <Box sx={{ position: "fixed", bottom: 0, left: 0, width: '100%', textAlign: "center", fontSize: 12, lineHeight: "24px", verticalAlign: "center" }}>
        <img style={{ verticalAlign: "center", position: "relative", top: "5px" }} src="/beian.png" alt="" />
        <Link sx={{ color: "#000!important" }} target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802037834">京公网安备 11010802037834号</Link>
        <Link sx={{ color: "#000!important", ml: 2, display: { xs: "block", md: "inline" } }} href="https://beian.miit.gov.cn" target="_blank">京ICP备2021034098号-1</Link>

        <Box sx={{ color: "#000!important", ml: 2, display: { xs: "none", md: "inline" } }}>&nbsp;&nbsp;&nbsp;&nbsp;lmaomaoz@live.com</Box>
    </Box>
}

export default Copyright