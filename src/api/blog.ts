import { useEffect, useState } from "react";
import request from "./request";

export async function api_blogList(
  page = 1,
  category?: string
): Promise<{
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
  let data: { page?: number; category?: string } = { page };
  if (category !== undefined) {
    data = { page, category };
  }
  try {
    let res = await request("/api/blog/list", "GET", {
      data,
    });
    if (res.code === 0) {
      return { ...empty, ...res.data };
    }
    return empty;
  } catch (error) {
    return empty;
  }
}

export function useDataBlogList(
  categoryId?: string
): [
    boolean,
    BlogListItem[],
    React.Dispatch<React.SetStateAction<BlogListItem[]>>,
    () => void
  ] {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<BlogListItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const loadMore = () => {
    if (page < totalPage) {
      getData(page + 1);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    reset();
    getData();
  }, [categoryId]);

  function reset() {
    setLoading(false);
    setList([]);
    setPage(1);
    setTotalPage(1);
  }

  async function getData(loadPage = 1) {
    if (loading) return;
    setLoading(true);
    let res = await api_blogList(loadPage, categoryId);
    let { list, page, totalPage } = res;
    setLoading(false);
    setList((prev) => {
      return [...prev, ...list];
    });
    setPage(page);
    setTotalPage(totalPage);
  }

  return [loading, list, setList, loadMore];
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
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState<BlogDetail | null>(null);
  useEffect(() => {
    async function getData() {
      let res = await api_blogDetail(id);
      setRes(res);
      setLoading(false);
    }
    getData();
  }, []);
  return [loading, res];
}

function preDealData(data: BlogEdit) {
  data.title = data.title.trim();
  data.tags = data.tags
    .replaceAll("，", ",")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .join(",");
}

export async function api_blogCreate(data: BlogEdit): Promise<{
  id: number;
  msg: string;
}> {
  preDealData(data);
  try {
    let res = await request(`/api/blog/create`, "POST", {
      data,
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

export async function api_blogEdit(data: BlogEdit): Promise<{
  effectRows: number;
  msg: string;
}> {
  preDealData(data);
  try {
    let res = await request(`/api/blog/update`, "POST", {
      data,
    });
    if (res.code === 0) {
      return {
        effectRows: res?.data?.effectRows || 0,
        msg: "修改成功",
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
