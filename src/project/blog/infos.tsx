import categories from "@/config/category";
import { Chip, Divider, Stack } from "@mui/material";
import Tags from "./tags";

const BlogInfo: React.FC<{
    categroy: number;
    tags: string;
    createTime: string;
    updateTime: string;
    className?: string;
}> = ({ categroy, tags, createTime, updateTime, className }) => {
    return <Stack direction="row" spacing={1} rowGap={1} my={1} flexWrap="wrap" className={className}>
        <Chip size="small" label={categories.get(categroy)} />
        {createTime && <>
            <Divider orientation="vertical" flexItem />
            <Chip size="small" label={`创建：${createTime}`} />
        </>}
        {updateTime && <>
            <Divider orientation="vertical" flexItem />
            <Chip size="small" label={`更新：${updateTime}`} />
        </>}
        {tags.length > 0 && <>
            <Divider orientation="vertical" flexItem />
            <Tags tags={tags.split(",").map(item => parseInt(item))} />
        </>}

    </Stack>
}

export default BlogInfo