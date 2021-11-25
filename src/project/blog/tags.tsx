import { useTags } from "@/hook/useTags"
import { Chip } from "@mui/material"

const Tags: React.FC<{
    tags: number[]
}> = ({ tags }) => {
    const [tagMap] = useTags()
    return <>
        {tags.map(id => {
            let text = tagMap.get(id)
            return text ? <Chip key={id} size="small" label={tagMap.get(id)} /> : null
        })}
    </>
}

export default Tags