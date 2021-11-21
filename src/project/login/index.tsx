import { api_login } from "@/api/user"
import { setLogined } from "@/hook/useLogined"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

const Login = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("1234@qq.com");
    const [password, setPassword] = useState("12345678");
    const hotkey = process.env.REACT_APP_LOGIN_HOTKEY2 || "";
    useHotkeys(hotkey, () => setShow(true));

    const login = function () {
        api_login(email, password).then(errMsg => {
            if (!errMsg) {
                setLogined(true)
                navigate(-1)
                return
            }
            toast.error(errMsg)
            setLogined(false)
        })
    }

    return !show ? null : <div>
        <form>
            <div>
                <label>email</label>
                <input type="email" defaultValue={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div>
                <label>password</label>
                <input type="password" defaultValue={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button type="button" onClick={login}>submit</button>
        </form >
    </div >
}


export default Login