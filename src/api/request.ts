import { getToken, setToken } from "./token";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type contentType =
  | "application/json"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data";
type OtherParamas = {
  credentials?: "omit" | "same-origin" | "include";
  contentType?: contentType;
  data?:
  | {
    [propName: string]: any;
  }
  | string;
};

export const ContentType_json = "application/json";
export const ContentType_form = "application/x-www-form-urlencoded";
export const ContentType_multiForm = "multipart/form-data";

function formatBody(
  contentType: contentType,
  data: {
    [propName: string]: any;
  } = {}
): any {
  let body = null;
  if (contentType === ContentType_json) {
    body = JSON.stringify(data);
  } else if (contentType === ContentType_form) {
    body = new URLSearchParams();
    for (let key of Object.keys(data)) {
      body.append(key, data[key]);
    }
  } else if (contentType === ContentType_multiForm) {
    body = new FormData();
    for (let key of Object.keys(data)) {
      body.append(key, data[key]);
    }
  }
  return body;
}

function combineGetQuery(
  url: string,
  data:
    | {
      [propName: string]: any;
    }
    | string
) {
  let pre = !url.includes("?") ? "?" : "&";
  if (typeof data === "string") {
    return url + pre;
  } else {
    let res: string[] = [];
    for (const key of Object.keys(data)) {
      res.push(`${key}=${data[key]}`);
    }
    return url + pre + res.join("&");
  }
}

const request = async (
  url: string,
  method: Method = "GET",
  paramas?: OtherParamas
) => {
  let {
    credentials = "same-origin",
    contentType = ContentType_form,
    data = "",
  } = paramas || {};
  let requestParamas: any = {
    method,
    credentials,
    headers: {
      "Content-Type": contentType,
      "token": getToken()
    },
  };
  if (method === "GET") {
    url = !data ? url : combineGetQuery(url, data);
  } else {
    requestParamas.body =
      typeof data === "string" ? data : formatBody(contentType, data);
  }
  try {
    let res = await fetch(url, requestParamas);
    if (res.status === 200 && res.ok) {
      try {
        let json = await res.json();
        setToken(json.token || "");
        return json;
      } catch {
        return {
          error: res.statusText
        }
      }
    } else {
      return {
        error: "res.statusText"
      };
    }
  } catch (error) {
    return {
      error: "fetch错误",
    };
  }
};


export default request;
