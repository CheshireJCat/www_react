import { useDataBlogDetail } from "@/api/blog";
import Empty from "@/component/empty";
import Loading from "@/component/loading";
import { useTags } from "@/hook/useTags";
import { useParams } from "react-router";
import BlogCreate from "./create";

const BlogEdit: React.FC = () => {
    const { id = 0 } = useParams()
    const [TagMap] = useTags()
    const [loading, detail] = useDataBlogDetail(+id > 0 ? +id : 0);
    return loading ? <Loading /> : !detail ? <Empty /> : <BlogCreate edit={true} defaultValue={{
        id: detail.Id,
        title: detail.Title,
        category: detail.Category,
        summary: detail.Summary,
        content: detail.Content,
        thumb: detail.Thumb,
        status: detail.Status,
        tags: detail.Tags.split(",").map(item => TagMap.get(parseInt(item))).join(',')
    }} />
}

export default BlogEdit;