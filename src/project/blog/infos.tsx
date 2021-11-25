import categories from "@/config/category";
import { Chip, Divider, Stack } from "@mui/material";
import Tags from "./tags";

const BlogInfo: React.FC<{
    categroy: number;
    tags: string;
    time: string;
}> = ({ categroy, tags, time }) => {
    return <Stack direction="row" spacing={1} my={1}>
        <Chip size="small" label={categories.get(categroy)} />
        {time && <Divider orientation="vertical" flexItem />}
        <Chip size="small" label={time} />
        {tags.length > 0 && <Divider orientation="vertical" flexItem />}
        <Tags tags={tags.split(",").map(item => parseInt(item))} />
    </Stack>
}

export default BlogInfo