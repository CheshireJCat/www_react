import { useEffect, useState } from "react";

const key = "nekosLogined";

const useLogined = () => {
  const [logined, setLogined] = useState(false);
  useEffect(() => {
    const isLogin = !window.localStorage.getItem(key) ? false : true;
    setLogined(isLogin);
  }, []);
  return logined;
};

export const setLogined = (status: boolean) => {
  status
    ? window.localStorage.setItem(key, "1")
    : window.localStorage.removeItem(key);
};

export default useLogined;
