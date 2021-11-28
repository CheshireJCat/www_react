import { getToken } from "@/api/token";
import { useEffect, useState } from "react";

const useLogined = () => {
  const [logined, setLogined] = useState(false);
  useEffect(() => {
    setLogined(!!getToken());
  }, []);
  return logined;
};

export default useLogined;
