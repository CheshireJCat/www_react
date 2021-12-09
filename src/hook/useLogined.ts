import { RootState } from "@/store";
import { useAppSelector } from ".";

const useLogined = (): boolean => {
  const logined = useAppSelector((state: RootState) => state.login.logined)
  return logined;
};

export default useLogined;
