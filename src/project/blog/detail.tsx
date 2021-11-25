import { useDataBlogDetail } from "@/api/blog"
import Empty from "@/component/empty";
import MarkdownShow from "@/component/markdownShow";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useParams } from "react-router"
import SecondaryBody from "../layout/secondaryBody";
import BlogInfo from "./infos";

const ContentBox = styled(Box)`
    .markdown-body{
        background: none;
    }
`

const BlogDetail: React.FC = () => {
    const { id = 0 } = useParams()
    const [loading, detail] = useDataBlogDetail(+id > 0 ? +id : 0);
    return <SecondaryBody>
        <Container fixed sx={{ mt: 2 }}>
            {
                loading ?
                    <>
                        <Skeleton height={100} />
                        <Skeleton height={30} sx={{ ml: 5 }} />
                        <Skeleton height={30} />
                        <Skeleton height={30} />
                        <Skeleton height={30} />
                        <Skeleton height={30} />
                    </> : !detail ? <Empty /> : <div>
                        <Typography variant="h3">{detail.Title}</Typography>
                        <BlogInfo tags={detail.Tags} time={detail.UpdateTime} categroy={detail.Category} />
                        <ContentBox>
                            <MarkdownShow value={detail.Content}></MarkdownShow>
                        </ContentBox>
                    </div>
            }
        </Container>
    </SecondaryBody>
}

export default BlogDetail