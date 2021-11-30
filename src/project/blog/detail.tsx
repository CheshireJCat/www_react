import { useDataBlogDetail } from "@/api/blog"
import Empty from "@/component/empty";
import GoTop from "@/component/goTop";
import MarkdownShow from "@/component/markdownShow";
import { CnzzTrackEvent } from "@/util/cnzz";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useRef } from "react";
import { useParams } from "react-router"
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
    pointer-events: none;
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
    const ref = useRef<HTMLDivElement>(null)
    return <>
        {thumb && <Thumb><img src={thumb} alt="thumb" /></Thumb>}
        <Box ref={ref} sx={{ pt: 2, position: "relative", height: "100%", overflow: "auto", zIndex: 1 }}>
            <Container fixed>
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
                            <Cnzz Category={detail.Category} Title={detail.Title} Id={detail.Id} />
                        </div>
                }
            </Container>
        </Box>
        <GoTop scrollRef={ref} sx={{ position: "fixed", bottom: { xs: 5, md: 60 }, right: { xs: 5, md: 16 }, zIndex: 11 }} />
    </>
}

const Cnzz: React.FC<{
    Category: number;
    Title: string;
    Id: number;
}> = ({ Category, Title, Id }) => {
    useEffect(() => {
        CnzzTrackEvent("博客详情页", Category.toString(), Title, Id)
    }, [])
    return null;
}

export default BlogDetail