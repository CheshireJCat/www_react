import { api_logout } from "@/api/user"
import { setLogined } from "@/hook/useLogined"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

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

    return <button type="button" onClick={logout}>logout</button>
}


export default Logout