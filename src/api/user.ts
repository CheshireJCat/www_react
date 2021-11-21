import request from "./request";

export const api_login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    let res = await request("/api/user/login", "POST", {
      data: {
        email,
        password,
      },
    });
    if (res.code === 0) return "";
    return res.error || "登录失败";
  } catch {
    return "网络错误";
  }
};

export const api_logout = async (): Promise<string> => {
  try {
    let res = await request("/api/user/logout", "POST");
    if (res.code === 0) return "";
    return res.error || "登录失败";
  } catch {
    return "网络错误";
  }
};

export const api_userInfo = async (id: number) => {
  try {
    let res = await request("/api/user/info/" + id);
    return res;
  } catch {}
};
