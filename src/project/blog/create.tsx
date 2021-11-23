import { api_blogCreate } from "@/api/blog";
import MarkdownEditor from "@/component/markdownEditor";
import blogStatusText from "@/config/blogStatus";
import categories from "@/config/category";
import { Button, FormControl, FormControlLabel, FormLabel, Link, Radio, RadioGroup, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import SecondaryBody from "../layout/secondaryBody";

const List = styled(Box)`
    margin: 10px;
    .MuiTextField-root{
        width: 80%;
    }
`

const BlogCreate: React.FC<{
    defaultValue?: BlogEdit
}> = ({ defaultValue = {
    id: 0,
    title: "",
    category: "0",
    summary: "",
    content: "## Table of Contents",
    thumb: "https://source.unsplash.com/random",
    status: "0"
} }) => {
        const navigate = useNavigate()
        const { setValue, formState: { errors }, handleSubmit, control, watch } = useForm({
            defaultValues: defaultValue
        })

        const [contentValue, setContentValue] = useState(defaultValue.content)
        useEffect(() => {
            setValue("content", contentValue)
        }, [contentValue])

        const onSubmit = handleSubmit(async (data) => {
            let { id = 0, msg } = await api_blogCreate(data);
            if (id) {
                toast.success(msg)
                navigate("/blog/list")
                return
            }
            toast.error(msg)
        })

        return <SecondaryBody>
            <form>
                <List>
                    <Controller control={control} name="title" render={({ field }) => <TextField {...field} label="标题" required variant="filled" />} />
                </List>
                <List>
                    <Controller control={control} name="summary" render={({ field }) => <TextField {...field} variant="filled" label="摘要" />} />
                </List>
                <List>
                    <Controller control={control} name="category" render={({ field }) => <FormControl component="fieldset">
                        <RadioGroup row aria-label="category" name="category" defaultValue={defaultValue.category}>
                            {categories.map((item, index) => {
                                return <FormControlLabel {...field} key={item} value={index} control={<Radio />} label={item} />
                            })}
                        </RadioGroup>
                    </FormControl>} />
                </List>
                <List>
                    <MarkdownEditor value={contentValue} onChange={({ target: { value } }) => setContentValue(value)} />
                </List>
                <List>
                    <Controller control={control} name="thumb" render={({ field }) => <TextField {...field} variant="filled" label="封面图url" />} />
                    <Link href="https://unsplash.com/" target="_blank">找图</Link>
                </List>
                <List>
                    <Controller control={control} name="status" render={({ field }) => <FormControl component="fieldset">
                        <RadioGroup row aria-label="status" name="status" defaultValue={defaultValue.status}>
                            {blogStatusText.map((item, index) => {
                                return <FormControlLabel {...field} key={item} value={index} control={<Radio />} label={item} />
                            })}
                        </RadioGroup>
                    </FormControl>} />
                </List>
                <Button type="button" sx={{ bgcolor: "primary.main", ":hover": { bgcolor: "primary.light", } }} color="secondary" size="large" onClick={onSubmit}>发布</Button>
            </form>
        </SecondaryBody>
    }

export default BlogCreate;