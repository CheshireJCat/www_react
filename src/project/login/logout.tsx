import { api_logout } from "@/api/user"
import { Button, Stack } from "@mui/material"
import { useNavigate } from "react-router"
import CenterBody from "../layout/centerBody"

const Logout = () => {
    const navigate = useNavigate();
    const logout = function () {
        api_logout().then(errMsg => {
            if (!errMsg) {
                navigate(-1)
                return
            }
            console.error(errMsg)
        })
    }

    return <CenterBody>
        <Stack sx={{ height: '100%' }} justifyContent="center">
            <Button onClick={logout} color="error" size="large">logout</Button>
            <Button onClick={logout} color="error" size="large">logout</Button>
            <Button onClick={logout} color="error" size="large">logout</Button>
        </Stack>
    </CenterBody>
}


export default Logout