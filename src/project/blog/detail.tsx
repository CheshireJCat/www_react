import { useDataBlogDetail } from "@/api/blog"
import Empty from "@/component/empty";
import MarkdownShow from "@/component/markdownShow";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useParams } from "react-router"
import SecondaryBody from "../layout/secondaryBody";

const ContentBox = styled(Box)`
    .markdown-body{
        background: none;
    }
`

const BlogDetail: React.FC = () => {
    const { id = 0 } = useParams()
    const [loading, detail] = useDataBlogDetail(+id > 0 ? +id : 0);
    return <SecondaryBody>
        <Container maxWidth="md" sx={{ mt: 2 }}>
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
                        <Typography variant="caption">{detail.UpdateTime}</Typography>
                        <ContentBox>
                            <MarkdownShow value={detail.Content}></MarkdownShow>
                        </ContentBox>
                    </div>
            }
        </Container>
    </SecondaryBody>
}

export default BlogDetail