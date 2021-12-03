import { useDataBlogDetail } from "@/api/blog"
import Empty from "@/component/empty";
import GoTop from "@/component/goTop";
import useTitle from "@/hook/useTitle";
import { CnzzTrackEvent } from "@/util/cnzz";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "react-router"
import BlogInfo from "./infos";

const MarkdownShowLazy = lazy(() => import("@/component/markdownShow"))


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
    const ref = useRef<HTMLDivElement>(null);

    const [title, setTitle] = useState("博客")
    useTitle(title);
    useEffect(() => {
        setTitle(detail?.Title || "博客")
    }, [detail?.Title])

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
                                <Suspense fallback={<textarea readOnly value={detail.Content} style={{ width: "100%", background: "none", border: 0, color: "#fff", resize: "none", lineHeight: "20px" }} />}>
                                    <MarkdownShowLazy value={detail.Content} />
                                </Suspense>
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