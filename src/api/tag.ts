import { useEffect, useState } from "react";
import request from "./request";

export async function api_tags(): Promise<Tag[]> {
  try {
    let res = await request("/api/blog/tag/list");
    if (res.code === 0) {
      return res.data || [];
    }
    return [];
  } catch (error) {
    return [];
  }
}

export function useApiTags(): [boolean, Tag[]] {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Tag[]>([]);
  useEffect(() => {
    async function getData() {
      let res = await api_tags();
      setList(res);
      setLoading(false);
    }
    getData();
  }, []);
  return [loading, list];
}
