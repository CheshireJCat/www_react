import { useDataBlogDetail } from "@/api/blog"
import Empty from "@/component/empty";
import Loading from "@/component/loading";
import { useParams } from "react-router"

const BlogDetail: React.FC = () => {
    const { id = 0 } = useParams()
    const [loading, detail] = useDataBlogDetail(+id > 0 ? +id : 0);
    return loading ? <Loading /> : !detail ? <Empty /> : <div>
        <h3>{detail.Title}</h3>
        <h3>{detail.UpdateTime}</h3>
        <h3>{detail.Content}</h3>
    </div>
}

export default BlogDetail