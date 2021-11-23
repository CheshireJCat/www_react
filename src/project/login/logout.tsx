import { api_logout } from "@/api/user"
import { setLogined } from "@/hook/useLogined"
import { Button, Stack } from "@mui/material"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import CenterBody from "../layout/centerBody"

const Logout = () => {
    const navigate = useNavigate();
    const logout = function () {
        api_logout().then(errMsg => {
            if (!errMsg) {
                setLogined(false)
                navigate(-1)
                return
            }
            toast.error(errMsg)
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