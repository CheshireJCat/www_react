import { styled } from "@mui/material/styles"
import CodeMirrorEditor from "./codemirror"
import MarkdownShow from "./markdownShow"

const Main = styled("main")`
    position: relative;
    display: flex;
`
const Editor = styled("div")`
    width: 50%;
    overflow: auto;
`

const MarkdownEditor: React.FC<{
    height?: string;
    value: string;
    onChange: (p: { target: { value: string } }) => void;
}> = (props) => {
    return <Main style={{ height: props.height }}>
        <Editor>
            <CodeMirrorEditor {...props} />
        </Editor>
        <Editor>
            <MarkdownShow value={props.value} />
        </Editor>
    </Main>
}
export default MarkdownEditor