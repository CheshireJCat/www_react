import { api_blogCreate, api_blogEdit } from "@/api/blog";
import { api_tags } from "@/api/tag";
import MarkdownEditor from "@/component/markdownEditor";
import { blogStatus } from "@/config/blogStatus";
import categories from "@/config/category";
import useBodySbgc, { useBodyBgImg } from "@/hook/useBodySbgc";
import { useTags } from "@/hook/useTags";
import { Button, Container, FormControl, FormControlLabel, Link, Radio, RadioGroup, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const List = styled(Box)`
    margin: 10px;
    .MuiTextField-root{
        width: 80%;
    }
`

const BlogCreate: React.FC<{
    edit?: boolean;
    defaultValue?: BlogEdit
}> = ({ edit = false, defaultValue = {
    id: 0,
    title: "",
    category: "0",
    summary: "",
    content: "## Table of Contents",
    thumb: "https://source.unsplash.com/random/1600x900",
    status: "1",
    tags: ""
} }) => {
        useBodySbgc()
        useBodyBgImg("")
        const navigate = useNavigate()
        const [, update] = useTags()
        const { setValue, handleSubmit, control } = useForm({
            defaultValues: defaultValue
        })

        const [contentValue, setContentValue] = useState(defaultValue.content)
        useEffect(() => {
            setValue("content", contentValue)
        }, [contentValue])
        const onSubmit = !edit ? handleSubmit(async (data) => {
            let { id = 0, msg } = await api_blogCreate(data);
            if (id) {
                const newTags = await api_tags()
                update({ type: "update", payload: newTags })
                navigate("/blog/list")
                return
            }
            console.error(msg)
        }) : handleSubmit(async (data) => {
            let { effectRows, msg } = await api_blogEdit(data)
            if (effectRows < 0) {
                console.error(msg)
            } else if (effectRows === 0) {
                console.warn("?????????")
            } else {
                const newTags = await api_tags()
                update({ type: "update", payload: newTags })
                navigate(`/blog/detail/${data.id}`)
            }
        })

        return <Container maxWidth="xl" sx={{ px: { md: "50px" }, pb: 10 }}>
            <form>
                <List>
                    <Controller control={control} name="title" render={({ field }) => <TextField {...field} label="??????" required variant="filled" />} />
                </List>
                <List>
                    <Controller control={control} name="summary" render={({ field }) => <TextField {...field} variant="filled" label="??????" />} />
                </List>
                <List>
                    <Controller control={control} name="tags" render={({ field }) => <TextField {...field} variant="filled" label="??????" />} />
                </List>
                <List>
                    <Controller control={control} name="category" render={({ field }) => <FormControl component="fieldset">
                        <RadioGroup row aria-label="category" name="category" defaultValue={defaultValue.category}>
                            {Array.from(categories).map(([value, text]) => {
                                return <FormControlLabel {...field} key={value} value={value} control={<Radio />} label={text} />
                            })}
                        </RadioGroup>
                    </FormControl>} />
                </List>
                <List>
                    <MarkdownEditor value={contentValue} onChange={({ target: { value } }) => setContentValue(value)} />
                </List>
                <List>
                    <Controller control={control} name="thumb" render={({ field }) => <TextField {...field} variant="filled" label="?????????url" />} />
                    <Box>
                        <Link sx={{ color: "#000!important" }} href="https://unsplash.com/" target="_blank">??????</Link> |
                        <Link sx={{ color: "#000!important" }} href="https://sm.ms/" target="_blank">??????</Link> |
                        https://source.unsplash.com/random/1600x900
                    </Box>
                </List>
                <List>
                    <Controller control={control} name="status" render={({ field }) => <FormControl component="fieldset">
                        <RadioGroup row aria-label="status" name="status" defaultValue={defaultValue.status}>
                            {Array.from(blogStatus).map(([value, text]) => {
                                return <FormControlLabel {...field} key={value} value={value} control={<Radio />} label={text} />
                            })}
                        </RadioGroup>
                    </FormControl>} />
                </List>
                <Button type="button" sx={{ bgcolor: "primary.main", ":hover": { bgcolor: "primary.light", } }} color="secondary" size="large" onClick={onSubmit}>??????</Button>
            </form>
        </Container>
    }

export default BlogCreate;