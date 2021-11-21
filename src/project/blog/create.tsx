import { api_blogCreate } from "@/api/blog";
import blogStatusText from "@/config/blogStatus";
import categories from "@/config/category";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const BlogCreate: React.FC<{
    defaultValue?: BlogEdit
}> = ({ defaultValue = {
    id: 0,
    title: "222",
    category: "1",
    summary: "",
    content: "",
    thumb: "",
    status: "0"
} }) => {
        const navigate = useNavigate()
        const { register, setValue, formState: { errors }, handleSubmit } = useForm({
            defaultValues: defaultValue
        })

        const onSubmit = handleSubmit(async (data) => {
            let { id = 0, msg } = await api_blogCreate(data);
            if (id) {
                toast.success(msg)
                navigate("/blog/list")
                return
            }
            toast.error(msg)
        })

        return <div>
            <form>
                <ul>
                    <li>
                        <input type="text" {...register("title", { required: true, maxLength: 45 })} placeholder="标题" />
                        {errors.title && <div>标题不能为空</div>}
                    </li>
                    <li>
                        {categories.map((item, index) => {
                            return <label key={item}><input type="radio" {...register("category")} value={index} />{item}</label>
                        })}
                    </li>
                    <li>
                        <input type="text" {...register("summary")} placeholder="摘要" />
                    </li>
                    <li>
                        <input type="text" {...register("content")} placeholder="正文" />
                    </li>
                    <li>
                        <input type="text" {...register("thumb")} placeholder="封面图url" />
                    </li>
                    <li>
                        {blogStatusText.map((item, index) => {
                            return <label key={item}><input type="radio" {...register("status")} value={index} />{item}</label>
                        })}
                    </li>
                </ul>
                <button type="button" onClick={onSubmit}>发布</button>
            </form>
        </div>
    }

export default BlogCreate;