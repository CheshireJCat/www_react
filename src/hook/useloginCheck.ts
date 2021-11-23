import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router";

const useLoginCheck = () => {
  const navigate = useNavigate();
  const hotkey = process.env.REACT_APP_LOGIN_HOTKEY || "";
  useHotkeys(hotkey, () => {
    navigate(`/login`, { replace: true });
  });
  useHotkeys("out", () => {
    navigate(`/logout`);
  });
};

export default useLoginCheck;
