import CenterBody from "@/project/layout/centerBody"
import { Typography } from "@mui/material"

const Empty: React.FC = () => {
    return <CenterBody sx={{ textAlign: "center" }}>
        <Typography variant="h6" mb={2}>色即是空，空即是色</Typography>
        <img style={{ maxWidth: "300px" }} src="https://source.unsplash.com/random" alt="no data" />
    </CenterBody>
}
export default Empty