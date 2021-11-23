import { useEffect, useState } from "react";
import request from "./request";

export async function api_blogList(): Promise<{
  list: BlogListItem[];
  page: number;
  size: number;
  total: number;
  totalPage: number;
}> {
  let empty = {
    list: [],
    page: 0,
    size: 10,
    total: 0,
    totalPage: 0,
  };
  try {
    let res = await request("/api/blog/list");
    if (res.code === 0) {
      return res.data;
    }
    return empty;
  } catch (error) {
    return empty;
  }
}

export function useDataBlogList(): [
  boolean,
  BlogListItem[],
  React.Dispatch<React.SetStateAction<BlogListItem[]>>
] {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<BlogListItem[]>([]);
  useEffect(() => {
    async function getData() {
      let res = await api_blogList();
      let { list } = res;
      setLoading(false);
      setList(list);
    }
    getData();
  }, []);
  return [loading, list, setList];
}

export async function api_blogDetail(id: number): Promise<BlogDetail | null> {
  try {
    let res = await request(`/api/blog/detail/${id}`);
    if (res.code === 0) {
      return res.data || null;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function useDataBlogDetail(id: number): [boolean, BlogDetail | null] {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<BlogDetail | null>(null);
  useEffect(() => {
    async function getData() {
      let res = await api_blogDetail(id);
      setLoading(false);
      setRes(res);
    }
    getData();
  }, []);
  return [loading, res];
}

export async function api_blogCreate(param: BlogEdit): Promise<{
  id: number;
  msg: string;
}> {
  try {
    let res = await request(`/api/blog/create`, "POST", {
      data: param,
    });
    if (res.code === 0 && res?.data?.id > 0) {
      return {
        id: res.data.id,
        msg: "发布成功",
      };
    }
    return {
      id: 0,
      msg: res.error || "",
    };
  } catch (error) {
    return {
      id: 0,
      msg: "网络通信失败",
    };
  }
}

export async function api_blogDelete(id: number): Promise<{
  effectRows: number;
  msg: string;
}> {
  try {
    let res = await request(`/api/blog/delete`, "POST", {
      data: { id },
    });
    if (res.code === 0) {
      return {
        effectRows: res?.data?.effectRows || 0,
        msg: "删除成功",
      };
    }
    return {
      effectRows: -1,
      msg: res.error || "",
    };
  } catch (error) {
    alert(error);
    return {
      effectRows: -1,
      msg: "网络通信失败",
    };
  }
}

export async function api_blogUpdateStatus(
  id: number,
  status: number
): Promise<{
  effectRows: number;
  msg: string;
}> {
  try {
    let res = await request(`/api/blog/updateStatus`, "POST", {
      data: { id, status },
    });
    if (res.code === 0) {
      return {
        effectRows: res?.data?.effectRows || 0,
        msg: "更新成功",
      };
    }
    return {
      effectRows: -1,
      msg: res.error || "",
    };
  } catch (error) {
    alert(error);
    return {
      effectRows: -1,
      msg: "网络通信失败",
    };
  }
}
