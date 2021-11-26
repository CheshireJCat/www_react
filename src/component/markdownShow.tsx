// 可使用表格、删除线、任务列表、引用等操作
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
// 自动生成markdown的目录 ## Table of Contents
import remarkToc from 'remark-toc'
// 语法高亮
import rehypeHighlight from 'rehype-highlight'
import 'github-markdown-css/github-markdown-dark.css'
import 'highlight.js/styles/agate.css'
// 支持html
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'


const MarkdownShow: React.FC<{ value: string }> = ({ value }) => {
    return <ReactMarkdown
        className="markdown-body"
        children={value}
        remarkPlugins={[remarkSlug, remarkToc, remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeHighlight, { ignoreMissing: true }]]}
    />
}

export default MarkdownShow;