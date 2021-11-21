import { api_blogDelete, api_blogUpdateStatus, useDataBlogList } from "@/api/blog"
import Loading from "@/component/loading"
import useLogined from "@/hook/useLogined"
import { ContentInCenter } from "@/style"
import { faBug, faEye, faEyeSlash, faFan, faFish, faPen, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import styled from "styled-components"

const NewBlogBtn = styled(Link)`
    position: fixed;
    right: 10px;
    bottom: 10px;
    background: pink;
    border-radius: 50%;
    cursor: pointer;
    width: 50px;
    height: 50px;
    ${ContentInCenter}
`

const Tools = styled.div`
    color: #666;
`
const BlogList: React.FC = () => {
    const [loading, list, setList] = useDataBlogList()
    const logined = useLogined()

    const deleteBlog = async (id: number) => {
        let { effectRows, msg } = await api_blogDelete(id)
        if (effectRows < 0) {
            toast.error(msg)
        } else if (effectRows === 0) {
            toast.warn("不存在此文章")
        } else {
            setList(prev => prev.filter(({ Id }) => Id !== id))
            toast.success(msg)
        }
    }

    const updateBlog = async (id: number, status: number) => {
        let { effectRows, msg } = await api_blogUpdateStatus(id, status)
        if (effectRows < 0) {
            toast.error(msg)
        } else if (effectRows === 0) {
            toast.warn("状态未改变")
        } else {
            setList(prev => {
                let res = prev.slice()
                res.forEach((item) => {
                    if (item.Id === id) {
                        item.Status = status
                    }
                })
                return res
            })
            toast.success(msg)
        }
    }


    return <>
        {
            loading ? <Loading /> : <div>
                {
                    list.map(({ Id, Title, Summary, Thumb, Status, UpdateTime, LikeNum }) => {
                        return <div key={Id}>
                            <Link to={`/blog/detail/${Id}`}>
                                <h3>{Title}</h3>
                                {Summary && <div>{Summary}</div>}
                                <div>{UpdateTime}</div>
                            </Link>
                            {logined && <Tools>
                                <FontAwesomeIcon icon={Status === 1 ? faEye : Status === 2 ? faEyeSlash : faBug} onClick={() => updateBlog(Id, Status === 1 ? 2 : 1)} />
                                <Link to={`/blog/edit/${Id}`}><FontAwesomeIcon icon={faFan} /></Link>
                                <FontAwesomeIcon icon={faFish} onClick={() => deleteBlog(Id)} />
                            </Tools>}
                        </div>
                    })
                }
            </div>
        }
        <NewBlogBtn to="../create"><FontAwesomeIcon icon={faPlus} color="#fff" /></NewBlogBtn>
    </>
}

export default BlogList