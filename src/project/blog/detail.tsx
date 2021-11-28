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

const Thumb = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: blur(10px);
    }
    &:after{
        content: "";
        display : block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(76,175,80,.8);
    }
`

const BlogDetail: React.FC = () => {
    const { id = 0 } = useParams()
    const [loading, detail] = useDataBlogDetail(+id > 0 ? +id : 0);
    const thumb = detail?.Thumb || "";
    return <SecondaryBody>
        {thumb && <Thumb><img src={thumb} alt="thumb" /></Thumb>}
        <Container fixed sx={{ mt: 2, position: "relative", zIndex: 1 }}>
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
                        <Typography variant="h3" className="animate__animated animate__fadeIn">{detail.Title}</Typography>
                        <BlogInfo className="animate__animated animate__fadeIn" tags={detail.Tags} updateTime={detail.UpdateTime} createTime={detail.CreateTime} categroy={detail.Category} />
                        <ContentBox className="animate__animated animate__fadeIn">
                            <MarkdownShow value={detail.Content}></MarkdownShow>
                        </ContentBox>
                    </div>
            }
        </Container>
    </SecondaryBody>
}

export default BlogDetail