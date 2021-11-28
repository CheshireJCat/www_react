import { Code, Email, GitHub, Message, Star } from "@mui/icons-material"
import { Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material"
import { Box, styled } from "@mui/system"
import CenterBody from "../layout/centerBody"

const Text = styled(ListItemText)`
    color: #000;
`

const About: React.FC = () => {
    return <CenterBody sx={{ py: 3 }}>
        <Paper sx={{ background: `url("https://source.unsplash.com/900x1600/?cat") no-repeat center`, backgroundSize: "cover", height: "100%" }}>
            <Box sx={{ p: 2, background: 'rgba(255,255,255,.8)', height: "100%" }}>
                <Typography variant="h3" className="animate__animated animate__fadeIn">About</Typography>
                <Divider />
                <List sx={{ color: "#000" }} className="animate__animated animate__fadeIn">
                    <ListItem>
                        <ListItemIcon><Star /></ListItemIcon>
                        <Text>程序猿 / 动漫 / 最终幻想14 光之战士 / 岛村抱月yyds / 有猫 </Text>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Code /></ListItemIcon>
                        <Text>Html / Typescript / React / Vue / Golang / Mysql </Text>
                    </ListItem>
                    <ListItem component="a" href="https://github.com/CheshireJCat">
                        <ListItemIcon><GitHub /></ListItemIcon>
                        <Text>https://github.com/CheshireJCat</Text>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Email /></ListItemIcon>
                        <Text>lmaomaoz@live.com</Text>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Message /></ListItemIcon>
                        <Text>有事 / 聊天 / 交朋友 请尝试发邮件</Text>
                    </ListItem>
                </List>
            </Box>
        </Paper>
    </CenterBody>
}

export default About